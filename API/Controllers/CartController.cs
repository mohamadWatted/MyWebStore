using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProject.API.Models;
using MyProject.API.Models.DTO;
using MyProject.API.Repositories.Abstract;

namespace MyProject.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : Controller
    {
        private readonly ILogger _logger;
        private readonly ICartRepository _cardsRepo;
        private readonly IOrderItemRepository _orderItemRpository;

        public CartController(
            ICartRepository _cardsRepo,
            IOrderItemRepository _orderItemRpository
            )
        {
            this._orderItemRpository = _orderItemRpository ?? throw new ArgumentNullException(nameof(_orderItemRpository));
            this._cardsRepo = _cardsRepo ?? throw new ArgumentNullException(nameof (_cardsRepo));
        }
  

        [HttpPut]
        [Route("update")]
        public IActionResult UpdateCart(OrderItemDTO updateDTO)
        {
            try
            {
                // Find the cart using the provided CartId
                var cart = _cardsRepo.FindByCondition(cart => cart.CartId == updateDTO.CartId)
                    .Include(c => c.OrderItems) // Include OrderItems for eager loading
                    .FirstOrDefault();

                if (cart == null)
                {
                    return NotFound("Cart not found");
                }

                // Find the OrderItem for the given ProductID in the cart
                var orderItem = cart.OrderItems.FirstOrDefault(item => item.ProductID == updateDTO.ProductID);

                if (updateDTO.Quantity == 0)
                {
                    // If Quantity is 0, remove the orderItem from the cart
                    if (orderItem != null)
                    {
                        cart.OrderItems.Remove(orderItem);

                    }
                }
                else
                {
                    if (orderItem == null)
                    {
                        // If OrderItem doesn't exist, create a new one
                        orderItem = new OrderItem()
                        {
                            ProductID = updateDTO.ProductID,
                            Quantity = updateDTO.Quantity
                        };
                        cart.OrderItems.Add(orderItem);
                        _orderItemRpository.Create(orderItem); // You may need to implement a Create method
                    }
                    else
                    {
                        // Update the quantity of the existing orderItem
                        orderItem.Quantity = updateDTO.Quantity;
                    }
                }

                _orderItemRpository.Save(); // Save changes to OrderItems
                _cardsRepo.Save(); // Save changes to the cart
                                   // Find the cart using the provided CartId
                var updatedCart = _cardsRepo.FindByCondition(c => c.CartId == updateDTO.CartId)
                    .Include(c => c.OrderItems)
                    .ThenInclude(orderItems => orderItems.Product)
                    .ThenInclude(item => item.GalleryImage)
                    .FirstOrDefault();

                return Ok(updatedCart);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the cart.");
                return StatusCode(500, "An error occurred while deleting the cart.");
            }

        }
    }
}
