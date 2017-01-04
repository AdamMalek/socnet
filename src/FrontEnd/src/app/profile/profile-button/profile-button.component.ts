import {Component, OnInit, Input} from '@angular/core';
import {ProfileService} from "../../shared/services/profile.service";

@Component({
    selector: 'socnet-profile-button',
    templateUrl: './profile-button.component.html',
    styleUrls: ['./profile-button.component.css']
})
export class ProfileButtonComponent implements OnInit {

    constructor(private profileService:ProfileService) {
    }

    @Input() profileId:number;

    areFriends:boolean;
    pendingRequest:boolean;
    isSelf:boolean;

    ngOnInit() {
        this.isSelf = this.profileId % 2 == 0;
    }

}
