import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "../../shared/services/group.service";
import {IGroupPost} from "./models/group-post.model";

@Component({
    selector: 'socnet-group-posts',
    templateUrl: './group-posts.component.html',
    styleUrls: ['./group-posts.component.css']
})
export class GroupPostsComponent implements OnInit, OnDestroy {


    constructor(private route: ActivatedRoute, private groupService: GroupService) {
    }

    isMember;
    posts: IGroupPost[]=[];
    groupId;
    groupIdSub;
    loading = true;

    ngOnInit() {
        this.groupIdSub = this.route.parent.params.subscribe(params => {
            this.groupId = params["groupId"];

            this.groupService.isMember(this.groupId).subscribe(res => {
                if (res) {
                    this.loading = true;
                    this.isMember = true;
                    this.groupService.getPosts(this.groupId).subscribe(posts => {
                        this.posts = <IGroupPost[]>posts;
                        this.loading = false;
                    });
                }
                else {
                    this.isMember = false;
                }
            });
        });
    }

    ngOnDestroy(): void {
        if (this.groupIdSub != null){
            this.groupIdSub.unsubscribe();
        }
    }
}
