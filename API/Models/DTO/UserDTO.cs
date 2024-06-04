using MyProject.API.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace MyProject.API.Models.DTO
{
    public class UserDTO
    {

        [Required]
        [MinLength(3, ErrorMessage = "User Name must be at least 3 chars")]
        [MaxLength(50, ErrorMessage = "User Name must be less then 50 chars")]
        public string UserName { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "The Password must be at least 8 chars")]
        [MaxLength(50, ErrorMessage = "The Password must be less then 50 chars")]
        public string? Password { get; set; }

    }
}
