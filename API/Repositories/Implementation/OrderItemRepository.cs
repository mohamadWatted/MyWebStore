using MyProject.API.Context;
using MyProject.API.Models;
using MyProject.API.Repositories.Abstract;

namespace MyProject.API.Repositories.Implementation
{
    public class OrderItemRepository : RepositoryBase<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepository(MainContext context) : base(context)
        {
        }
    }

}
