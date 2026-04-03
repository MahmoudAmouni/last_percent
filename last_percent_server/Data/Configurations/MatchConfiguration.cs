using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using last_percent_server.Models;

namespace last_percent_server.Data.Configurations;

public class MatchConfiguration : IEntityTypeConfiguration<Match>
{
    public void Configure(EntityTypeBuilder<Match> builder)
    {
        builder.Property(e => e.EndedReason)
            .HasConversion<string>();

        builder.HasOne(m => m.User1)
            .WithMany()
            .HasForeignKey(m => m.User1Id)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(m => m.User2)
            .WithMany()
            .HasForeignKey(m => m.User2Id)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(m => m.SessionUser1)
            .WithMany()
            .HasForeignKey(m => m.SessionIdUser1)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(m => m.SessionUser2)
            .WithMany()
            .HasForeignKey(m => m.SessionIdUser2)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
