using System.ComponentModel.DataAnnotations;

namespace MyProject.API.Models
{
    public class Customer
    {
        [Key]
        public int ID { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        public string Mail { get; set; }
        public List<Order> Order { get; set; }
    }
}
