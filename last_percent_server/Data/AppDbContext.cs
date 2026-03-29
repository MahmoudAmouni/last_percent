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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Tell EF Core to store the C# enum values as plain strings in the database
        // This satisfies the "no enums in the database" requirement
        modelBuilder.Entity<Session>()
            .Property(e => e.State)
            .HasConversion<string>();

        modelBuilder.Entity<Session>()
            .Property(e => e.EndReason)
            .HasConversion<string>();
    }
}
