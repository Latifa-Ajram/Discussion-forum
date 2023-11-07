using ForumAngularVersion.Models;

namespace ForumAngularVersion.DAL;

public static class DBInit
{
    public static void Seed(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();
        ForumDbContext context = serviceScope.ServiceProvider.GetRequiredService<ForumDbContext>();
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        if (!context.Categories.Any())
        {
            var categories = new List<Category>
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

            context.AddRange(categories);
            context.SaveChanges();
        }

        if (!context.Rooms.Any())
        {
            var rooms = new List<Room>
            {
                new Room { RoomName = "Fotball", CategoryId= 1 },
                new Room { RoomName = "operatingsystem", CategoryId= 2},
               

            };
            context.AddRange(rooms);
            context.SaveChanges();
        }

        if (!context.Topics.Any())
        {
            var topics = new List<Topic>
            {
                new Topic { TopicName = "Liverpool", RoomId= 1 },
                new Topic { TopicName = "Linux", RoomId= 2},
               
            };
            context.AddRange(topics);
            context.SaveChanges();
        }






    }
}


