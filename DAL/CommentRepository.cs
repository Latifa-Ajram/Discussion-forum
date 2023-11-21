using ForumAngularVersion.DAL;
using Microsoft.EntityFrameworkCore;
using ForumAngularVersion.Models;

namespace ForumAngularVersion.DAL;

public class CommentRepository : ICommentRepository
{
    private readonly ForumDbContext _db;

    private readonly ILogger<CommentRepository> _logger;

    public CommentRepository(ForumDbContext db, ILogger<CommentRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<int?> GetPostId(int id)
    {
        var comment = await _db.Comments.FindAsync(id);
        return comment.PostId;
    }

    public async Task<IEnumerable<Comment>> GetAll()
    {
        try
        {
            return await _db.Comments.ToListAsync();

        }
        catch (Exception e)
        {
            _logger.LogError("[CommentRepository] comment ToListAsync() failed when GetAll(), error message: {e}", e.Message);
            return null;
        }

    }
    public async Task<Comment?> GetCommentById(int id)
    {
        try
        {
            return await _db.Comments.FindAsync(id);
        }
        catch (Exception e)
        {
            _logger.LogError("[CommentRepository] Comment FindAsync(id) failed when GetItemById " +
                "for CommentId {CommentId:0000}, error message: [e} ", id, e.Message);
            return null;
        }

    }
    public async Task<bool> Create(Comment Comment)
    {
        try
        {
            _db.Comments.Add(Comment);
            await _db.SaveChangesAsync();
            return true;

        }
        catch (Exception e)
        {
            _logger.LogError("[CommentRepository] comment creation failed for CommentID {@comment}, error message: {e}", Comment, e.Message);
            return false;
        }

    }

    public async Task<bool> Update(Comment comment)
    {
        try
        {
            _db.Comments.Update(comment);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("[CommentRepository] comment failed when updating the Comment {@comment}, error message: {e}", comment.CommentId, e.Message);
            return false;
        }

    }

    public async Task<bool> Delete(int id)
    {
        try
        {
            var Comment = await _db.Comments.FindAsync(id);
            if (Comment == null)
            {
                return false;
            }
            _db.Comments.Remove(Comment);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {

            _logger.LogError("[CommenRepository] commen deletion failed for the CommentId {CommentId:0000}, error message: {e}", id, e.Message);
            return false;

        }

    }



}