using System.Data;
using last_percent_server.Data;
using last_percent_server.Models;
using last_percent_server.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace last_percent_server.Services;

public class MatchmakingService : IMatchmakingService
{
    private readonly AppDbContext _context;
    private readonly ISessionService _sessionService;

    public MatchmakingService(AppDbContext context, ISessionService sessionService)
    {
        _context = context;
        _sessionService = sessionService;
    }

    public async Task<MatchResult?> TryMatchAsync(int userId)
    {
        var candidateIds = await _context.Database.SqlQueryRaw<int>(@"
            SELECT user_id 
            FROM waiting_queue 
            WHERE status = 0 
              AND user_id != {0}
              AND user_id NOT IN (
                  SELECT user2_id FROM matches WHERE user1_id = {0}
                  UNION
                  SELECT user1_id FROM matches WHERE user2_id = {0}
              )
              AND user_id NOT IN (
                  SELECT user2_id FROM friendships WHERE user1_id = {0}
                  UNION
                  SELECT user1_id FROM friendships WHERE user2_id = {0}
              )", userId).ToListAsync();

        if (!candidateIds.Any())
        {
            return null;
        }

        var candidateId = candidateIds[new Random().Next(candidateIds.Count)];

        var userSession = await _sessionService.GetActiveSessionAsync(userId);
        if (userSession == null) return null;

        using var transaction = await _context.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted);
        try
        {
            var candidateQueueRow = await _context.WaitingQueues
                .FromSqlInterpolated($"SELECT * FROM waiting_queue WHERE user_id = {candidateId} AND status = {(int)QueueStatus.Waiting} LIMIT 1 FOR UPDATE")
                .FirstOrDefaultAsync();

            if (candidateQueueRow == null)
            {
                await transaction.RollbackAsync();
                return null;
            }

             var userQueueRow = await _context.WaitingQueues
                .FromSqlInterpolated($"SELECT * FROM waiting_queue WHERE user_id = {userId} AND status = {(int)QueueStatus.Waiting} LIMIT 1 FOR UPDATE")
                .FirstOrDefaultAsync();

            if (userQueueRow == null)
            {
                await transaction.RollbackAsync();
                return null;
            }

            var match = new Match
            {
                User1Id = userId,
                User2Id = candidateId,
                SessionIdUser1 = userSession.Id,
                SessionIdUser2 = candidateQueueRow.SessionId,
                MatchedAt = DateTime.UtcNow
            };

            _context.Matches.Add(match);
            await _context.SaveChangesAsync(); 

            candidateQueueRow.Status = QueueStatus.Matched;
            userQueueRow.Status = QueueStatus.Matched;
            
            _context.WaitingQueues.Update(candidateQueueRow);
            _context.WaitingQueues.Update(userQueueRow);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            return new MatchResult
            {
                MatchId = match.Id,
                User1Id = userId,
                User2Id = candidateId
            };
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw; 
        }
    }
}
