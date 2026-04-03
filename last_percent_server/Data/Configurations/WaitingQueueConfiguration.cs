using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using last_percent_server.Models;

namespace last_percent_server.Data.Configurations;

public class WaitingQueueConfiguration : IEntityTypeConfiguration<WaitingQueue>
{
    public void Configure(EntityTypeBuilder<WaitingQueue> builder)
    {
        builder.Property(e => e.Status)
            .HasConversion<string>();

        builder.HasOne(wq => wq.User)
            .WithMany()
            .HasForeignKey(wq => wq.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(wq => wq.Session)
            .WithMany()
            .HasForeignKey(wq => wq.SessionId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
