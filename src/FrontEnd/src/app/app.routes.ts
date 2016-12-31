import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {profileRoutes} from "./profile/profile.routes";
import {LoggedInGuard} from "./shared/guards/logged-in.guard";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";
import {GroupMemberGuard} from "./shared/guards/group-member.guard";
import {GroupComponent} from "./group/group.component";
import {groupRoutes} from "./group/group.routes";

export const appRoutes: Routes = [
    { path: 'profile/:profileId', component: ProfileComponent, children: profileRoutes, canActivate:[LoggedInGuard]},
    { path: 'group/:groupId', component: GroupComponent, children: groupRoutes, canActivate:[LoggedInGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', redirectTo: "/"},
];
