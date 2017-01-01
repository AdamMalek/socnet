import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

import {UserDataService} from "../services/user-data.service";

@Injectable()
export class WatchingOwnDataGuard implements CanActivate{
    constructor (private userService:UserDataService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        let profileId = route.parent.params["profileId"];
        let loggedId = this.userService.getClaim("userId");

        console.log({
            visitId: profileId,
            authedId: loggedId,
            canVisit: loggedId == profileId
        });

        return loggedId == profileId;
    }
}
