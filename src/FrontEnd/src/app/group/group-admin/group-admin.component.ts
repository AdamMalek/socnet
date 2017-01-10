import {Component, OnInit, OnDestroy} from '@angular/core';
import {GroupAdminService} from "./service/group-admin.service";
import {IGroupMember} from "../group-members/models/group-member.model";
import {NotificationService} from "../../shared/services/notification.service";
import {EGroupRole} from "../../shared/models/egroup-role.enum";
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "../../shared/services/group.service";
import {UserDataService} from "../../shared/services/user-data.service";

@Component({
    selector: 'socnet-group-admin',
    templateUrl: './group-admin.component.html',
    styleUrls: ['./group-admin.component.css'],
    providers: [GroupAdminService]
})
export class GroupAdminComponent implements OnInit, OnDestroy {


    constructor(private route: ActivatedRoute,
                private groupAdmin: GroupAdminService,
                private notificationService: NotificationService,
                private userDataService: UserDataService,
                private groupService: GroupService) {
    }

    members: IGroupMember[] = [];
    groupId;
    groupSub;
    name;
    slug;
    description;
    userId;

    ngOnInit() {
        this.userId = this.userDataService.getClaim("profileId");
        this.groupSub = this.route.parent.params.subscribe(params => {
            this.groupId = params["groupId"];
            this.groupService.getMembers(this.groupId).subscribe(res => {
                this.members = res;
            }, error => {
                this.showError(error);
            });
            this.groupService.getGroupData(this.groupId).subscribe(data=>{
                this.name = data["groupName"];
                this.slug = data["groupSlug"];
                this.description = data["description"];
            });
        }, error => {
            this.showError(error);
        });
    }

    ngOnDestroy(): void {
        if (this.groupSub){
            this.groupSub.unsubscribe();
        }
    }

    setName(name){
        this.groupAdmin.setName(this.groupId,name).subscribe(x => {
            if (x.success) {
                this.notificationService.showSuccessInformation("Name changed!");
            }
        }, error => {
            this.showError(error);
        });
    }

    setSlug(slug){
        this.groupAdmin.setSlug(this.groupId,slug).subscribe(x => {
            if (x.success) {
                this.notificationService.showSuccessInformation("Slug changed!");
            }
        }, error => {
            this.showError(error);
        });
    }

    setDescription(desc){
        this.groupAdmin.setDescription(this.groupId,desc).subscribe(x => {
            if (x.success) {
                this.notificationService.showSuccessInformation("Description changed!");
            }
        }, error => {
            this.showError(error);
        });
    }

    removeUser(userId) {
        if (userId === this.userId){
            this.notificationService.showInformation("You cannot remove yourself");
            return;
        }
        this.groupAdmin.removeMember(this.groupId, userId).subscribe(x => {
            if (x.success) {
                this.members = this.members.filter(x => x.profile.profileId != userId);
            }
        }, error => {
            this.showError(error);
        });
    }

    makeAdmin(userId) {
        this.groupAdmin.setMemberRole(this.groupId, userId, EGroupRole.GroupAdmin).subscribe(x => {
            if (x.success) {
                this.members.filter(x => x.profile.profileId == userId)[0].admin = true;
            }
        }, error => {
            this.showError(error);
        });
    }

    removeAdmin(userId) {
        this.groupAdmin.setMemberRole(this.groupId, userId, EGroupRole.GroupMember).subscribe(x => {
            if (x.success) {
                this.members.filter(x => x.profile.profileId == userId)[0].admin = false;
            }
        }, error => {
            this.showError(error);
        });
    }

    private showError(error) {
        error = error.json();
        this.notificationService.showErrorInformation(error.message);
    }
}
