using last_percent_server.Extensions;
using last_percent_server.Hubs;
using last_percent_server.Models.DTOs;
using last_percent_server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace last_percent_server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class QueueController : ControllerBase
{
    private readonly IQueueService _queueService;
    private readonly IMatchmakingService _matchmakingService;
    private readonly IHubContext<MatchmakingHub> _hubContext;

    public QueueController(
        IQueueService queueService, 
        IMatchmakingService matchmakingService, 
        IHubContext<MatchmakingHub> hubContext)
    {
        _queueService = queueService;
        _matchmakingService = matchmakingService;
        _hubContext = hubContext;
    }

    [HttpPost("join")]
    public async Task<IActionResult> JoinQueue([FromBody] JoinQueueDto joinQueueDto)
    {
        var userId = this.GetUserId();
        await _queueService.JoinQueueAsync(userId, joinQueueDto.BatteryLevel);
        
        var matchResult = await _matchmakingService.TryMatchAsync(userId);
        if (matchResult != null)
        {
            if (MatchmakingHub.UserConnections.TryGetValue(matchResult.User1Id, out var connection1))
            {
                await _hubContext.Clients.Client(connection1).SendAsync("MatchFound", new { matchId = matchResult.MatchId });
            }
            if (MatchmakingHub.UserConnections.TryGetValue(matchResult.User2Id, out var connection2))
            {
                await _hubContext.Clients.Client(connection2).SendAsync("MatchFound", new { matchId = matchResult.MatchId });
            }
        }

        return Ok(new { status = "waiting" });
    }

    [HttpPost("leave")]
    public async Task<IActionResult> LeaveQueue()
    {
        var userId = this.GetUserId();
        await _queueService.LeaveQueueAsync(userId);
        return Ok(new { message = "You have left the matchmaking queue." });
    }

    [HttpGet("status")]
    public async Task<IActionResult> GetStatus()
    {
        var userId = this.GetUserId();
        var entry = await _queueService.GetQueueStatusAsync(userId);
        return Ok(entry);
    }
}
