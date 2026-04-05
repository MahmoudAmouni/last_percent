using System.Security.Claims;
using last_percent_server.Data;
using last_percent_server.Hubs;
using last_percent_server.Models.DTOs;
using last_percent_server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace last_percent_server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;
    private readonly AppDbContext _context;
    private readonly IHubContext<MatchmakingHub> _hubContext;

    public ChatController(IChatService chatService, AppDbContext context, IHubContext<MatchmakingHub> hubContext)
    {
        _chatService = chatService;
        _context = context;
        _hubContext = hubContext;
    }

    [HttpGet("{matchId}/messages")]
    public async Task<IActionResult> GetMessages(int matchId)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            return Unauthorized();

        try
        {
            var messages = await _chatService.GetMatchMessagesAsync(matchId, userId);
            return Ok(messages);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid();
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "An internal error occurred." });
        }
    }

    [HttpPost("{matchId}/send")]
    public async Task<IActionResult> SendMessage(int matchId, [FromBody] SendMessageDto sendMessageDto)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            return Unauthorized();

        try
        {
            var message = await _chatService.SendMessageAsync(matchId, userId, sendMessageDto.Content);

            var match = await _context.Matches.FirstOrDefaultAsync(m => m.Id == matchId);
            if (match == null) return NotFound();

            var recipientId = match.User1Id == userId ? match.User2Id : match.User1Id;

            if (MatchmakingHub.UserConnections.TryGetValue(recipientId, out var connectionId))
            {
                await _hubContext.Clients.Client(connectionId).SendAsync("MessageReceived", new
                {
                    messageId = message.Id,
                    matchId = message.MatchId,
                    senderId = message.SenderId,
                    content = message.Content,
                    sentAt = message.SentAt
                });
            }

            return Ok(new
            {
                messageId = message.Id,
                sentAt = message.SentAt
            });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An internal error occurred." + ex.Message });
        }
    }
}
