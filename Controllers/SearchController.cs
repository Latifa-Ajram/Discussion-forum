using ForumAngularVersion.DAL;
using ForumAngularVersion.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileSystemGlobbing.Internal;

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


            //Searches for categories, posts,comment in the Categories, Post, Comments table where the CategoryName, PostTitle and CommentsDescription
            //contains the specified search term.
           // EF.Functions.Like is used for case -insensitive pattern matching. Results are converted to a list.

            // Search for categories containing the search 
            var categories = _db.Categories
                .Where(category => EF.Functions.Like(category.CategoryName, $"%{searchTerm}%"))
                .ToList();

            // Search for posts with titles containing the search term 
            var posts = _db.Posts
                .Where(post => EF.Functions.Like(post.PostTitle, $"%{searchTerm}%"))
                .ToList();

            // Search for comments with descriptions containing the search 
            var comments = _db.Comments
                .Where(comment => EF.Functions.Like(comment.CommentDescription, $"%{searchTerm}%"))
                .ToList();

            // Return the search results in JSON format.
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
