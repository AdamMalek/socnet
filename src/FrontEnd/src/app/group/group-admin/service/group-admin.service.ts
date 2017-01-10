import {Injectable} from '@angular/core';
import {ApiHttpService} from "../../../shared/services/api-http.service";
import {EGroupRole} from "../../../shared/models/egroup-role.enum";
import {Observable} from "rxjs";
import {IMembershipRequest} from "../../group-requests/models/membership-request.model";
import {IRequestResult} from "../../../shared/models/request-result.model";
import {URLSearchParams} from "@angular/http";

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

    setSlug(groupId,newSlug: string): Observable<IRequestResult> {
        // put api/group/id/
        // newslug:string
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('groupslug',newSlug);
        let body = urlSearchParams.toString();

        return this.apiHttp.put('/api/group/'+groupId,body).map(x=> x.json());
    }

    setName(groupId,name: string): Observable<IRequestResult> {
        // put api/group/id/
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('groupname',name);
        let body = urlSearchParams.toString();

        return this.apiHttp.put('/api/group/'+groupId,body).map(x=> x.json());
    }

    setDescription(groupId,desc: string): Observable<IRequestResult> {
        // put api/group/id/
        // newslug:string
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('description',desc);
        let body = urlSearchParams.toString();

        return this.apiHttp.put('/api/group/'+groupId,body).map(x=> x.json());
    }

    addMember(profileId: number) {
        // post api/group/id/members
        // profileId:int
        // role=> "user" : "admin"
    }

    removeMember(groupId,profileId: number): Observable<IRequestResult> {
        // delete api/group/id/members/profileId
        return this.apiHttp.delete('/api/group/'+groupId+'/members/'+profileId).map(x=> x.json());
    }

    setMemberRole(groupId, profileId: number,role:EGroupRole) {
        // put api/group/id/members/profileId
        // newrole:string
        let newRole = "user";
        if (role === EGroupRole.GroupAdmin) newRole = "admin";

        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('newRole',newRole);
        let body = urlSearchParams.toString();

        return this.apiHttp.put('/api/group/'+groupId+'/members/'+profileId,body).map(x=> x.json());
    }
}

