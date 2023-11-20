using Microsoft.AspNetCore.Mvc;
using ForumAngularVersion.Models;
using ForumAngularVersion.DAL;

namespace ForumAngularVersion.Controllers;


[ApiController]
[Route("api/[controller]")]
public class CommentController : Controller
{

    private readonly ICommentRepository _commentRepository;
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
}