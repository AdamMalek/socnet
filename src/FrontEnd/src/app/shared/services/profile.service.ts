import {Injectable} from '@angular/core';
import {UserData} from "../models/user-data";
import {ApiHttpService} from "./api-http.service";
import {BaseUrl} from "../api-config";
import "rxjs/Rx";
import {Observable} from "rxjs";
import {resolveAvatarPath} from "./helpers";

@Injectable()
export class ProfileService {

    constructor(private apiHttpService: ApiHttpService) {
    }

    getProfileInfo(id: number): Observable<UserData> {
        return this.apiHttpService.get(BaseUrl + "/api/profile/" + id.toString()).map(x => x.json()).map(x => {
            if (x != null){
                x.avatarSrc = resolveAvatarPath(x.avatarSrc);
            }
            return x;
        });
    }

    getProfileFriends(id: number) {
        return this.apiHttpService.get(BaseUrl + "/api/profile/" + id.toString() + "/friends").map(x => x.json()).map(x=> {
            for (let friend of x){
                friend.avatarSrc = resolveAvatarPath(friend.avatarSrc);
            }
            return x;
        })
    }


}
