using System.ComponentModel.DataAnnotations;

namespace MyProject.API.Models
{
    public class Department
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}