using last_percent_server.Data;
using last_percent_server.Models;
using last_percent_server.Extensions;
using last_percent_server.Models.DTOs;
using last_percent_server.Services;
using last_percent_server.WebSockets;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace last_percent_server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;
    private readonly AppDbContext _context;
    private readonly ISocketManager _socketManager;

    public ChatController(IChatService chatService, AppDbContext context, ISocketManager socketManager)
    {
        _chatService = chatService;
        _context = context;
        _socketManager = socketManager;
    }

    [HttpGet("{matchId}/messages")]
    public async Task<IActionResult> GetMessages(int matchId)
    {
        var userId = this.GetUserId();
        var messages = await _chatService.GetMatchMessagesAsync(matchId, userId);
        return Ok(messages);
    }

    [HttpPost("{matchId}/send")]
    public async Task<IActionResult> SendMessage(int matchId, [FromBody] SendMessageDto sendMessageDto)
    {
        var userId = this.GetUserId();
        var message = await _chatService.SendMessageAsync(matchId, userId, sendMessageDto.Content);

        var match = await _context.Matches.FirstOrDefaultAsync(m => m.Id == matchId);
        if (match == null) return NotFound();

        var recipientId = match.User1Id == userId ? match.User2Id : match.User1Id;

        await _socketManager.SendAsync(recipientId, new
        {
            type = "MessageReceived",
            messageId = message.Id,
            matchId = message.MatchId,
            senderId = message.SenderId,
            content = message.Content,
            sentAt = message.SentAt
        });

        return Ok(new { messageId = message.Id, sentAt = message.SentAt });
    }

    [HttpPost("{matchId}/read")]
    public async Task<IActionResult> MarkAsRead(int matchId)
    {
        var userId = this.GetUserId();
        await _chatService.MarkMessagesAsReadAsync(matchId, userId);

        var match = await _context.Matches.FirstOrDefaultAsync(m => m.Id == matchId);
        if (match == null) return NotFound();

        var partnerId = match.User1Id == userId ? match.User2Id : match.User1Id;

        await _socketManager.SendAsync(partnerId, new { type = "MessagesRead", matchId });

        return Ok();
    }

    [HttpPost("{matchId}/leave")]
    public async Task<IActionResult> LeaveChat(int matchId)
    {
        var userId = this.GetUserId();

        var match = await _context.Matches.FirstOrDefaultAsync(m => m.Id == matchId);
        if (match == null) return NotFound();

        if (match.User1Id != userId && match.User2Id != userId)
            return Forbid();

        var partnerId = match.User1Id == userId ? match.User2Id : match.User1Id;

        await _socketManager.SendAsync(partnerId, new { type = "PartnerLeft", matchId });

        var reason = match.User1Id == userId ? MatchEndedReason.User1Switched : MatchEndedReason.User2Switched;
        await _chatService.EndMatchAsync(matchId, userId, reason);

        return Ok();
    }
}
