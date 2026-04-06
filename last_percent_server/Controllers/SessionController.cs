using last_percent_server.Extensions;
using last_percent_server.Models.DTOs;
using last_percent_server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace last_percent_server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SessionController : ControllerBase
{
    private readonly ISessionService _sessionService;

    public SessionController(ISessionService sessionService)
    {
        _sessionService = sessionService;
    }

    [HttpPost("start")]
    public async Task<IActionResult> StartSession([FromBody] StartSessionDto startSessionDto)
    {
        var userId = this.GetUserId();
        var session = await _sessionService.StartSessionAsync(userId, startSessionDto.StartingBatteryLevel);
        return CreatedAtAction(nameof(StartSession), new { id = session.Id }, session);
    }

    [HttpPost("end")]
    public async Task<IActionResult> EndSession([FromBody] int endingBatteryLevel)
    {
        var userId = this.GetUserId();
        await _sessionService.EndSessionAsync(userId, endingBatteryLevel);
        return Ok(new { message = "Session ended successfully." });
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActiveSession()
    {
        var userId = this.GetUserId();
        var session = await _sessionService.GetActiveSessionAsync(userId);
        
        if (session == null)
            return NotFound(new { message = "No active session found." });

        return Ok(session);
    }
}
