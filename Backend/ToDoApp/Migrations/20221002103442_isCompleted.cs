using Microsoft.EntityFrameworkCore.Migrations;

namespace ToDoApp.Migrations
{
    public partial class isCompleted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "Todos",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "ID", "IsCompleted", "Title" },
                values: new object[] { 3, true, "Third task" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "Todos");
        }
    }
}
