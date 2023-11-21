using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ForumAngularVersion.Models
{
    public class Post
    {
        [JsonPropertyName("PostId")]
        public int PostId { get; set; }

        [JsonPropertyName("TopicId")]
        public int TopicId { get; set; } //FK

        [Required]
        [JsonPropertyName("PostTitle")]
        public string PostTitle { get; set; }

       // [JsonPropertyName("UserName")] // Serialize as "UserName" in JSON
       // public string? UserName { get; set; } // Foreign Key

       // [JsonPropertyName("PostTime")]
       // public DateTime PostTime { get; set; }

       // public virtual Topic? Topic  { get; set; } 

      //  public virtual List<Comment>? Comments { get; set; }

        //public Comment? LatestComment => Comments?.OrderByDescending(c => c.CommentId).FirstOrDefault();
    }
}
