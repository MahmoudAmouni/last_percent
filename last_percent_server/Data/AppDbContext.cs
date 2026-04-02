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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Session>()
            .Property(e => e.Status)
            .HasConversion<string>();

        modelBuilder.Entity<Match>()
            .Property(e => e.EndedReason)
            .HasConversion<string>();

        modelBuilder.Entity<Match>()
            .HasOne(m => m.User1)
            .WithMany()
            .HasForeignKey(m => m.User1Id)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Match>()
            .HasOne(m => m.User2)
            .WithMany()
            .HasForeignKey(m => m.User2Id)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Match>()
            .HasOne(m => m.SessionUser1)
            .WithMany()
            .HasForeignKey(m => m.SessionIdUser1)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Match>()
            .HasOne(m => m.SessionUser2)
            .WithMany()
            .HasForeignKey(m => m.SessionIdUser2)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
}
