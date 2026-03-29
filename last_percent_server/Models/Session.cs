using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace last_percent_server.Models;

public class Session
{
    [Key]
    public Guid SessionId { get; set; } = Guid.NewGuid();

    public int? UserId { get; set; }

    [NotMapped]
    public User? User { get; set; }

    public int BatteryAtStart { get; set; }
    public int CurrentBattery { get; set; }

    public bool CurrentlyCharging { get; set; } = false;
    public bool Battery15Triggered { get; set; } = false;
    public bool Battery5Triggered { get; set; } = false;

    [Required]
    [MaxLength(20)]
    public SessionState State { get; set; } = SessionState.Waiting;

    public DateTime? EndedAt { get; set; }

    [MaxLength(20)]
    public SessionEndReason? EndReason { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum SessionState
{
    Waiting,
    Matched,
    Awaiting15,
    Awaiting5,
    Completed,
    Expired
}

public enum SessionEndReason
{
    BatteryDied,
    UserClosed,
    Switched,
    Completed
}
