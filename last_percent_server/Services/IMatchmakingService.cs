using last_percent_server.Models.DTOs;

namespace last_percent_server.Services;

public interface IMatchmakingService
{
    Task<MatchResult?> TryMatchAsync(int userId);
}
