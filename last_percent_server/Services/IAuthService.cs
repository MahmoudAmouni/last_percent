using last_percent_server.Models.DTOs;

namespace last_percent_server.Services;

public interface IAuthService
{
    Task<string> RegisterAsync(RegisterDto registerDto);
    Task<string> LoginAsync(LoginDto loginDto);
}
