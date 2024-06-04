using System.ComponentModel.DataAnnotations;

namespace MyProject.API.Models.DTO
{
    public class LoginInfoDTO
    {
   
        [Required]
        [EmailAddress]
        public string? EmailAddress { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "The Password must be at least 8 chars")]
        [MaxLength(50, ErrorMessage = "The Password must be less then 50 chars")]
        public string? Password { get; set; }
    }
}
