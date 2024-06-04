using System.ComponentModel.DataAnnotations;

namespace MyProject.API.Models
{
    public class Category
    {
        [Key]
        public int ID { get; set; }
        public string? Name { get; set; }  
        public ICollection<SubCategory>? SubCategories { get; set; }

    }
}
