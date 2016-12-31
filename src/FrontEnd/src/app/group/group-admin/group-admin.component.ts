import {Component, OnInit} from '@angular/core';
import {GroupAdminService} from "./service/group-admin.service";

@Component({
    selector: 'socnet-group-admin',
    templateUrl: './group-admin.component.html',
    styleUrls: ['./group-admin.component.css'],
    providers: [GroupAdminService]
})
export class GroupAdminComponent implements OnInit {

    constructor(private groupAdmin:GroupAdminService) {
    }

    ngOnInit() {
    }

}
