using System.Net.WebSockets;

namespace last_percent_server.WebSockets;

public interface ISocketManager
{
    void AddSocket(int userId, WebSocket socket);
    void RemoveSocket(int userId);
    bool IsConnected(int userId);
    Task SendAsync(int userId, object payload);
    Task BroadcastAsync(IEnumerable<int> userIds, object payload);
}
