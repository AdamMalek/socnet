import {Component, OnInit, Input} from '@angular/core';
import {UserData} from "../../shared/models/user-data";
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../../shared/services/profile.service";


@Component({
    selector: 'socnet-friend-list',
    templateUrl: './friend-list.component.html',
    styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

    constructor(private profileService: ProfileService, private  route: ActivatedRoute) {
    }

    profileId: number;
    friends: UserData[];

    ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.profileId = +params["profileId"];

            this.profileService.getProfileFriends(this.profileId).subscribe(friends => {
                if (friends != null) {
                    this.friends = friends;
                }
                else {
                    this.friends = [];
                }
            });
        });
    }

}
