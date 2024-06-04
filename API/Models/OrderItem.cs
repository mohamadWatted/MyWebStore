using System.ComponentModel.DataAnnotations;

namespace MyProject.API.Models
{
    public class OrderItem
    {
        [Key]
        public int ID { get; set; }
        public int Quantity { get; set; }
        public Cart Cart { get; set; }
        public int CartID { get; set; }
        public Product Product { get; set; }
        public int ProductID { get; set; }
    }
}
