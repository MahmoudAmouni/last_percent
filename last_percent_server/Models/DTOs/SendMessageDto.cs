using System.ComponentModel.DataAnnotations;

namespace last_percent_server.Models.DTOs;

public class SendMessageDto
{
    [Required]
    public string Content { get; set; } = string.Empty;
}
