using System.ComponentModel.DataAnnotations;

namespace MyProject.API.Models.DTO
{
    public class CategoryDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }  
        public List<int> SubCategories { get; set; }
    }
}
