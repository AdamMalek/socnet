import {Component, Input, OnInit} from '@angular/core';
import {UserData} from "../../../shared/models/user-data";

@Component({
    selector: 'socnet-friend-item',
    templateUrl: './friend-item.component.html',
    styleUrls: ['./friend-item.component.css']
})
export class FriendItemComponent implements OnInit{
    @Input() friend:UserData;
    fullName:string;
    constructor() {
    }

    ngOnInit(): void {
        this.fullName = this.friend.firstName + " " + this.friend.lastName;
    }
}
