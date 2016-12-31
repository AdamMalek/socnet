import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from "@angular/router";

import { appRoutes } from './app.routes';
import { ProfileComponent } from './profile/profile.component';
import {ProfileService} from "./shared/services/profile.service";
import {ApiHttpService} from "./shared/services/api-http.service";
import {TokenService} from "./shared/services/token.service";
import { FriendListComponent } from './profile/friend-list/friend-list.component';
import { FriendItemComponent } from './profile/friend-list/friend-item/friend-item.component';
import { InvitesComponent } from './profile/invites/invites.component';
import { InviteComponent } from './profile/invites/invite/invite.component';
import {UserDataService} from "./shared/services/user-data.service";
import {LoggedInGuard} from "./shared/guards/logged-in.guard";
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import {GroupMemberGuard} from "./shared/guards/group-member.guard";
import {GroupService} from "./shared/services/group.service";
import { GroupComponent } from './group/group.component';
import { GroupMembersComponent } from './group/group-members/group-members.component';
import { GroupAdminComponent } from './group/group-admin/group-admin.component';
import {GroupAdminGuard} from "./shared/guards/group-admin.guard";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ProfileComponent,
        FriendListComponent,
        FriendItemComponent,
        InvitesComponent,
        InviteComponent,
        LoginComponent,
        RegisterComponent,
        GroupComponent,
        GroupMembersComponent,
        GroupAdminComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [ProfileService, ApiHttpService,TokenService,
                UserDataService, LoggedInGuard, GroupMemberGuard, GroupAdminGuard ,GroupService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
