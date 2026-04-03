using last_percent_server.Data;
using last_percent_server.Models;
using Microsoft.EntityFrameworkCore;

namespace last_percent_server.Services;

public class SessionService : ISessionService
{
    private readonly AppDbContext _context;

    public SessionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Session?> StartSessionAsync(int userId, int batteryLevel)
    {
        if (batteryLevel > 20)
            return null;

        var activeSessions = await _context.Sessions
            .Where(s => s.UserId == userId && s.Status == SessionStatus.Active)
            .ToListAsync();

        foreach (var sess in activeSessions)
        {
            sess.Status = SessionStatus.Ended;
            sess.EndedAt = DateTime.UtcNow;
        }

        var session = new Session
        {
            UserId = userId,
            StartingBatteryLevel = batteryLevel,
            Status = SessionStatus.Active,
            StartedAt = DateTime.UtcNow
        };

        _context.Sessions.Add(session);
        await _context.SaveChangesAsync();

        return session;
    }

    public async Task<Session?> GetActiveSessionAsync(int userId)
    {
        return await _context.Sessions
            .FirstOrDefaultAsync(s => s.UserId == userId && s.Status == SessionStatus.Active);
    }

    public async Task<bool> EndSessionAsync(int userId, int endingBatteryLevel)
    {
        var session = await GetActiveSessionAsync(userId);
        if (session == null)
            return false;

        session.Status = SessionStatus.Ended;
        session.EndedAt = DateTime.UtcNow;
        session.EndingBatteryLevel = endingBatteryLevel;

        await _context.SaveChangesAsync();
        return true;
    }
}
