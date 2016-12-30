import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {profileRoutes} from "./profile/profile.routes";

export const appRoutes: Routes = [
    { path: 'profile/:profileId', component: ProfileComponent, children: profileRoutes },
];
