using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace socnet.Migrations
{
    public partial class comments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PostId1",
                table: "Content",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Content_PostId1",
                table: "Content",
                column: "PostId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Content_Content_PostId1",
                table: "Content",
                column: "PostId1",
                principalTable: "Content",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Content_Content_PostId1",
                table: "Content");

            migrationBuilder.DropIndex(
                name: "IX_Content_PostId1",
                table: "Content");

            migrationBuilder.DropColumn(
                name: "PostId1",
                table: "Content");
        }
    }
}
