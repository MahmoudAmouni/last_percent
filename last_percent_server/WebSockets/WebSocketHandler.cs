using System.Net.WebSockets;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using last_percent_server.WebSockets;

namespace last_percent_server.WebSockets;

public class WebSocketHandler
{
    private readonly ISocketManager _socketManager;
    private readonly ILogger<WebSocketHandler> _logger;

    public WebSocketHandler(ISocketManager socketManager, ILogger<WebSocketHandler> logger)
    {
        _socketManager = socketManager;
        _logger = logger;
    }

    public async Task HandleAsync(HttpContext context, WebSocket socket)
    {
        var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdClaim, out var userId))
        {
            await socket.CloseAsync(WebSocketCloseStatus.PolicyViolation, "Unauthorized", CancellationToken.None);
            return;
        }

        _socketManager.AddSocket(userId, socket);
        _logger.LogInformation("User {UserId} connected via WebSocket.", userId);

        var buffer = new byte[4096];
        try
        {
            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                if (result.MessageType == WebSocketMessageType.Close)
                {
                    break;
                }
            }
        }
        catch (WebSocketException ex)
        {
            _logger.LogWarning("WebSocket error for User {UserId}: {Message}", userId, ex.Message);
        }
        finally
        {
            _socketManager.RemoveSocket(userId);
            _logger.LogInformation("User {UserId} disconnected from WebSocket.", userId);

            if (socket.State != WebSocketState.Closed)
            {
                await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Connection closed", CancellationToken.None);
            }
        }
    }
}
