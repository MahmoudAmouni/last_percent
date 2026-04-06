using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace last_percent_server.Extensions;

public static class ControllerExtensions
{
    public static int GetUserId(this ControllerBase controller)
    {
        var userIdString = controller.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
        {
            throw new UnauthorizedAccessException("User context is missing or invalid.");
        }
        return userId;
    }
}
