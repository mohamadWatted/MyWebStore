using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject.API.Models
{
    public class GalleryImage
    {
        [Key]
        public int ID { get; set; }

        [StringLength(255)]
        public string? Title { get; set; }

        public string? ImageURL { get; set; }       
        public string? Alt { get; set; }
        public Product Product { get; set; }
        public int ProductID { get; set; }
    }
}
