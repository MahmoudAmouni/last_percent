using System.Security.Claims;
using last_percent_server.Models.DTOs;
using last_percent_server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace last_percent_server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class QueueController : ControllerBase
{
    private readonly IQueueService _queueService;

    public QueueController(IQueueService queueService)
    {
        _queueService = queueService;
    }

    [HttpPost("join")]
    public async Task<IActionResult> JoinQueue([FromBody] JoinQueueDto joinQueueDto)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            return Unauthorized();

        var entry = await _queueService.JoinQueueAsync(userId, joinQueueDto.BatteryLevel);
        
        if (entry == null)
            return BadRequest(new { message = "Could not join queue. Make sure you have an active session." });

        return CreatedAtAction(nameof(JoinQueue), new { id = entry.Id }, entry);
    }

    [HttpPost("leave")]
    public async Task<IActionResult> LeaveQueue()
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            return Unauthorized();

        var success = await _queueService.LeaveQueueAsync(userId);
        
        if (!success)
            return BadRequest(new { message = "Could not leave the queue because you were not in it." });

        return Ok(new { message = "You have left the matchmaking queue." });
    }

    [HttpGet("status")]
    public async Task<IActionResult> GetStatus()
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            return Unauthorized();

        var entry = await _queueService.GetQueueStatusAsync(userId);
        
        if (entry == null)
            return NotFound(new { message = "You are not currently in the queue." });

        return Ok(entry);
    }
}
