import {Injectable} from '@angular/core';
import {ApiHttpService} from "../../../shared/services/api-http.service";
import {EGroupRole} from "../../../shared/models/egroup-role.enum";

@Injectable()
export class GroupAdminService {

    constructor(private apiHttp: ApiHttpService) {
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

