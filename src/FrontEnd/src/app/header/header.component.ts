import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserDataService} from "../shared/services/user-data.service";

@Component({
    selector: 'socnet-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    constructor(private userService:UserDataService) {
    }
    username = "---";
    profileId;
    loggedIn:boolean = false;
    logoutSub;
    loginSub;

    login(username, password) {
        this.userService.logIn(username,password);
    }

    logout() {
        this.userService.logOut();
    }

    ngOnInit() {
        this.loggedIn = this.userService.isLoggedIn();
        if (this.loggedIn){
            this.profileId = this.userService.getClaim("userId");
            this.username = this.userService.getClaim("sub");
        }
        this.logoutSub = this.userService.onLogOut.subscribe(()=>{
            this.loggedIn = false;
        });
        this.loginSub = this.userService.onLogIn.subscribe((data)=>{
            this.loggedIn = true;
            this.profileId = data.profileId;
            this.username = data.username;
        });
    }

    ngOnDestroy(): void {
        this.logoutSub.unsubscribe();
        this.loginSub.unsubscribe();
    }
}
