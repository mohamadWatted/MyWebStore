using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProject.API.Models;
using MyProject.API.Models.DTO;
using MyProject.API.Repositories.Abstract;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderItemController : Controller
    {
        private readonly IOrderItemRepository _orderItemRepo;
        private readonly IOrderRepository _orderRepo;
        private readonly IProductRepository _productRepo;
        private readonly ILogger<OrderItemController> _logger;

        public OrderItemController(
            IOrderItemRepository _orderItemRepo,
            IOrderRepository _orderRepo,
            IProductRepository _productRepo,
            ILogger<OrderItemController> _logger
            )
        {
            this._productRepo = _productRepo ?? throw new ArgumentNullException(nameof(_productRepo));
            this._orderRepo = _orderRepo ?? throw new ArgumentNullException(nameof(_orderRepo));
            this._orderItemRepo = _orderItemRepo ?? throw new ArgumentNullException(nameof(_orderItemRepo));
            this._logger = _logger ?? throw new ArgumentNullException(nameof(_logger));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var result = _orderItemRepo.FindAll().ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An error occurred while creating the item.");

                return StatusCode(500, new
                {
                    Message = "An error occurred while creating the item.",
                    ExceptionMessage = ex.Message,
                    InnerExceptionMessage = ex.InnerException?.Message, // Include inner exception message
                    StackTrace = ex.StackTrace
                });
            }         
        }

        [HttpGet("{id:int}")]
        public IActionResult GetByIdOrder(int id)
        {
            try
            {
                var result = _orderItemRepo.FindByCondition(o => o.ID == id).FirstOrDefault();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An error occurred while creating the item.");

                return StatusCode(500, new
                {
                    Message = "An error occurred while creating the item.",
                    ExceptionMessage = ex.Message,
                    InnerExceptionMessage = ex.InnerException?.Message, // Include inner exception message
                    StackTrace = ex.StackTrace
                });
            }
        }

        //[HttpPost]
        //public IActionResult CreateOrderItem(OrderItemDTO item)
        //{
        //    try
        //    {
        //        if (item == null)
        //        {
        //            return BadRequest();
        //        }

        //        var current = _orderItemRepo.FindByCondition(u => u.ID == item.ID).FirstOrDefault();
        //        if (current == null)
        //        {
        //            return NotFound();
        //        }
                
        //        current.ID = item.ID;
        //        current.Quantity = item.Quantity;
        //        //current.CartID = item.CartID;
        //        current.ProductID = item.ProductID;

        //        _orderItemRepo.Update(current);

        //        return NoContent();
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogCritical(ex, "An error occurred while creating the item.");

        //        return StatusCode(500, new
        //        {
        //            Message = "An error occurred while creating the item.",
        //            ExceptionMessage = ex.Message,
        //            InnerExceptionMessage = ex.InnerException?.Message, // Include inner exception message
        //            StackTrace = ex.StackTrace
        //        });
        //    }

        //}

        [HttpPut]
        public IActionResult PutOrderItem(OrderItem item)
        {
            if (item == null)
            {
                BadRequest();
            }
            var exists = _orderItemRepo.FindByCondition(u => u.ID == item.ID).Any();

            if (!exists)
            {
                return NotFound();
            }

            var result = _orderItemRepo.Update(item);

            return NoContent();
        }

        [HttpDelete("id:int")]
        public IActionResult DeleteOrderItem(int id)
        {
            try
            {
                var OrderItem = _orderItemRepo.FindByCondition(o => o.ID == id).FirstOrDefault();
                if (OrderItem == null)
                {
                    return NoContent();
                }
                _orderItemRepo.Delete(OrderItem);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An error occurred while creating the item.");

                return StatusCode(500, new
                {
                    Message = "An error occurred while creating the item.",
                    ExceptionMessage = ex.Message,
                    InnerExceptionMessage = ex.InnerException?.Message, // Include inner exception message
                    StackTrace = ex.StackTrace
                });
            }         
        }
    }
}
