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

    public CommentController(ICommentRepository commentRepository, ILogger<CommentController> logger)
    {
        _commentRepository = commentRepository;
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
            var response = new { success = true, message = "Room " + newComment.CommentDescription + " created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Room creation failed" };
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