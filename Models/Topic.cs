using Microsoft.Extensions.Hosting;
using System.Text.Json.Serialization;

namespace ForumAngularVersion.Models
{
    public class Topic
    {
        [JsonPropertyName("TopicId")]
        public int TopicId { get; set; }

        [JsonPropertyName("TopicName")]
        public string TopicName { get; set; } = string.Empty;

        public virtual Room? Room { get; set; } // Virtual enables lazy loading. 

       // public virtual List<Post>? Posts { get; set; }
    }
}
