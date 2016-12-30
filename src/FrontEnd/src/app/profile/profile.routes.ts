import {Route} from "@angular/router";
import {FriendListComponent} from "./friend-list/friend-list.component";
import {InvitesComponent} from "./invites/invites.component";

export const profileRoutes: Route[] = [
    {path: "friends", component: FriendListComponent},
    {path: "invites", component: InvitesComponent, canActivate: []},
    {path: "**", redirectTo: "/"},
];
