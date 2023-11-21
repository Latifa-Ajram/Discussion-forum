using Microsoft.AspNetCore.Mvc;
using ForumAngularVersion.Models;
using ForumAngularVersion.DAL;

namespace ForumAngularVersion.Controllers;

//Veldig viktig at namespace sine bracets fjernes og settes en ; bak, hvis ikke fungerer ikke controller mapping.

[ApiController]
[Route("api/[controller]")]
public class TopicController : Controller
{
    private readonly ITopicRepository _topicRepository;
    private readonly ILogger<TopicController> _logger;
    private readonly IRoomRepository _roomRepository;

    public TopicController(ITopicRepository topicRepository, IRoomRepository roomRepository ,ILogger<TopicController> logger)
    {
        _topicRepository = topicRepository;
        _roomRepository = roomRepository;
        _logger = logger;
    }


    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var topics = await _topicRepository.GetAll();
        if (topics == null)
        {
            _logger.LogError("[TopicController] Item list not found while executing _topicRepository.GetAll()");
            return NotFound("Topic list not found");
        }
        return Ok(topics);
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Topic newTopic)
    {
        if (newTopic == null)
        {
            return BadRequest("Invalid topic data.");
        }
        //newItem.ItemId = GetNextItemId();
        bool returnOk = await _topicRepository.Create(newTopic);

        if (returnOk)
        {
            var response = new { success = true, message = "Topic " + newTopic.TopicName + " created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Topic creation failed" };
            return Ok(response);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTopicById(int id)
    {
        try
        {
            var topic = await _topicRepository.GetTopicById(id);

            if (topic == null)
            {
                _logger.LogError("[TopicController] Topic id not found while executing _topicRepository.GetTopicById()");
                return NotFound();
            }

            return Ok(topic);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting topic with ID {Id}", id);
            return StatusCode(500, "An error occurred.");
        }
    }

    //Method to get a list of topics based on the given room.
    [HttpGet("byRoomId/{id}")]
    public async Task<List<Topic>> GetTopicsByRoomId(int Id)
    {
        try
        {
            Room room = await _roomRepository.GetRoomById(Id);
            if (room == null)
            {
                return null;
            }
            return room.Topics; //Return the topics of the given room.
        }
        catch (Exception e)
        {
            //log an error if it can not find id and then returns null
            _logger.LogError("[TopicController]  FindAsync(id) failed when _roomRepository.GetRoomById(id) for RoomId {RoomId}, error message: {e}", Id, e.Message);
            return null;
        }
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(Topic updatedTopic)
    {
        if (updatedTopic == null)
        {
            return BadRequest("Invalid topic data.");
        }
        bool returnOk = await _topicRepository.Update(updatedTopic);
        if (returnOk)
        {
            var response = new { success = true, message = "Topic " + updatedTopic.TopicName + " updated successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Topic update failed" };
            return Ok(response);
        }
    }


    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        bool returnOk = await _topicRepository.Delete(id);
        if (!returnOk)
        {
            _logger.LogError("[TopicController] Topic deletion failed for the TopicId {TopicId:0000}", id);
            return BadRequest("Topic deletion failed");
        }
        var response = new { success = true, message = "Topic " + id.ToString() + " deletion succesfully" };
        return Ok(response);
    }

}


