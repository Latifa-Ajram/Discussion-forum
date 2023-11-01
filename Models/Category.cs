using System.ComponentModel.DataAnnotations;

namespace ForumAngularVersion.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
       // public virtual List<Room>? Rooms { get; set; } 
    }
}
