using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace socnet.Migrations
{
    public partial class request : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GroupRequest",
                columns: table => new
                {
                    RequestId = table.Column<string>(nullable: false),
                    GroupId = table.Column<int>(nullable: false),
                    ProfileId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupRequest", x => x.RequestId);
                    table.ForeignKey(
                        name: "FK_GroupRequest_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_GroupRequest_Profiles_ProfileId",
                        column: x => x.ProfileId,
                        principalTable: "Profiles",
                        principalColumn: "ProfileId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupRequest_GroupId",
                table: "GroupRequest",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupRequest_ProfileId",
                table: "GroupRequest",
                column: "ProfileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupRequest");
        }
    }
}
