using last_percent_server.Extensions;
using last_percent_server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace last_percent_server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SuspensionController : ControllerBase
{
    private readonly ISuspensionService _suspensionService;

    public SuspensionController(ISuspensionService suspensionService)
    {
        _suspensionService = suspensionService;
    }

    [HttpGet("status")]
    public async Task<IActionResult> GetStatus()
    {
        var userId = this.GetUserId();
        var suspendedUntil = await _suspensionService.GetSuspensionEndAsync(userId);
        
        return Ok(new { suspendedUntil });
    }
}
