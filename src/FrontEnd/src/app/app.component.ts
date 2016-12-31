import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserDataService} from "./shared/services/user-data.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private userService: UserDataService) {
    }

    ngOnInit(): void {
        this.userService.refreshToken();
    }

    ngOnDestroy(): void {
    }

    login(username: string, password: string) {
        this.userService.logIn(username, password);
    }

    test() {
        let claim = this.userService.getClaim("member");
        console.log(claim);
    }

    refresh() {
        this.userService.refreshToken();
    }
}
