using System.Text.Json.Serialization;

namespace ForumAngularVersion.Models
{
    public class Category
    {
        [JsonPropertyName("CategoryId")]
        public int CategoryId { get; set; }

        [JsonPropertyName("CategoryName")]
        public string CategoryName { get; set; } = string.Empty;

       public virtual List<Room>? Rooms { get; set; } 
    }
}
