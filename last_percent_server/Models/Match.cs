using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace last_percent_server.Models;

[Table("matches")]
public class Match
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("user1_id")]
    public int User1Id { get; set; }

    [ForeignKey("User1Id")]
    public User? User1 { get; set; }

    [Required]
    [Column("user2_id")]
    public int User2Id { get; set; }

    [ForeignKey("User2Id")]
    public User? User2 { get; set; }

    [Required]
    [Column("session_id_user1")]
    public int SessionIdUser1 { get; set; }

    [ForeignKey("SessionIdUser1")]
    public Session? SessionUser1 { get; set; }

    [Required]
    [Column("session_id_user2")]
    public int SessionIdUser2 { get; set; }

    [ForeignKey("SessionIdUser2")]
    public Session? SessionUser2 { get; set; }

    [Column("matched_at")]
    public DateTime MatchedAt { get; set; } = DateTime.UtcNow;

    [Column("ended_at")]
    public DateTime? EndedAt { get; set; }

    [Column("ended_by_user_id")]
    public int? EndedByUserId { get; set; }

    [Column("ended_reason")]
    public MatchEndedReason? EndedReason { get; set; }
}

public enum MatchEndedReason
{
    User1Switched,
    User2Switched,
    User1BatteryDead,
    User2BatteryDead,
    Disconnected
}
