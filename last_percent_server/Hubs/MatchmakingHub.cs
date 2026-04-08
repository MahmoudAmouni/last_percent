using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;

namespace last_percent_server.Hubs;

public class MatchmakingHub : Hub
{
    public static readonly ConcurrentDictionary<int, string> UserConnections = new();

    public override Task OnConnectedAsync()
    {
        var userIdClaim = Context.User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);

        if (userIdClaim != null && int.TryParse(userIdClaim.Value, out var userId))
        {
            UserConnections[userId] = Context.ConnectionId;
        }

        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var userIdClaim = Context.User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);

        if (userIdClaim != null && int.TryParse(userIdClaim.Value, out var userId))
        {
            UserConnections.TryRemove(userId, out _);
        }

        return base.OnDisconnectedAsync(exception);
    }
}
