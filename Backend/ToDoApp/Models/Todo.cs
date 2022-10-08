using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Models
{
    public class Todo
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public bool IsCompleted { get; set; }
    }
}
