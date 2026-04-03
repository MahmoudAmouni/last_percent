using System.ComponentModel.DataAnnotations;

namespace last_percent_server.Models.DTOs;

public class StartSessionDto
{
    [Required]
    [Range(0, 20, ErrorMessage = "Battery level must be 20% or below to start a session.")]
    public int StartingBatteryLevel { get; set; }
}
