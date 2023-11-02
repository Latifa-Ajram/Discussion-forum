using ForumAngularVersion.Models;

namespace ForumAngularVersion.DAL;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>?> GetAll();
    Task<Category?> GetCategoryById(int id);
    Task<bool> Create(Category category);
    Task<bool> Update(Category category);
    Task<bool> Delete(int id);
}

