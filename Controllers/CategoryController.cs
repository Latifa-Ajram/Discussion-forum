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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoryById(int id)
    {
        var category = await _categoryRepository.GetCategoryById(id);
        if(category == null)
        {
            _logger.LogError("[CategoryController] Category not found while executing _categoryRepository.GetCategoryById(id)");
            return NotFound("Category not found");
        }
        return Ok(category);
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(Category updatedCategory)
    {
        if(updatedCategory == null)
        {
            return BadRequest("Invalid category data.");
        }
        bool returnOk = await _categoryRepository.Update(updatedCategory);
        if(returnOk)
        {
            var response = new { success = true, message = "Category " + updatedCategory.CategoryName + " updated successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Category update failed" };
            return Ok(response);
        }
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        bool returnOk = await _categoryRepository.Delete(id);
        if (!returnOk)
        {
            _logger.LogError("[CategoryController] Category deletion failed for the CategoryId {CategoryId:0000}", id);
            return BadRequest("Category deletion failed");
        }
        var response = new { success = true, message = "Category " + id.ToString() + " deletion succesfully" };
        return Ok(response);
    }
}

