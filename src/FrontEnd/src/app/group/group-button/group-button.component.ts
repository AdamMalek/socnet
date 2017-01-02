import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {EGroupStatus} from "../group-status.enum";

@Component({
    selector: 'socnet-group-button',
    templateUrl: './group-button.component.html',
    styleUrls: ['./group-button.component.css']
})
export class GroupButtonComponent implements OnInit {

    constructor() {
    }

    @Input() groupExists;
    @Input() isMember: EGroupStatus;
    @Input() ready;
    @Output() requestMembership = new EventEmitter();
    @Output() leaveGroup = new EventEmitter();
    @Output() cancelMembershipRequest = new EventEmitter();

    hasSentRequest(){
        return (this.isMember == EGroupStatus.RequestSent);
    }

    isGroupMember(){
        return (this.isMember == EGroupStatus.Member);
    }
    clicked2() {
        console.log("sent");
        console.log(this.isMember == EGroupStatus.RequestSent);
        console.log("member");
        console.log(this.isMember == EGroupStatus.Member);
        console.log("notmember");
        console.log(this.isMember == EGroupStatus.NotMember);
    }
    clicked() {
        if (this.ready) {
            if (this.isGroupMember()) {
                this.leaveGroup.emit();
            }
            else if (!this.isGroupMember() && !this.hasSentRequest()){
                this.requestMembership.emit();
            }
            else if (!this.isGroupMember() && this.hasSentRequest()){
                this.cancelMembershipRequest.emit();
            }
        }
    }

    ngOnInit() {
    }

}
