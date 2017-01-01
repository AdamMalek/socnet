import {Injectable} from '@angular/core';
import {ApiHttpService} from "../../../shared/services/api-http.service";
import {EGroupRole} from "../../../shared/models/egroup-role.enum";
import {Observable} from "rxjs";
import {IMembershipRequest} from "../../group-requests/models/membership-request.model";

@Injectable()
export class GroupAdminService {

    constructor(private apiHttp: ApiHttpService) {
    }

    getMembershipRequests(groupId): Observable<IMembershipRequest[]>{
        return this.apiHttp.get('/api/group/'+groupId+'/request').map(x=>x.json());
    }

    acceptRequest(groupId,requestId){
        return this.apiHttp.post('/api/group/'+groupId+'/request/'+ requestId +'/accept',null).map(x=>x.json());
    }

    declineRequest(groupId,requestId): Observable<boolean>{
        return this.apiHttp.post('/api/group/'+groupId+'/request/'+ requestId +'/decline',null).map(x=>x.json());
    }

    setSlug(newSlug: string) {
        // put api/group/id/
        // newslug:string
    }

    addMember(profileId: number) {
        // post api/group/id/members
        // profileId:int
        // role=> "user" : "admin"
    }

    removeMember(profileId: number) {
        // delete api/group/id/members/profileId
    }

    setMemberRole(profileId: number,role:EGroupRole) {
        // put api/group/id/members/profileId
        // newrole:string
    }
}

