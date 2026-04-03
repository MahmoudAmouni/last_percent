using last_percent_server.Data;
using last_percent_server.Models;
using Microsoft.EntityFrameworkCore;

namespace last_percent_server.Services;

public class QueueService : IQueueService
{
    private readonly AppDbContext _context;
    private readonly ISessionService _sessionService;

    public QueueService(AppDbContext context, ISessionService sessionService)
    {
        _context = context;
        _sessionService = sessionService;
    }

    public async Task<WaitingQueue?> JoinQueueAsync(int userId, int batteryLevel)
    {
        // 1. Check for active session
        var session = await _sessionService.GetActiveSessionAsync(userId);
        if (session == null)
            return null; // Cannot join queue without an active session

        // 2. Check if already in queue
        var existingQueueEntry = await _context.WaitingQueues
            .FirstOrDefaultAsync(q => q.UserId == userId && q.Status == QueueStatus.Waiting);

        if (existingQueueEntry != null)
        {
            // Update battery and refresh timestamp
            existingQueueEntry.BatteryLevel = batteryLevel;
            existingQueueEntry.QueuedAt = DateTime.UtcNow;
            existingQueueEntry.SessionId = session.Id;
            await _context.SaveChangesAsync();
            return existingQueueEntry;
        }

        // 3. Join queue
        var queueEntry = new WaitingQueue
        {
            UserId = userId,
            SessionId = session.Id,
            BatteryLevel = batteryLevel,
            Status = QueueStatus.Waiting,
            QueuedAt = DateTime.UtcNow
        };

        _context.WaitingQueues.Add(queueEntry);
        await _context.SaveChangesAsync();

        return queueEntry;
    }

    public async Task<bool> LeaveQueueAsync(int userId)
    {
        var entry = await _context.WaitingQueues
            .FirstOrDefaultAsync(q => q.UserId == userId && q.Status == QueueStatus.Waiting);

        if (entry == null)
            return false;

        entry.Status = QueueStatus.Cancelled;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<WaitingQueue?> GetQueueStatusAsync(int userId)
    {
        return await _context.WaitingQueues
            .OrderByDescending(q => q.QueuedAt)
            .FirstOrDefaultAsync(q => q.UserId == userId && q.Status == QueueStatus.Waiting);
    }
}
