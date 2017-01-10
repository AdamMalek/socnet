import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProfileService} from "../shared/services/profile.service";
import {UserData} from "../shared/models/user-data";
import {ActivatedRoute, Router} from "@angular/router";
import {InviteService} from "../shared/services/invite.service";
import {NotificationService} from "../shared/services/notification.service";
import {UserDataService} from "../shared/services/user-data.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [InviteService]
})
export class ProfileComponent implements OnInit, OnDestroy {

    constructor(private profileService: ProfileService, private route: ActivatedRoute,
                private notificationService: NotificationService, private router: Router,
                private  userDataService: UserDataService) {
    }

    user: UserData;
    private sub: any;

    isSelf=false;
    areFriends=false;
    sentInvite=false;
    receivedInvite=false;

    ngOnInit() {
        this.user = new UserData(0, "--", "--", "--", "http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_blue_350.gif");
        this.sub = this.route.params.subscribe(params => {
                var id = +params['profileId'];
                this.isSelf = id == this.userDataService.getClaim("profileId");
                if (!this.isSelf){

                }
                this.profileService.getProfileInfo(id).subscribe(userData => {
                    if (userData == null) {
                        this.router.navigate(['/']);
                    }
                    else {
                        this.user = userData;
                    }
                },error=>{
                    this.notificationService.showErrorInformation(error);
                });

            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
