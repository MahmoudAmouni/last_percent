using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

namespace last_percent_server.WebSockets;

public class SocketManager : ISocketManager
{
    private readonly ConcurrentDictionary<int, WebSocket> _sockets = new();

    public void AddSocket(int userId, WebSocket socket)
    {
        _sockets[userId] = socket;
    }

    public void RemoveSocket(int userId)
    {
        _sockets.TryRemove(userId, out _);
    }

    public bool IsConnected(int userId)
    {
        return _sockets.TryGetValue(userId, out var socket) && socket.State == WebSocketState.Open;
    }

    public async Task SendAsync(int userId, object payload)
    {
        if (!_sockets.TryGetValue(userId, out var socket)) return;
        if (socket.State != WebSocketState.Open) return;

        var json = JsonSerializer.Serialize(payload, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        var bytes = Encoding.UTF8.GetBytes(json);
        await socket.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, CancellationToken.None);
    }

    public async Task BroadcastAsync(IEnumerable<int> userIds, object payload)
    {
        var tasks = userIds.Select(id => SendAsync(id, payload));
        await Task.WhenAll(tasks);
    }
}
