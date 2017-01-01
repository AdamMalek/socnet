import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {BaseUrl} from "../api-config";

@Injectable()
export class ApiHttpService {

    constructor(private http: Http, private tokenService: TokenService) {
    }

    post(url: string, body: any): Observable<Response> {
        console.log('post: ' + url);
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.tokenService.getAccessToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({headers: headers});
        return this.http.post(BaseUrl + url, body, options);
    }

    get(url: string): Observable<Response> {
        console.log('get: ' + url);
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.tokenService.getAccessToken(),
        });
        let options = new RequestOptions({headers: headers});
        return this.http.get(BaseUrl + url, options);
    }

    delete(url: string): Observable<Response> {
        console.log('delete: ' + url);
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.tokenService.getAccessToken(),
        });

        let options = new RequestOptions({headers: headers});
        return this.http.delete(BaseUrl + url, options);
    }

}
