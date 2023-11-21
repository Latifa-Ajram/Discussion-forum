using System.Text.Json.Serialization;

namespace ForumAngularVersion.Models
{
    public class Room { 

        [JsonPropertyName("RoomId")]
        public int RoomId { get; set; }

        [JsonPropertyName("RoomName")]
        public string RoomName { get; set; } = string.Empty;

        [JsonPropertyName("CategoryId")]
        public int CategoryId { get; set; } //FK
        // Navigaiton property: 

       // public virtual Category? Category { get; set; } // Can't be zero. Virtual enables lazy loading. 
    
        public virtual List<Topic>? Topics { get; set; } // One room can have many threads, or zero. ? means it can have zero threads.
    }
}
