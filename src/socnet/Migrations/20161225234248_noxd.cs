using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace socnet.Migrations
{
    public partial class noxd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "xd",
                table: "Members");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "xd",
                table: "Members",
                nullable: false,
                defaultValue: "");
        }
    }
}
