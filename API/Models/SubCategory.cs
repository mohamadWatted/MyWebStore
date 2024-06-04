using System.ComponentModel.DataAnnotations;

namespace MyProject.API.Models
{
    public class SubCategory
    {
        [Key]
        public int ID { get; set; }
        public int CategoryID { get; set; }
        public string? SubCategoryName { get; set; }
        public List<Product>? Product { get; set; }
        public Category? Category { get; set; }
    }
}
