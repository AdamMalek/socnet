import {Component, OnInit, OnDestroy} from '@angular/core';
import {IMembershipRequest} from "./models/membership-request.model";
import {ActivatedRoute} from "@angular/router";
import {GroupAdminService} from "../group-admin/service/group-admin.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'socnet-group-requests',
    templateUrl: './group-requests.component.html',
    styleUrls: ['./group-requests.component.css'],
    providers: [GroupAdminService]
})
export class GroupRequestsComponent implements OnInit,OnDestroy {
    constructor(private route: ActivatedRoute, private groupAdminService: GroupAdminService) {
    }

    requests: IMembershipRequest[] = [];
    loading = true;
    groupId;
    groupIdSub: Subscription;

    ngOnInit() {
        this.groupIdSub = this.route.parent.params.subscribe(params=>{
            this.groupId = params["groupId"];
            this.loading = true;
            this.groupAdminService.getMembershipRequests(this.groupId).subscribe(res=>{
                this.requests = res;
                this.loading = false;
            },err=>{
                console.log(err);
            });
        });
    }

    accept(requestId){
        this.groupAdminService.acceptRequest(this.groupId,requestId).subscribe(res=>{
            console.log(res);
            if (res.success == true){
                this.requests = this.requests.filter(x=> x.requestId != requestId);
            }
            else{
                console.log("success, but no: " + res.status);
            }
        },err=>{
            console.log("cannot accept request");
            console.log(err);
        });
    }

    decline(requestId){
        this.groupAdminService.acceptRequest(this.groupId,requestId).subscribe(res=>{
            console.log(res);
            if (res.success == true){
                this.requests = this.requests.filter(x=> x.requestId != requestId);
            }
            else{
                console.log("success, but no: " + res.status);
            }
        },err=>{
            console.log("cannot decline request");
            console.log(err);
        });
    }


    ngOnDestroy(): void {
        if (this.groupIdSub != null){
            this.groupIdSub.unsubscribe();
        }
    }
}
