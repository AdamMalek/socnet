import {Injectable, EventEmitter} from '@angular/core';
import {ApiHttpService} from "./api-http.service";
import {BaseUrl} from "../api-config";
import {resolveAvatarPath} from "./helpers";
import {Observable} from "rxjs";
import {stringify} from "@angular/core/src/facade/lang";
import {Response} from "@angular/http";

@Injectable()
export class InviteService {

    constructor(private apiHttpService:ApiHttpService) {
    }
    getProfileInvites(id: number) {
        return this.apiHttpService.get(BaseUrl + "/api/profile/" + id.toString() + "/invites").map(x => x.json()).map(x => {
            for (let invite of x) {
                invite.friend.avatarSrc = resolveAvatarPath(invite.friend.avatarSrc);
            }
            return x;
        })
    }

    acceptInvite(profileId:number, inviteId:string): Observable<boolean>{
        return this.apiHttpService.post(BaseUrl + "/api/profile/" + profileId.toString() + "/invites/" + inviteId,null)
            .map(res=> res.status == 200);
    }

    declineInvite(profileId:number,inviteId:string): Observable<boolean>{
        return this.apiHttpService.delete(BaseUrl + "/api/profile/" + profileId.toString() + "/invites/" + inviteId)
            .map(res=> res.status == 200);
    }
}
