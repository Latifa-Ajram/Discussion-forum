using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ForumAngularVersion.Models;
using ForumAngularVersion.DAL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ForumAngularVersion.Controllers
{
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

        [HttpGet("search")]
        public IActionResult Search(string searchTerm)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(searchTerm))
                {
                    // If the query is empty, return an empty list
                    return Ok(new { Categories = new List<Category>(), Posts = new List<Post>(), Comments = new List<Comment>() });
                }

                // Your existing code for searching categories, posts, and comments

                var categories = _db.Categories
                    .Where(category => category.CategoryName.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
                    .ToList();

                var posts = _db.Posts
                    .Where(post => post.PostTitle.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
                    .ToList();

                var comments = _db.Comments
                    .Where(comment => comment.CommentDescription.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
                    .ToList();

                // Return JSON data
                return Ok(new { Categories = categories, Posts = posts, Comments = comments });
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred during the search.");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
