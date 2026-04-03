using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using last_percent_server.Models;

namespace last_percent_server.Data.Configurations;

public class FriendRequestConfiguration : IEntityTypeConfiguration<FriendRequest>
{
    public void Configure(EntityTypeBuilder<FriendRequest> builder)
    {
        builder.HasOne(fr => fr.Match)
            .WithMany()
            .HasForeignKey(fr => fr.MatchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(fr => fr.TriggeredByUser)
            .WithMany()
            .HasForeignKey(fr => fr.TriggeredByUserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(fr => fr.OtherUser)
            .WithMany()
            .HasForeignKey(fr => fr.OtherUserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
