using Microsoft.AspNetCore.Mvc;
using ForumAngularVersion.Models;
using ForumAngularVersion.DAL;

namespace ForumAngularVersion.Controllers;

//Veldig viktig at namespace sine bracets fjernes og settes en ; bak, hvis ikke fungerer ikke controller mapping.

[ApiController]
[Route("api/[controller]")]
public class CategoryController : Controller
{
        
    private readonly ICategoryRepository _categoryRepository;
    private readonly ILogger<CategoryController> _logger;

    public CategoryController(ICategoryRepository categoryRepository, ILogger<CategoryController> logger)
    {
    _categoryRepository = categoryRepository;
    _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() {
        var categories = await _categoryRepository.GetAll();
        if(categories == null)
        {
            _logger.LogError("[CategoryController] Category list not found while executing _categoryRepository.GetAll()");
            return NotFound("Category list not found");
        }
        return Ok(categories);
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Category newCategory) {
       if(newCategory == null)
        {
            return BadRequest("Invalid Category data");
        }
       bool returnOK = await _categoryRepository.Create(newCategory);
        if(returnOK)
        {
            var response = new { success = true, message = "Category " + newCategory.CategoryName + " created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Category creation failed" };
            return Ok(response);
        }
    }
}

