using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace last_percent_server.Migrations
{
    /// <inheritdoc />
    public partial class AddFriendRequestsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "friend_requests",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    match_id = table.Column<int>(type: "int", nullable: false),
                    triggered_by_user_id = table.Column<int>(type: "int", nullable: false),
                    other_user_id = table.Column<int>(type: "int", nullable: false),
                    triggered_user_said_yes = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    other_user_said_yes = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    notified_other_about_requester = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    notified_requester_about_other = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    resolved_at = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_friend_requests", x => x.id);
                    table.ForeignKey(
                        name: "FK_friend_requests_matches_match_id",
                        column: x => x.match_id,
                        principalTable: "matches",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_friend_requests_users_other_user_id",
                        column: x => x.other_user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_friend_requests_users_triggered_by_user_id",
                        column: x => x.triggered_by_user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_friend_requests_match_id",
                table: "friend_requests",
                column: "match_id");

            migrationBuilder.CreateIndex(
                name: "IX_friend_requests_other_user_id",
                table: "friend_requests",
                column: "other_user_id");

            migrationBuilder.CreateIndex(
                name: "IX_friend_requests_triggered_by_user_id",
                table: "friend_requests",
                column: "triggered_by_user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "friend_requests");
        }
    }
}
