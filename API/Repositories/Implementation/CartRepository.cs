using MyProject.API.Context;
using MyProject.API.Models;
using MyProject.API.Repositories.Abstract;

namespace MyProject.API.Repositories.Implementation
{
    public class CartRepository : RepositoryBase<Cart>, ICartRepository
    {
        public CartRepository(MainContext context) : base(context)
        {
            
        }
    }
}
