import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {GroupService} from "../services/group.service";

@Injectable()
export class GroupAdminGuard implements CanActivate {
    constructor(private groupService: GroupService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        let groupId = route.parent.params["groupId"];
        return this.groupService.isAdmin(groupId);
    }
}
