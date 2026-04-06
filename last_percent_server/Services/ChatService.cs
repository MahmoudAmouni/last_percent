using last_percent_server.Data;
using last_percent_server.Models;
using Microsoft.EntityFrameworkCore;

namespace last_percent_server.Services;

public class ChatService : IChatService
{
    private readonly AppDbContext _context;
    private readonly ISessionService _sessionService;

    public ChatService(AppDbContext context, ISessionService sessionService)
    {
        _context = context;
        _sessionService = sessionService;
    }

    public async Task<IEnumerable<Message>> GetMatchMessagesAsync(int matchId, int userId)
    {
        var match = await _context.Matches
            .FirstOrDefaultAsync(m => m.Id == matchId);

        if (match == null)
            throw new KeyNotFoundException("Match not found.");

        if (match.User1Id != userId && match.User2Id != userId)
            throw new UnauthorizedAccessException("You are not part of this match.");

        return await _context.Messages
            .Where(m => m.MatchId == matchId)
            .OrderBy(m => m.SentAt)
            .ToListAsync();
    }

    public async Task<Message> SendMessageAsync(int matchId, int userId, string content)
    {
        var session = await _sessionService.GetActiveSessionAsync(userId);
        if (session == null)
            throw new UnauthorizedAccessException("You do not have an active session.");

        var match = await _context.Matches
            .FirstOrDefaultAsync(m => m.Id == matchId);

        if (match == null)
            throw new KeyNotFoundException("Match not found.");

        if (match.User1Id != userId && match.User2Id != userId)
            throw new UnauthorizedAccessException("You are not part of this match.");

        if (match.EndedAt != null)
            throw new InvalidOperationException("This match has already ended.");

        var message = new Message
        {
            MatchId = matchId,
            SenderId = userId,
            Content = content,
            SentAt = DateTime.UtcNow,
            IsRead = false
        };

        _context.Messages.Add(message);
        await _context.SaveChangesAsync();

        return message;
    }

    public async Task MarkMessagesAsReadAsync(int matchId, int userId)
    {
        var session = await _sessionService.GetActiveSessionAsync(userId);
        if (session == null)
            throw new UnauthorizedAccessException("You do not have an active session.");

        var match = await _context.Matches
            .FirstOrDefaultAsync(m => m.Id == matchId);

        if (match == null)
            throw new KeyNotFoundException("Match not found.");

        if (match.User1Id != userId && match.User2Id != userId)
            throw new UnauthorizedAccessException("You are not part of this match.");

        var unreadMessages = await _context.Messages
            .Where(m => m.MatchId == matchId && m.SenderId != userId && !m.IsRead)
            .ToListAsync();

        if (unreadMessages.Any())
        {
            foreach (var msg in unreadMessages)
            {
                msg.IsRead = true;
            }
            await _context.SaveChangesAsync();
        }
    }
}
