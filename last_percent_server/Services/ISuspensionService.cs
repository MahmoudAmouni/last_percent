namespace last_percent_server.Services;

public interface ISuspensionService
{
    Task<bool> IsUserSuspendedAsync(int userId);
    Task SuspendUserAsync(int userId, int minutes);
    Task<DateTime?> GetSuspensionEndAsync(int userId);
}
