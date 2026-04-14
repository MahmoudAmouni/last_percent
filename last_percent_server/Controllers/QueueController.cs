using last_percent_server.Extensions;
using last_percent_server.Models.DTOs;
using last_percent_server.Services;
using last_percent_server.WebSockets;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace last_percent_server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class QueueController : ControllerBase
{
    private readonly IQueueService _queueService;
    private readonly IMatchmakingService _matchmakingService;
    private readonly ISocketManager _socketManager;

    public QueueController(
        IQueueService queueService,
        IMatchmakingService matchmakingService,
        ISocketManager socketManager)
    {
        _queueService = queueService;
        _matchmakingService = matchmakingService;
        _socketManager = socketManager;
    }

    [HttpPost("join")]
    public async Task<IActionResult> JoinQueue([FromBody] JoinQueueDto joinQueueDto)
    {
        var userId = this.GetUserId();
        await _queueService.JoinQueueAsync(userId, joinQueueDto.BatteryLevel);

        var matchResult = await _matchmakingService.TryMatchAsync(userId);
        if (matchResult != null)
        {
            var payload = new { type = "MatchFound", matchId = matchResult.MatchId };
            await _socketManager.BroadcastAsync([matchResult.User1Id, matchResult.User2Id], payload);
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
