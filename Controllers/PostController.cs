using Microsoft.AspNetCore.Mvc;
using ForumAngularVersion.Models;
using ForumAngularVersion.DAL;

namespace ForumAngularVersion.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostController : Controller
{
    private readonly IPostRepository _postRepository;
    private readonly ITopicRepository _topicRepository;
    private readonly ICommentRepository _commentRepository;
    private readonly ILogger<PostController> _logger;

    public PostController(IPostRepository postRepository, ICommentRepository commentRepository, ITopicRepository topicRepository, ILogger<PostController> logger)
    {
        _postRepository = postRepository;
        _commentRepository = commentRepository;
        _topicRepository = topicRepository;
        _logger = logger;
    }

    //Get categoryname based on it's id
    [HttpGet("topicName/{id}")]
    public async Task<IActionResult> GetTopicNameById(int Id)
    {
        try
        {
            var topic = await _topicRepository.GetTopicById(Id);
            if (topic == null)
            {
                _logger.LogError($"[TopicController] Topic with ID {Id} not found.");
                return NotFound("Topic not found");
            }
            return Ok(new { topicName = topic.TopicName });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[TopicController] An error occurred while getting room name with ID {Id}", Id);
            return StatusCode(500, "An error occurred.");
        }
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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPostById(int id)
    {
        try
        {
            var post = await _postRepository.GetPostById(id);

            if (post == null)
            {
                _logger.LogError("[PostController] post id not found while executing _postRepository.GetPostById()");
                return NotFound();
            }

            return Ok(post);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting post with ID {Id}", id);
            return StatusCode(500, "An error occurred.");
        }
    }

    //Method to get a list of posts based on the given topic.
    [HttpGet("byTopicId/{id}")]
    public async Task<List<Post>> GetPostsByTopicId(int Id)
    {
        try
        {
            Topic topic = await _topicRepository.GetTopicById(Id);
            if (topic == null)
            {
                return null;
            }
            return topic.Posts; //Return the posts of the given topic.
        }
        catch (Exception e)
        {
            //log an error if it can not find id and then returns null
            _logger.LogError("[PostController]  FindAsync(id) failed when _topicRepository.GetTopicById(id) for TopicId {TopicId}, error message: {e}", Id, e.Message);
            return null;
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Post newPost)
    {
        if (newPost == null)
        {
            return BadRequest("Invalid Post data");
        }
        // Set the PostTime property to the current time
        newPost.PostTime = DateTime.Now;
        bool returnOK = await _postRepository.Create(newPost);

        Comment comment = new Comment();
        comment.PostId = newPost.PostId;
        //comment.CommentDescription = newPost.commentdDescription;


        bool returnOk2 = await _commentRepository.Create(comment);

        if (returnOK)
        {
            var response = new { success = true, message = "Post " + newPost.PostTitle + " created successfully" };
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
            var response = new { success = true, message = "Post " + updatedPost.PostTitle + " updated successfully" };
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