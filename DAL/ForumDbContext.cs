﻿using Microsoft.EntityFrameworkCore;
using ForumAngularVersion.Models;
using Microsoft.Extensions.Hosting;

namespace ForumAngularVersion.DAL;

public class ForumDbContext : DbContext
{
    public ForumDbContext(DbContextOptions<ForumDbContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }
    public DbSet<Room> Rooms { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseLazyLoadingProxies();
    }
}
