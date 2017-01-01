import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {GroupService} from "../services/group.service";

@Injectable()
export class GroupExistsGuard implements CanActivate{
    constructor(private groupService:GroupService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        let groupId = route.params["groupId"];
        return this.groupService.groupExist(groupId);
    }
}
