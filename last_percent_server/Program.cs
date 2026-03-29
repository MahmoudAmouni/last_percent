using Microsoft.EntityFrameworkCore;
using last_percent_server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add CORS so clients (e.g. Flutter/web) can reach the API
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

// Configure Entity Framework Core with MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
{
    // Configure Pomelo EF Core MySQL provider
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // In development, skip HTTPS redirection so plain HTTP requests work
}
else
{
    app.UseHttpsRedirection();
}

app.UseCors();

// Root endpoint to verify API is running
app.MapGet("/", () => Results.Ok(new { message = "Welcome to the Last Percent API!", status = "running" }));

// Test endpoint to verify Database Connection
app.MapGet("/db-status", async (AppDbContext db) => 
{
    try
    {
        var canConnect = await db.Database.CanConnectAsync();
        return canConnect 
            ? Results.Ok(new { message = "Database connection successful!" }) 
            : Results.StatusCode(500);
    }
    catch (Exception ex)
    {
        return Results.Problem(detail: ex.Message, title: "Database connection failed");
    }
});

app.Run();
