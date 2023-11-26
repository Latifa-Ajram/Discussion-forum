using ForumAngularVersion.DAL;
using ForumAngularVersion.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    private readonly ForumDbContext _db;
    private readonly ILogger<SearchController> _logger;

    public SearchController(ForumDbContext db, ILogger<SearchController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Search(string searchTerm)
    {
        try
        {
            _logger.LogInformation($"Received search request with term: {searchTerm}");

            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                // If the query is empty, return an empty list
                return Ok(new { Categories = new List<Category>(), Posts = new List<Post>(), Comments = new List<Comment>() });
            }

            // Your existing code for searching categories, posts, and comments

            var categories = _db.Categories
      .Where(category => EF.Functions.Like(category.CategoryName, $"%{searchTerm}%"))
      .ToList();

            var posts = _db.Posts
                .Where(post => EF.Functions.Like(post.PostTitle, $"%{searchTerm}%"))
                .ToList();
            ;

            var comments = _db.Comments
    .Where(comment => EF.Functions.Like(comment.CommentDescription, $"%{searchTerm}%"))
    .ToList();

            // Return JSON data
            return Ok(new { Categories = categories, Posts = posts, Comments = comments });
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred during the search.");

            // Return a more detailed error message
            return StatusCode(500, $"Internal Server Error: {e.Message}");
        }
    }
}
