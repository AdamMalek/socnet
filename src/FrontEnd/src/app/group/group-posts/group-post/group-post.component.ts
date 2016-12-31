import {Component, OnInit, Input} from '@angular/core';
import {IGroupPost} from "../models/group-post.model";

@Component({
    selector: 'socnet-group-post',
    templateUrl: './group-post.component.html',
    styleUrls: ['./group-post.component.css']
})
export class GroupPostComponent implements OnInit {

    constructor() {
    }

    @Input() post:IGroupPost;

    ngOnInit() {
    }

    upvotePost(){

    }

    downvotePost(){

    }
}
