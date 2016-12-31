import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserDataService} from "../services/user-data.service";
import {Injectable} from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanActivate{
    constructor(private userService:UserDataService,private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (this.userService.isLoggedIn()){
            return true;
        }
        else {
            this.router.navigate(['/login']);
        }
    }
}
