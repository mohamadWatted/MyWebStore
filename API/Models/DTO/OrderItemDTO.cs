namespace MyProject.API.Models.DTO
{
    public class OrderItemDTO
    {
        public int CartId { get; set; }
        public int Quantity { get; set; }
        //public int CartID { get; set; }
        public int ProductID { get; set; }
    }
}
