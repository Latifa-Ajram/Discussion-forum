using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace ForumAngularVersion.Models
{
    public class Category
    {
        [JsonPropertyName("CategoryId")]
        public int CategoryId { get; set; }

        [JsonPropertyName("CategoryName")]
        [RegularExpression(@"^[a-zA-ZæøåÆØÅ,. \-]{2,35}$")]
        public string CategoryName { get; set; } = string.Empty;

        [JsonPropertyName("rooms")]
        public virtual List<Room>? Rooms { get; set; } 
    }
}
