using Microsoft.EntityFrameworkCore;
using last_percent_server.Models;

namespace last_percent_server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Match> Matches { get; set; }
    public DbSet<WaitingQueue> WaitingQueues { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<FriendRequest> FriendRequests { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
