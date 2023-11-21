using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ForumAngularVersion.Models
{
    public class Comment
    {
        [JsonPropertyName("CommentId")]
        public int CommentId { get; set; } //PK

        [JsonPropertyName("PostId")]
        public int PostId { get; set; } //FK

        //[JsonPropertyName("UserName")]
        //  public string? UserName { get; set; } //FK

        [Required]
        [MaxLength(10000)] // Example: maximum length to 10000 characters
        [JsonPropertyName("CommentDescription")]
        public string CommentDescription { get; set; }

       // [JsonPropertyName("CommentTime")]
       // public DateTime CommentTime { get; set; } // Time of creation


       // public virtual Post? Post { get; set; } // Virtual enables lazy loading.
    }
}
