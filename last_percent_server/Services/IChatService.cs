using last_percent_server.Models;

namespace last_percent_server.Services;

public interface IChatService
{
    Task<IEnumerable<Message>> GetMatchMessagesAsync(int matchId, int userId);
    Task<Message> SendMessageAsync(int matchId, int userId, string content);
}
