using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Models;

namespace ToDoApp
{
    public class AppDbContext:DbContext
    {
        public AppDbContext()
        {

        }
        public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>().HasData(
                new Todo
                {
                    ID=1,
                    Title="First task"
                }, new Todo
                {
                    ID = 2,
                    Title = "Second task",
                }, new Todo
                {
                    ID = 3,
                    Title = "Third task",
                    IsCompleted=true,
                }
            );
        }
        public virtual DbSet<Todo> Todos { get; set; }


    }
}
