using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace last_percent_server.Models;

[Table("notification_logs")]
public class NotificationLog
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("user_id")]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public User? User { get; set; }

    [Required]
    [Column("type")]
    public NotificationType Type { get; set; }

    [Required]
    [Column("method")]
    public NotificationMethod Method { get; set; }

    [Required]
    [Column("content")]
    public string Content { get; set; } = string.Empty;

    [Required]
    [Column("status")]
    public NotificationStatus Status { get; set; } = NotificationStatus.Pending;

    [Column("sent_at")]
    public DateTime SentAt { get; set; } = DateTime.UtcNow;

    [MaxLength(500)]
    [Column("error_msg")]
    public string? ErrorMessage { get; set; }
}

public enum NotificationType
{
    FriendRequest,
    PhoneShared
}

public enum NotificationMethod
{
    Email,
    WhatsApp
}

public enum NotificationStatus
{
    Pending,
    Sent,
    Failed
}
