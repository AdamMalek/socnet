import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "../../shared/services/group.service";
import {UserData} from "../../shared/models/user-data";
import {IGroupMember} from "./models/group-member.model";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
    selector: 'socnet-group-members',
    templateUrl: './group-members.component.html',
    styleUrls: ['./group-members.component.css']
})
export class GroupMembersComponent implements OnInit, OnDestroy {
    constructor(private route: ActivatedRoute, private groupService: GroupService,private notificationService: NotificationService) {
    }

    members:IGroupMember[]=[];
    admins:IGroupMember[]=[];

    groupId;
    groupIdSub;
    loading = true;

    ngOnInit() {
        this.notificationService.showInformation("XD");
        this.groupIdSub = this.route.parent.params.subscribe(params=>{
            this.groupId = params["groupId"];
            this.loading = true;
            this.groupService.getMembers(this.groupId).subscribe(res=>{
                this.members = res.filter(x=> x.admin == false);
                this.admins = res.filter(x=> x.admin == true);
                this.loading = false;
            });
        });
    }

    ngOnDestroy(): void {
        if (this.groupIdSub){
            this.groupIdSub.unsubscribe();
        }
    }
}
