using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace socnet.Migrations
{
    public partial class groupdescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Groups",
                nullable: false,
                defaultValue: "This is default description, You can change it later in options");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Groups");
        }
    }
}
