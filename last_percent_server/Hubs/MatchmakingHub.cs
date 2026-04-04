using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;

namespace last_percent_server.Hubs;

public class MatchmakingHub : Hub
{
    public static readonly ConcurrentDictionary<int, string> UserConnections = new();

    public override Task OnConnectedAsync()
    {
        var userIdStr = Context.GetHttpContext()?.Request.Query["userId"].ToString();

        if (int.TryParse(userIdStr, out var userId))
        {
            UserConnections[userId] = Context.ConnectionId;
        }

        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var userIdStr = Context.GetHttpContext()?.Request.Query["userId"].ToString();

        if (int.TryParse(userIdStr, out var userId))
        {
            UserConnections.TryRemove(userId, out _);
        }

        return base.OnDisconnectedAsync(exception);
    }
}
