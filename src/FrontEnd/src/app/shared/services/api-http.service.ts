import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";

@Injectable()
export class ApiHttpService {

    constructor(private http: Http, private tokenService: TokenService) {
    }

    post(url: string, body: any): Observable<Response> {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.tokenService.getToken(),
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this.http.post(url, body, options);
    }

    get(url: string): Observable<Response> {

        let headers = new Headers({
            'Authorization': 'Bearer ' + this.tokenService.getToken(),
        });
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options);
    }

    delete(url: string): Observable<Response> {

        let headers = new Headers({
            'Authorization': 'Bearer ' + this.tokenService.getToken(),
        });
        let options = new RequestOptions({headers: headers});
        return this.http.delete(url, options);
    }

}
