import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "../shared/services/group.service";
import {Subscription, Subscriber} from "rxjs";

@Component({
    selector: 'socnet-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit,OnDestroy {

    constructor(private route: ActivatedRoute,private groupService:GroupService) {
    }

    sub: Subscription;
    postSub: Subscription;
    isMember;
    groupId;
    posts;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.groupId = params["groupId"];
            this.isMember = this.groupService.isMember(this.groupId);
            if (this.isMember){
                this.postSub = this.groupService.getPosts(this.groupId).subscribe(posts=>{
                    console.log(posts);
                    this.posts = posts;
                });
            }
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
        this.postSub.unsubscribe();
    }
}
