import {Route} from "@angular/router";
import {GroupMembersComponent} from "./group-members/group-members.component";
import {GroupMemberGuard} from "../shared/guards/group-member.guard";
import {GroupAdminGuard} from "../shared/guards/group-admin.guard";
import {GroupAdminComponent} from "./group-admin/group-admin.component";
import {GroupPostsComponent} from "./group-posts/group-posts.component";
import {GroupRequestsComponent} from "./group-requests/group-requests.component";
export const groupRoutes:Route[]=[
    { path: 'posts', component: GroupPostsComponent},
    { path: 'members', component: GroupMembersComponent},
    { path: 'requests', component: GroupRequestsComponent, canActivate: [GroupAdminGuard]},
    { path: 'settings', component: GroupAdminComponent, canActivate: [GroupAdminGuard]},
    { path: '**', redirectTo: 'posts'}
];
