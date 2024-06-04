using System.ComponentModel.DataAnnotations;

namespace MyProject.API.Models.Collections
{
    public class RegistrationRequest
    {
        [Required]
        [MinLength(3, ErrorMessage = "Username must be at least 3 chars")]
        [MaxLength(50, ErrorMessage = "Username must be less than 50 chars")]
        public string Username { get; set; }
        [Required]
        [MinLength(3, ErrorMessage = "Password must be at least 3 chars")]
        [MaxLength(50, ErrorMessage = "Password must be less than 50 chars")]
        public string Password { get; set; }
        [Required]

        public string Email { get; set; }
    }
}
