using last_percent_server.Models.DTOs;
using last_percent_server.Services;
using Microsoft.AspNetCore.Mvc;

namespace last_percent_server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        var token = await _authService.RegisterAsync(registerDto);
        if (token == null)
            return BadRequest(new { message = "Email already exists" });

        return Ok(new { token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var token = await _authService.LoginAsync(loginDto);
        if (token == null)
            return Unauthorized(new { message = "Invalid email or password" });

        return Ok(new { token });
    }
}
