namespace MyProject.API.Models.DTO

{
    public class CustomerDTO
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mail { get; set; }
        public List<int> Order { get; set; }
    }
}
