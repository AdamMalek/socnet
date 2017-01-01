import {Injectable, EventEmitter} from '@angular/core';
import {ApiHttpService} from "./api-http.service";
import {resolveAvatarPath} from "./helpers";
import {Observable} from "rxjs";

@Injectable()
export class InviteService {

    constructor(private apiHttpService:ApiHttpService) {
    }
    getProfileInvites(profileId: number) {
        let url = "/api/profile/" + profileId.toString() + "/invites";
        console.log(url);
        return this.apiHttpService.get(url).map(x => x.json()).map(x => {
            for (let invite of x) {
                invite.friend.avatarSrc = resolveAvatarPath(invite.friend.avatarSrc);
            }
            return x;
        })
    }

    acceptInvite(profileId:number, inviteId:string): Observable<boolean>{
        return this.apiHttpService.post("/api/profile/" + profileId.toString() + "/invites/" + inviteId,null)
            .map(res=> res.status == 200);
    }

    declineInvite(profileId:number,inviteId:string): Observable<boolean>{
        return this.apiHttpService.delete("/api/profile/" + profileId.toString() + "/invites/" + inviteId)
            .map(res=> res.status == 200);
    }
}
