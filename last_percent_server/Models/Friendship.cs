using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace last_percent_server.Models;

[Table("friendships")]
public class Friendship
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
    [Column("friend_request_id")]
    public int FriendRequestId { get; set; }

    [ForeignKey("FriendRequestId")]
    public FriendRequest? FriendRequest { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
