using System.Text;
using last_percent_server.Data;
using last_percent_server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace last_percent_server.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        });

        services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            });
        });

        var jwtSettings = configuration.GetSection("Jwt");
        var key = Encoding.ASCII.GetBytes(jwtSettings["Secret"]!);

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = jwtSettings["Issuer"],
                ValidAudience = jwtSettings["Audience"],
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    var accessToken = context.Request.Query["access_token"];
                    var path = context.HttpContext.Request.Path;
                    if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                    {
                        context.Token = accessToken;
                    }
                    return Task.CompletedTask;
                },
                OnChallenge = async context =>
                {
                    context.HandleResponse();
                    context.Response.StatusCode = 401;
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsJsonAsync(new { message = "Unauthorized - Missing or invalid token" });
                },
                OnForbidden = async context =>
                {
                    context.Response.StatusCode = 403;
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsJsonAsync(new { message = "Forbidden - Access denied" });
                }
            };
        });

        services.AddSignalR();

        return services;
    }

    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ISessionService, SessionService>();
        services.AddScoped<IQueueService, QueueService>();
        services.AddScoped<IMatchmakingService, MatchmakingService>();
        services.AddScoped<IChatService, ChatService>();
        
        return services;
    }
}
