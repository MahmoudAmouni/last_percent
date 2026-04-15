using last_percent_server.Data;
using Microsoft.EntityFrameworkCore;

namespace last_percent_server.Services;

public class SuspensionService : ISuspensionService
{
    private readonly AppDbContext _context;

    public SuspensionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> IsUserSuspendedAsync(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) return false;

        if (user.SuspendedUntil == null) return false;

        return user.SuspendedUntil > DateTime.UtcNow;
    }

    public async Task SuspendUserAsync(int userId, int minutes)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) throw new KeyNotFoundException("User not found.");

        user.SuspendedUntil = DateTime.UtcNow.AddMinutes(minutes);
        await _context.SaveChangesAsync();
    }

    public async Task<DateTime?> GetSuspensionEndAsync(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null || user.SuspendedUntil == null) return null;

        if (user.SuspendedUntil <= DateTime.UtcNow)
        {
            user.SuspendedUntil = null;
            await _context.SaveChangesAsync();
            return null;
        }

        return user.SuspendedUntil;
    }
}
