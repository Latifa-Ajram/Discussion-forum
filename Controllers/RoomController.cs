using ForumAngularVersion.DAL;
using ForumAngularVersion.Models;
using Microsoft.AspNetCore.Mvc;

namespace ForumAngularVersion.Controllers;

//Veldig viktig at namespace sine bracets fjernes og settes en ; bak, hvis ikke fungerer ikke controller mapping.

[ApiController]
[Route("api/[controller]")]
public class RoomController : Controller

{
    private readonly IRoomRepository _roomRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly ILogger<RoomController> _logger;


    public RoomController(IRoomRepository roomRepository, ICategoryRepository categoryRepository, ILogger<RoomController> logger)
    {
        _roomRepository = roomRepository;
        _categoryRepository = categoryRepository;
        _logger = logger;
    }
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var room = await _roomRepository.GetAll();
        if (room == null)
        {
            _logger.LogError("[RoomController] Room list not found while executing _roomRepository.GetAll()");
            return NotFound("Room list not found");
        }
        return Ok(room);
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Room newRoom)
    {
        if (newRoom== null)
        {
            return BadRequest("[Roomcontroller] Invalid room data.");
        }
        bool returnOK = await _roomRepository.Create(newRoom);
        if (returnOK)
        {
            var response = new { success = true, message = "Room " + newRoom.RoomName + " created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Room creation failed" };
            return Ok(response);
        }
    }

    //Get categoryname based on it's id
    [HttpGet("categoryName/{id}")]
    public async Task<IActionResult> GetCategoryNameById(int Id)
    {
        try
        {
            var category = await _categoryRepository.GetCategoryById(Id);
            if (category == null)
            {
                _logger.LogError($"[RoomController] Category with ID {Id} not found.");
                return NotFound("Category not found");
            }
            return Ok(new { categoryName = category.CategoryName });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[RoomController] An error occurred while getting category name with ID {Id}", Id);
            return StatusCode(500, "An error occurred.");
        }
    }

    //Get a spesific room based on a passed number (Id)
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoomById(int Id)
    {
        try
        {
            var room = await _roomRepository.GetRoomById(Id);

            if (room == null)
            {
                _logger.LogError("[RoomController] Room id not found while executing _roomRepository.GetRoomById()");
                return NotFound();
            }
            return Ok(room);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting room with ID {Id}", Id);
            return StatusCode(500, "An error occurred.");
        }
    }

    //Method to get a list of rooms based on the given category.
    [HttpGet("byCategoryId/{id}")]
    public async Task<List<Room>> GetRoomsByCategoryId(int Id)
    {
        try
        {
            Category category = await _categoryRepository.GetCategoryById(Id); //Find a category by it's id
            if (category == null)
            {
                return null;
            }
            return category.Rooms; //Return the rooms of the given category.
        }
        catch (Exception e)
        {
            //log an error if it can not find id and then returns null
            _logger.LogError("[RoomController] FindAsync(id) failed when _categoryRepository,GetCategoryById(id) for CategoryId {CategoryId}, error message: {e}", Id, e.Message);
            return null;
        }
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(Room updatedRoom)
    {
        if (updatedRoom == null)
        {
            return BadRequest("Invalid room data.");
        }
        bool returnOk = await _roomRepository.Update(updatedRoom);
        if (returnOk)
        {
            var response = new { success = true, message = "Room " + updatedRoom.RoomName + " updated successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Room update failed" };
            return Ok(response);
        }
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int Id)
    {
        bool returnOk = await _roomRepository.Delete(Id);
        if (!returnOk)
        {
            _logger.LogError("[RoomController] Room deletion failed for the RoomgoryId {CategoryId:0000}", Id);
            return BadRequest("Room deletion failed");
        }
        var response = new { success = true, message = "Room " + Id.ToString() + " deletion succesfully" };
        return Ok(response);
    }
}