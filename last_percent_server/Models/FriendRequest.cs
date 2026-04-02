using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace last_percent_server.Models;

[Table("friend_requests")]
public class FriendRequest
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("match_id")]
    public int MatchId { get; set; }

    [ForeignKey("MatchId")]
    public Match? Match { get; set; }

    [Required]
    [Column("triggered_by_user_id")]
    public int TriggeredByUserId { get; set; }

    [ForeignKey("TriggeredByUserId")]
    public User? TriggeredByUser { get; set; }

    [Required]
    [Column("other_user_id")]
    public int OtherUserId { get; set; }

    [ForeignKey("OtherUserId")]
    public User? OtherUser { get; set; }

    [Column("triggered_user_said_yes")]
    public bool TriggeredUserSaidYes { get; set; } = false;

    [Column("other_user_said_yes")]
    public bool OtherUserSaidYes { get; set; } = false;

    [Column("notified_other_about_requester")]
    public bool NotifiedOtherAboutRequester { get; set; } = false;

    [Column("notified_requester_about_other")]
    public bool NotifiedRequesterAboutOther { get; set; } = false;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("resolved_at")]
    public DateTime? ResolvedAt { get; set; }
}
