using last_percent_server.Models;

namespace last_percent_server.Services;

public interface IQueueService
{
    Task<WaitingQueue> JoinQueueAsync(int userId, int batteryLevel);
    Task LeaveQueueAsync(int userId);
    Task<WaitingQueue> GetQueueStatusAsync(int userId);
}
