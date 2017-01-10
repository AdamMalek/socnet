import {Route} from "@angular/router";
import {FriendListComponent} from "./friend-list/friend-list.component";
import {InvitesComponent} from "./invites/invites.component";
import {WatchingOwnDataGuard} from "../shared/guards/watching-own-data.guard";
import {MessageComponent} from "./message/message.component";

export const profileRoutes: Route[] = [
    {path: "friends", component: FriendListComponent},
    {path: "invites", component: InvitesComponent, canActivate: [WatchingOwnDataGuard]},
    {path: "messages", component: MessageComponent, canActivate: [WatchingOwnDataGuard]},
    {path: "**", redirectTo: "friends" }
];
