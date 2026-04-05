using last_percent_server.Data;
using last_percent_server.Models;
using Microsoft.EntityFrameworkCore;

namespace last_percent_server.Services;

public class ChatService : IChatService
{
    private readonly AppDbContext _context;

    public ChatService(AppDbContext context)
    {
        _context = context;
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
}
