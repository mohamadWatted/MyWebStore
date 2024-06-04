using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject.API.Models
{
    public class Cart
    {
        public int CartId { get; set; }
        public int CartQuantity { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}