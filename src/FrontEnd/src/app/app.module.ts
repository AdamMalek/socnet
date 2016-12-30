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

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ProfileComponent,
        FriendListComponent,
        FriendItemComponent,
        InvitesComponent,
        InviteComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [ProfileService, ApiHttpService,TokenService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
