using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using last_percent_server.Models;

namespace last_percent_server.Data.Configurations;

public class NotificationLogConfiguration : IEntityTypeConfiguration<NotificationLog>
{
    public void Configure(EntityTypeBuilder<NotificationLog> builder)
    {
        builder.Property(e => e.Type)
            .HasConversion<string>();

        builder.Property(e => e.Method)
            .HasConversion<string>();

        builder.Property(e => e.Status)
            .HasConversion<string>();

        builder.HasOne(nl => nl.User)
            .WithMany()
            .HasForeignKey(nl => nl.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
