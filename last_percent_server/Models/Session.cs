using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace last_percent_server.Models;

[Table("sessions")]
public class Session
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("user_id")]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public User? User { get; set; }

    [Column("started_at")]
    public DateTime StartedAt { get; set; } = DateTime.UtcNow;

    [Column("ended_at")]
    public DateTime? EndedAt { get; set; }

    [Required]
    [Column("starting_battery_level")]
    public int StartingBatteryLevel { get; set; }

    [Column("ending_battery_level")]
    public int? EndingBatteryLevel { get; set; }

    [Required]
    [Column("status")]
    public SessionStatus Status { get; set; } = SessionStatus.Active;
}

public enum SessionStatus
{
    Active,
    Ended
}
