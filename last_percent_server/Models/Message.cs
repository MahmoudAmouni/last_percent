using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace last_percent_server.Models;

[Table("messages")]
public class Message
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
    [Column("sender_id")]
    public int SenderId { get; set; }

    [ForeignKey("SenderId")]
    public User? Sender { get; set; }

    [Required]
    [Column("content")]
    public string Content { get; set; } = string.Empty;

    [Column("sent_at")]
    public DateTime SentAt { get; set; } = DateTime.UtcNow;

    [Column("is_read")]
    public bool IsRead { get; set; } = false;
}
