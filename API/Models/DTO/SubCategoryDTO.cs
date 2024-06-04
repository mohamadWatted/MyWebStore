using MyProject.API.Models;

namespace API.Models.DTO
{
    public class SubCategoryDTO
    {
        public int ID { get; set; }
        public int CategoryID { get; set; }
        public string SubCategoryName { get; set; }
        public List<int> Products { get; set; }
    }
}
