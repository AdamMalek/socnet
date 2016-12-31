import {Route} from "@angular/router";
import {GroupMembersComponent} from "./group-members/group-members.component";
import {GroupMemberGuard} from "../shared/guards/group-member.guard";
import {GroupAdminGuard} from "../shared/guards/group-admin.guard";
import {GroupAdminComponent} from "./group-admin/group-admin.component";
export const groupRoutes:Route[]=[
    { path: 'members', component: GroupMembersComponent, canActivate: [GroupMemberGuard]},
    { path: 'admin', component: GroupAdminComponent, canActivate: [GroupMemberGuard,GroupAdminGuard]}
];
