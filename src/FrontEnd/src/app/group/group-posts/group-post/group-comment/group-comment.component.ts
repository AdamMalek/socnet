import {Component, OnInit, Input} from '@angular/core';
import {IPostComment} from "../../models/group-comment.model";

@Component({
    selector: 'socnet-group-comment',
    templateUrl: './group-comment.component.html',
    styleUrls: ['./group-comment.component.css']
})
export class GroupCommentComponent implements OnInit {

    constructor() {
    }

    @Input() comment: IPostComment;

    ngOnInit() {
    }

    upvoteComment(){

    }

    downvoteComment(){

    }
}
