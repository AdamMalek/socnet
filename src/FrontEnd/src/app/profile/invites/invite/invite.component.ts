import {Component, OnInit, Input} from '@angular/core';
import {InviteService} from "../../../shared/services/invite.service";
import {Invite} from "../../../shared/models/invite";

@Component({
    selector: 'socnet-invite',
    templateUrl: './invite.component.html',
    styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

    constructor(private inviteService:InviteService) {
    }

    @Input() invite: Invite;

    ngOnInit() {
    }

    acceptInvite(id: string) {
        this.inviteService.acceptInvite(this.invite.profile.profileId,this.invite.inviteId).subscribe(res=>{
            console.log(res);
        });
    }

    declineInvite(id: string) {
        this.inviteService.declineInvite(this.invite.profile.profileId,this.invite.inviteId).subscribe(res=>{
            console.log(res);
        });
    }

}
