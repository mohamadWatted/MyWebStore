namespace MyProject.API.Models.DTO
{
    public class DepartmentDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public ICollection<string> Products { get; set; }
    }
}
