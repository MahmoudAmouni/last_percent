using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace last_percent_server.Migrations
{
    /// <inheritdoc />
    public partial class AddSuspensionToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "suspended_until",
                table: "users",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "suspended_until",
                table: "users");
        }
    }
}
