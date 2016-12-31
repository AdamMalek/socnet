import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "../shared/services/group.service";
import {Subscription, Subscriber} from "rxjs";
import {EGroupStatus} from "./group-status.enum";

@Component({
    selector: 'socnet-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit,OnDestroy {

    constructor(private route: ActivatedRoute, private groupService: GroupService) {
    }
    sub: Subscription;
    postSub: Subscription;
    isMember = EGroupStatus.NotMember;
    isAdmin:boolean;
    groupId = -1;
    groupExists = false;
    groupName;
    groupDescription;
    posts;

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
                                this.isAdmin = res;
                            });
                            this.isMember = EGroupStatus.Member;
                            this.postSub = this.groupService.getPosts(this.groupId).subscribe(posts => {
                                console.log(posts);
                                this.posts = posts;
                            });
                        }
                        else{
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
                    console.log("success");
                    console.log(res.json());
                    this.isMember = EGroupStatus.RequestSent;
                    this.ready = true;
                },
                err => {
                    console.log("error");
                    console.log(err.json());
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

    leaveGroup(){
        if (this.groupId != -1){
            this.ready = false;
            this.groupService.leaveGroup(this.groupId).subscribe(res=>{
                if (res.deleted){
                    this.isMember = EGroupStatus.NotMember;
                    this.ready = true;
                }
            },err=>{
                console.log("cant leave");
                console.log(err);
                this.ready = true;
            });
        }


        this.ready = false;
        setTimeout(()=>{this.isMember=EGroupStatus.NotMember;this.ready = true;},10000);
    }

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe();
        if (this.postSub) this.postSub.unsubscribe();
    }
}
