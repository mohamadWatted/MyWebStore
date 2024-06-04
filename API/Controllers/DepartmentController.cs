using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProject.API.Models;
using MyProject.API.Models.DTO;
using MyProject.API.Repositories.Abstract;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : Controller
    {
        private readonly ILogger<DepartmentController> _logger;
        private readonly IDepartmentRepository _departmentRepo;

        public DepartmentController(
            IDepartmentRepository _departmentRepo,

            ILogger<DepartmentController> _logger
            )
        {
            this._logger = _logger ?? throw new ArgumentNullException(nameof(_logger));
            this._departmentRepo = _departmentRepo ?? throw new ArgumentNullException(nameof(_departmentRepo));
        }

        [HttpGet]
        public IActionResult GetAllDepartments()
        {
            try
            {
                var result = _departmentRepo
                    .FindAll()
                    .Include(x => x.Products)
                    .ThenInclude(x => x.SubCategory)
                    .ThenInclude(x => x.Category)
                    .Select(department => new
                    {
                        department.ID,
                        department.Name,
                        categories = department.Products
                            .Select(p => p.SubCategory.Category)
                            .Distinct()
                            .Select(c => new
                            {
                                id = c.ID,
                                name = c.Name,
                                subcategories = c.SubCategories.Select(sc =>
                                new
                                {
                                    id = sc.ID,
                                    name = sc.SubCategoryName,
                                    products = sc.Product.Select(p => new
                                    {
                                        id = p.ID,
                                        name = p.ProductName,
                                        price = p.Price,
                                        departmentID = p.DepartmentID,                                
                                        galleryImage = p.GalleryImage,            
                                    })
                                })
                            })
                            .ToList()
                    })
                    .ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"{ex.Message}", ex);
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult GetByIdDepartment(int id)
        {
            try
            {
                var result = _departmentRepo.FindByCondition(c => c.ID == id).FirstOrDefault();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"{ex.Message}", ex);
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult CreateDepartment(DepartmentDTO item)
        {
            try
            {
                if (item == null)
                {
                    return BadRequest();
                }


                var newOrderItem = new Department()
                {
                    ID = item.ID,
                    Name = item.Name,
                    Products = new List<Product>()
                };

                var result = _departmentRepo.Create(newOrderItem);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"{ex.Message}", ex);
                return StatusCode(500);
            }
        }

        [HttpPut]
        public IActionResult UpdateDepartment(Department item)
        {
            try
            {
                if (item == null)
                {
                    return NoContent();
                }
                var result = _departmentRepo.Update(item);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"{ex.Message}", ex);
                return StatusCode(500);
            }
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteDepartment(int id)
        {
            try
            {
                var department = _departmentRepo.FindByCondition(d => d.ID == id).FirstOrDefault();
                if (department == null)
                {
                    return NoContent();
                }
                _departmentRepo.Delete(department);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"{ex.Message}", ex);
                return StatusCode(500);
            }
        }
    }
}