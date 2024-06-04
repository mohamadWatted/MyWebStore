using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject.API.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public bool IsPaid { get; set; }
        public int CustomerID { get; set; }
        public int CartId{ get; set; }
        public int ShippingAddressID { get; set; }
        public Cart Cart { get; set; }
        public virtual Customer Customer { get; set; }
 
    }
}
