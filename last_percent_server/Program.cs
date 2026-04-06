using last_percent_server.Data;
using last_percent_server.Extensions;
using last_percent_server.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors();
app.UseExceptionHandler();

app.UseStatusCodePages(async context =>
{
    context.HttpContext.Response.ContentType = "application/json";
    var message = context.HttpContext.Response.StatusCode switch
    {
        404 => "The requested resource was not found.",
        401 => "Unauthorized access.",
        403 => "Forbidden access.",
        _ => "An error occurred."
    };
    await context.HttpContext.Response.WriteAsJsonAsync(new { 
        message, 
        statusCode = context.HttpContext.Response.StatusCode 
    });
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<MatchmakingHub>("/hubs/matchmaking");

app.MapGet("/", () => Results.Ok(new { message = "Welcome to the Last Percent API!", status = "running" }));

app.MapGet("/db-status", async (AppDbContext db) => 
{
    try
    {
        return await db.Database.CanConnectAsync() 
            ? Results.Ok(new { message = "Database connection successful!" }) 
            : Results.StatusCode(500);
    }
    catch (Exception ex)
    {
        return Results.Problem(detail: ex.Message, title: "Database connection failed");
    }
});

app.Run();
