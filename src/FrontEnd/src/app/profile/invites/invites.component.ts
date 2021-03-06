import {Component, OnInit, OnDestroy} from '@angular/core';
import {Invite} from "../../shared/models/invite";
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../../shared/services/profile.service";
import {InviteService} from "../../shared/services/invite.service";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
    selector: 'socnet-invites',
    templateUrl: './invites.component.html',
    styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit, OnDestroy {


    constructor(private route: ActivatedRoute,private inviteService:InviteService,private notificationService: NotificationService) {
    }

    profileId;
    invites: Invite[] = [];
    sub;

    ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.profileId = +params["profileId"];
            console.log(this.profileId);
            this.inviteService.getProfileInvites(this.profileId).subscribe(invites =>{
                console.log(invites);
                if (invites != null){
                    this.invites = invites;
                }
            },err=>{
                this.notificationService.showErrorInformation("Cannot get profile invites");
            });
        });
    }

    ngOnDestroy(): void {
        if (this.sub){
            this.sub.unsubscribe();
        }
    }
}
