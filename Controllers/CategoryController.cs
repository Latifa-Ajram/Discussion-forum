using Microsoft.AspNetCore.Mvc;
using ForumAngularVersion.Models;

namespace ForumAngularVersion.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private static List<Category> Categories = new List<Category>()
        {
            new Category
            {
                CategoryId = 1,
                CategoryName = "Fotball",
            },
            new Category
            {
                CategoryId = 2,
                CategoryName = "Politikk",
            }
        };

        [HttpGet]
        public List<Category> GetAll() {
            return Categories;
        }
    }
}
