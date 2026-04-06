using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using last_percent_server.Models;

namespace last_percent_server.Data.Configurations;

public class FriendshipConfiguration : IEntityTypeConfiguration<Friendship>
{
    public void Configure(EntityTypeBuilder<Friendship> builder)
    {
        builder.HasIndex(f => new { f.User1Id, f.User2Id })
            .IsUnique();

        builder.HasOne(f => f.User1)
            .WithMany()
            .HasForeignKey(f => f.User1Id)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(f => f.User2)
            .WithMany()
            .HasForeignKey(f => f.User2Id)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(f => f.FriendRequest)
            .WithMany()
            .HasForeignKey(f => f.FriendRequestId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
