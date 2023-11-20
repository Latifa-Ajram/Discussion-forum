
using ForumAngularVersion.Models;

namespace ForumAngularVersion.DAL;

public interface IPostRepository
{
    Task<IEnumerable<Post>> GetAll();
    Task<Post?> GetPostById(int id);
    Task<int?> GetTopicId(int id);
    Task<bool> Create(Post post);
    Task<bool> Update(Post post);
    Task<bool> Delete(int id);
}