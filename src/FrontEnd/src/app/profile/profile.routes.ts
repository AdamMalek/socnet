import {Route} from "@angular/router";
import {FriendListComponent} from "./friend-list/friend-list.component";
import {InvitesComponent} from "./invites/invites.component";
import {ProfileInfoComponent} from "./profile-info/profile-info.component";
import {WatchingOwnDataGuard} from "../shared/guards/watching-own-data.guard";

export const profileRoutes: Route[] = [
    {path: "friends", component: FriendListComponent},
    {path: "invites", component: InvitesComponent, canActivate: [WatchingOwnDataGuard], pathMatch: "full"},
    {path: "", component: ProfileInfoComponent},
    {path: ":**", redirectTo: "" }
];
