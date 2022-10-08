using Microsoft.EntityFrameworkCore.Migrations;

namespace ToDoApp.Migrations
{
    public partial class SeedingTodoData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "ID", "Title" },
                values: new object[] { 1, "First task" });

            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "ID", "Title" },
                values: new object[] { 2, "Second task" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "ID",
                keyValue: 2);
        }
    }
}
