import {Injectable, EventEmitter} from '@angular/core';
import {ApiHttpService} from "./api-http.service";
import {resolveAvatarPath} from "./helpers";
import {Observable} from "rxjs";
import {UserDataService} from "./user-data.service";

@Injectable()
export class InviteService {

    constructor(private apiHttpService:ApiHttpService,private userData:UserDataService) {
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

    receivedInvite(friendId){
        return this.getProfileInvites(this.userData.getClaim("profileId")).map(x=> x.json()).subscribe(res=>{
            return res.filter(x=> x.friend.profileId == friendId).length > 0;
        });
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
