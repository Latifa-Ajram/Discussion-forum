using ForumAngularVersion.Models;

namespace ForumAngularVersion.DAL;
public interface ICommentRepository
{
    Task<IEnumerable<Comment>> GetAll();
    Task<Comment?> GetCommentById(int id);
    Task<int?> GetPostId(int id);
    Task<bool> Create(Comment comment);
    Task<bool> Update(Comment comment);
    Task<bool> Delete(int id);
}


