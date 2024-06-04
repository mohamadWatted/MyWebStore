using MyProject.API.Context;
using System.Linq.Expressions;

namespace MyProject.API.Repositories.Abstract
{
    public interface IRepositoryBase<T>
    {
        IQueryable<T> FindAll();
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> condition);
        Task<T> Create(T item);
        public delegate void CreateWithDelegate(MainContext context);
        Task<T> CreateWith(T item, CreateWithDelegate beforeSave);
        T Update(T item);
        void Delete(T item);
        void Save();

    }
}
