import {Injectable, EventEmitter, Output} from '@angular/core';
import {ApiHttpService} from "./api-http.service";
import {URLSearchParams, Response} from "@angular/http";
import {TokenService} from "./token.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {RegisterData} from "../../user/register/register.model";
@Injectable()
export class UserDataService {
    constructor(private tokenService: TokenService, private apiHttp: ApiHttpService,private router:Router) {
    }

    isLoggedIn(): boolean {
        return this.tokenService.getAccessToken() != null;
    }

    @Output() onLogIn = new EventEmitter();
    @Output() onLogOut = new EventEmitter();

    private secondsBeforeTokenExpires: number = 5;
    private scheduledTokenRefresh;

    registerUser(data:RegisterData){
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', data.username);
        urlSearchParams.append('email', data.email);
        urlSearchParams.append('password', data.password);
        urlSearchParams.append('confirmPassword', data.password);
        urlSearchParams.append('firstName', data.firstName);
        urlSearchParams.append('lastName', data.lastName);
        urlSearchParams.append('university', data.university);

        let body = urlSearchParams.toString();
        return this.apiHttp.post('/api/register',body);
    }

    logIn(username: string, password: string) {
        this.tokenService.deleteTokenData();
        clearTimeout(this.scheduledTokenRefresh);
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        let body = urlSearchParams.toString();
        this.apiHttp.post("/token", body).catch(error => {
            error = error as Response;
            if (error.status == 400) {
                return Observable.throw("Invalid username or password");
            }
        }).subscribe(response => {
            if (response.status == 200) {
                let tokenData = response.json();
                this.tokenService.setTokens(tokenData);
                this.scheduledTokenRefresh = setTimeout(()=>{this.refreshToken()},(tokenData.expires_in - this.secondsBeforeTokenExpires) * 1000);
                let username= this.getClaim("sub");
                let profileId = this.getClaim("userId");
                this.onLogIn.emit({username: username, profileId: profileId});
                alert("Welcome, "+ username);
                this.router.navigate(['/profile', profileId]);
            }
        }, err=>{
            alert(err);
            return err;
        });
    }

    /*private loginErrorHandler(error: Response | any) {
     error = error as Response;
     if (error.status == 400) {
     this.logOut();
     return Observable.throw("Incorrect login data");
     }
     }

    private refreshErrorHandler(error: Response | any) {
        error = error as Response;
        if (error.status == 401) {
            this.logOut();
            return Observable.throw("Incorrect refresh token");
        }
    }*/

    logOut() {
        this.tokenService.deleteTokenData();
        this.onLogOut.emit();
        this.router.navigate(['/']);
    }

    refreshToken() {
        clearTimeout(this.scheduledTokenRefresh);
        let token = this.tokenService.getRefreshToken();
        if (token == null){
            return;
        }
        this.tokenService.setAccessToken(token);
        this.apiHttp.post("/refresh", null).catch(error => {
            error = error as Response;
            if (error.status == 401) {
                this.logOut();
                return Observable.throw("Incorrect refresh token");
            }
        }).subscribe(response => {
            if (response.status == 200) {
                let tokenData = response.json();
                this.tokenService.setAccessToken(tokenData.access_token);
                this.scheduledTokenRefresh = setTimeout(()=>{this.refreshToken()},(tokenData.expires_in - this.secondsBeforeTokenExpires) * 1000);
            }
        });
    }

    getClaim(claim: string) {
        return this.tokenService.getClaim(claim);
    }
}
