using System.ComponentModel.DataAnnotations;

namespace last_percent_server.Models.DTOs;

public class JoinQueueDto
{
    [Required]
    [Range(0, 20, ErrorMessage = "Battery level must be 20% or below to join the queue.")]
    public int BatteryLevel { get; set; }
}
