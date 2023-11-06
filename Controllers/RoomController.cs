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
    private readonly ILogger<RoomController> _logger;


    public RoomController(IRoomRepository roomRepository, ILogger<RoomController> logger)
    {
        _roomRepository = roomRepository;
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

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Room newRoom)
    {
        if (newRoom== null)
        {
            return BadRequest("Invalid room data.");
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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoomById(int id)
    {
        try
        {
            var room = await _roomRepository.GetRoomById(id);

            if (room == null)
            {
                _logger.LogError("[RoomController] Room id not found while executing _roomRepository.GetRoomById()");
                return NotFound();
            }

            return Ok(room);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting room with ID {Id}", id);
            return StatusCode(500, "An error occurred.");
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
    public async Task<IActionResult> Delete(int id)
    {
        bool returnOk = await _roomRepository.Delete(id);
        if (!returnOk)
        {
            _logger.LogError("[RoomController] Room deletion failed for the RoomgoryId {CategoryId:0000}", id);
            return BadRequest("Room deletion failed");
        }
        var response = new { success = true, message = "Room " + id.ToString() + " deletion succesfully" };
        return Ok(response);
    }

}


