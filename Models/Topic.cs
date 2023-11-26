using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ForumAngularVersion.Models
{
    public class Topic
    {
        [JsonPropertyName("TopicId")]
        public int TopicId { get; set; }

        [JsonPropertyName("TopicName")]
        [RegularExpression(@"^[a-zA-ZæøåÆØÅ,. \-]{2,35}$")]
        public string TopicName { get; set; } = string.Empty;

        [JsonPropertyName("RoomId")]
        public int RoomId { get; set; } //FK

       //public virtual Room? Room { get; set; } // Virtual enables lazy loading. 

        public virtual List<Post>? Posts { get; set; }
    }
}
