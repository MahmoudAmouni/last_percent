using last_percent_server.Data;
using last_percent_server.Extensions;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Services
builder.Services.AddControllers();
builder.Services.AddInfrastructure(builder.Configuration); // Modular infrastructure setup
builder.Services.AddApplicationServices();              // Modular application services setup

var app = builder.Build();

// 2. Configure HTTP Pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors();

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
