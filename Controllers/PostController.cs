using Microsoft.AspNetCore.Mvc;
using ForumAngularVersion.Models;
using ForumAngularVersion.DAL;

namespace ForumAngularVersion.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostController : Controller
{
    private readonly IPostRepository _postRepository;
    private readonly ILogger<PostController> _logger;

    public PostController(IPostRepository postRepository, ILogger<PostController> logger)
    {
        _postRepository = postRepository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var posts = await _postRepository.GetAll();
        if (posts == null)
        {
            _logger.LogError("[PostController] Post list not found while executing _postRepository.GetAll()");
            return NotFound("Post list not found");
        }
        return Ok(posts);
    }

      [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Post newPost) {
       if(newPost == null)
        {
            return BadRequest("Invalid Post data");
        }
       bool returnOK = await _postRepository.Create(newPost);
        if(returnOK)
        {
            var response = new { success = true, message = "Post " + newPost.PostName + " created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Post creation failed" };
            return Ok(response);
        }
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(Post updatedPost)
    {
        if (updatedPost == null)
        {
            return BadRequest("Invalid post data.");
        }
        bool returnOk = await _postRepository.Update(updatedPost);
        if (returnOk)
        {
            var response = new { success = true, message = "Post " + updatedPost.PostName + " updated successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Post update failed" };
            return Ok(response);
        }
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeletePost(int id)
    {
        bool returnOk = await _postRepository.Delete(id);
        if (!returnOk)
        {
            _logger.LogError("[PostController] Post deletion failed for the PostId {PostId:0000}", id);
            return BadRequest("Post deletion failed");
        }
        var response = new { success = true, message = "Post " + id.ToString() + " deletion succesfully" };
        return Ok(response);
    }






}