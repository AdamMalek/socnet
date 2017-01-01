import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProfileService} from "../shared/services/profile.service";
import {UserData} from "../shared/models/user-data";
import {ActivatedRoute} from "@angular/router";
import {InviteService} from "../shared/services/invite.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [InviteService]
})
export class ProfileComponent implements OnInit, OnDestroy {

    constructor(private profileService: ProfileService, private route: ActivatedRoute) {
    }

    user: UserData;
    private sub: any;

    ngOnInit() {
        this.user = new UserData(0, "--", "--", "--", "http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_blue_350.gif");
        this.sub = this.route.params.subscribe(params => {
                var id = +params['profileId'];
                this.profileService.getProfileInfo(id).subscribe(userData => {
                    if (userData == null) {}
                    else {
                        this.user = userData;
                    }
                });

            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
