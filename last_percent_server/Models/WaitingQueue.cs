using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace last_percent_server.Models;

[Table("waiting_queue")]
public class WaitingQueue
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
    [Column("session_id")]
    public int SessionId { get; set; }

    [ForeignKey("SessionId")]
    public Session? Session { get; set; }

    [Required]
    [Column("battery_level")]
    public int BatteryLevel { get; set; }

    [Column("queued_at")]
    public DateTime QueuedAt { get; set; } = DateTime.UtcNow;

    [Required]
    [Column("status")]
    public QueueStatus Status { get; set; } = QueueStatus.Waiting;
}

public enum QueueStatus
{
    Waiting,
    Matched,
    Cancelled
}
