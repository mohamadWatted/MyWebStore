using MyProject.API.Context;
using MyProject.API.Models;
using MyProject.API.Repositories.Abstract;

namespace MyProject.API.Repositories.Implementation
{
    public class GalleryImageRepository : RepositoryBase<GalleryImage>, IGalleryImageRepository
    {
        public GalleryImageRepository(MainContext context) : base(context)
        {
        }
    }

}
