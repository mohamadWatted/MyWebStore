using MyProject.API.Models.DTO;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class ProductDTO
{
    public int ID { get; set; }

    [Required(ErrorMessage = "DepartmentID is required")]
    public int DepartmentID { get; set; }

    [Required(ErrorMessage = "CategoryID is required")]
    public int CategoryID { get; set; }

    [Required(ErrorMessage = "SubCategoryID is required")]
    public int SubCategoryID { get; set; }

    [Required(ErrorMessage = "Product name is required")]

    [StringLength(100, ErrorMessage = "Product name cannot be longer than 100 characters")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Price is required")]

    public decimal Price { get; set; }

    public string Description { get; set; }

    public List<string>? Colors { get; set; } // Nullable list of strings

    public List<GalleryImageDTO> GalleryImage { get; set; } // List of GalleryImageDTO objects

    public List<string>? Size { get; set; } // Nullable list of strings
}
