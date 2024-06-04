using System.ComponentModel.DataAnnotations;

namespace MyProject.API.Models.DTO
{
    public class GalleryImageDTO
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string ImageURL { get; set; }
        public string Alt { get; set; }
        public int ProductID { get; set; }
    }
}
