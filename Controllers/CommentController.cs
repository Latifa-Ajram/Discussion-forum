using Microsoft.AspNetCore.Mvc;
using ForumAngularVersion.Models;
using ForumAngularVersion.DAL;

namespace ForumAngularVersion.Controllers;


[ApiController]
[Route("api/[controller]")]
public class CommentController : Controller
{

    private readonly ICommentRepository _commentRepository;
    private readonly IPostRepository _postRepository;
    private readonly ILogger<CommentController> _logger;

    public CommentController(ICommentRepository commentRepository, IPostRepository postRepository ,ILogger<CommentController> logger)
    {
        _commentRepository = commentRepository;
        _postRepository = postRepository;   
        _logger = logger;
    }
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var comments = await _commentRepository.GetAll();
        if (comments == null)
        {
            _logger.LogError("[CommentController] Comment list not found while executing _commentRepository.GetAll()");
            return NotFound("Comment list not found");
        }
        return Ok(comments);
    }

    //Get postname based on it's id
    [HttpGet("postName/{id}")]
    public async Task<IActionResult> GetPostNameById(int Id)
    {
        try
        {
            var post = await _postRepository.GetPostById(Id);
            if (post == null)
            {
                _logger.LogError($"[CommentController] Post with ID {Id} not found.");
                return NotFound("Post not found");
            }
            return Ok(new { postName = post.PostTitle });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[CommentController] An error occurred while getting topic name with ID {Id}", Id);
            return StatusCode(500, "An error occurred.");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCommentById(int id)
    {
        var category = await _commentRepository.GetCommentById(id);
        if (category == null)
        {
            _logger.LogError("[CommentController] Comment not found while executing _commentRepository.GetCommentById(id)");
            return NotFound("Comment not found");
        }
        return Ok(category);
    }

    //Method to get a list of comments based on the given post.
    [HttpGet("byPostId/{id}")]
    public async Task<List<Comment>> GetCommentsByPostId(int Id)
    {
        try
        {
            Post post = await _postRepository.GetPostById(Id);
            if (post == null)
            {
                return null;
            }
            return post.Comments; //Return the posts of the given topic.
        }
        catch (Exception e)
        {
            //log an error if it can not find id and then returns null
            _logger.LogError("[CommentController]  FindAsync(id) failed when _postRepository.GetPostById(id) for PostId {PostId}, error message: {e}", Id, e.Message);
            return null;
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Comment newComment)
    {
        if (newComment == null)
        {
            return BadRequest("Invalid comment data.");
        }
        bool returnOK = await _commentRepository.Create(newComment);
        
        if (returnOK)
        {
            var response = new { success = true, message = "Comment " + newComment.CommentDescription + " created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Comment creation failed" };
            return Ok(response);
        }
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(Comment updatedComment)
    {
        if (updatedComment == null)
        {
            return BadRequest("Invalid comment data.");
        }
        bool returnOk = await _commentRepository.Update(updatedComment);

        if (returnOk)
        {
            var response = new { success = true, message = "Comment " + updatedComment.CommentDescription + " updated successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Comment update failed" };
            return Ok(response);
        }
    }


    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int Id)
    {
        bool returnOk = await _commentRepository.Delete(Id);
        if (!returnOk)
        {
            _logger.LogError("[CommentController] Comment deletion failed for the CommenId {CommentId:0000}", Id);
            return BadRequest("Comment deletion failed");
        }
        var response = new { success = true, message = "Comment " + Id.ToString() + " deletion succesfully" };
        return Ok(response);
    }


}