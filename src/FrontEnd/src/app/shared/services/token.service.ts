import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {

    constructor() {
    }

    getAccessToken() {
        return localStorage.getItem("access_token");
    }

    setAccessToken(access_token) {
        if (access_token){
            localStorage.setItem("access_token", access_token);
            let claims = access_token.split('.')[1];
            claims = atob(claims);
            if (claims != null) {
                localStorage.setItem("claims", claims);
            }
        }
    }

    getRefreshToken() {
        return localStorage.getItem("refresh_token");
    }

    setRefreshToken(refresh_token) {
        localStorage.setItem("refresh_token", refresh_token);
    }

    setTokens(tokens) {
        this.setAccessToken(tokens.access_token);
        this.setRefreshToken(tokens.refresh_token);

    }

    deleteTokenData() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("claims");
    }

    getClaim(claim: string) {
        return JSON.parse(localStorage.getItem("claims"))[claim];
    }
}
