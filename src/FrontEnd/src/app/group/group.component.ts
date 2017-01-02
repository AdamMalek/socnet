import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "../shared/services/group.service";
import {Subscription} from "rxjs";
import {EGroupStatus} from "./group-status.enum";
import {UserDataService} from "../shared/services/user-data.service";
import {NotificationService} from "../shared/services/notification.service";

@Component({
    selector: 'socnet-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit,OnDestroy {

    constructor(private route: ActivatedRoute, private groupService: GroupService,
                private userService:UserDataService, private notificationService:NotificationService) {
    }
    sub: Subscription;
    isMember = EGroupStatus.NotMember;
    isAdmin:boolean;
    groupId = -1;
    groupExists = false;
    groupName;
    groupDescription;

    ready = true;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.ready = true;
            this.groupId = params["groupId"];

            this.groupService.getGroupData(this.groupId).subscribe(data => {
                if (data == null) {
                    this.groupName = "no group";
                    this.groupDescription = "this group doesn't exist";
                    this.groupExists = false;
                }
                else {
                    this.groupName = data.groupName;
                    this.groupDescription = data.description;
                    this.groupExists = true;
                    this.groupService.isMember(this.groupId).subscribe(res => {
                        if (res) {
                            this.groupService.isAdmin(this.groupId).subscribe(res=>{
                                console.log(res);
                                this.isAdmin = res;
                            });
                            this.isMember = EGroupStatus.Member;
                        }
                        else{
                            this.isAdmin = false;
                            this.groupService.hasSentMembershipRequest(this.groupId).subscribe(res=>{
                                if (res.hasSent === true){
                                    this.isMember = EGroupStatus.RequestSent;
                                }
                                else{
                                    this.isMember = EGroupStatus.NotMember;
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    sendMembershipRequest() {
        if (this.groupId != -1) { // != -1 !!!!!!!!!!!!!!!!
            this.ready = false;
            this.groupService.sendMembershipRequest(this.groupId).subscribe(res => {
                    this.isMember = EGroupStatus.RequestSent;
                    this.ready = true;
                },
                err => {
                    this.ready = true;
                });
        }
    }

    isGroupMember(){
        return this.isMember == EGroupStatus.Member;
    }

    groupUrl(){
        return 'group/'+this.groupId+'/';
    }

    cancelRequest(){
        if (this.groupId != -1){
            this.ready = false;
            this.groupService.cancelGroupRequest(this.groupId).subscribe(res=>{
                if (res.success){
                    this.isMember = EGroupStatus.NotMember;
                    this.ready = true;
                }
            },err=>{
                this.notificationService.showErrorInformation(err.message);
                this.ready = true;
            });
        }
    }

    leaveGroup(){
        if (this.groupId != -1){
            this.ready = false;
            this.groupService.leaveGroup(this.groupId).subscribe(res=>{
                if (res.success){
                    this.isMember = EGroupStatus.NotMember;
                    this.userService.refreshToken();
                    this.ready = true;
                }
            },err=>{
                this.notificationService.showErrorInformation(err.json().message);
                this.ready = true;
            });
        }
    }

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe();
    }
}
