using last_percent_server.Models;

namespace last_percent_server.Services;

public interface ISessionService
{
    Task<Session?> StartSessionAsync(int userId, int batteryLevel);
    Task<Session?> GetActiveSessionAsync(int userId);
    Task<bool> EndSessionAsync(int userId, int endingBatteryLevel);
}
