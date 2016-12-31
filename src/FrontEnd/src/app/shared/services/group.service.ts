import {Injectable} from '@angular/core';
import {ApiHttpService} from "./api-http.service";
import {UserDataService} from "./user-data.service";
import {Observable} from "rxjs";

@Injectable()
export class GroupService {

    constructor(private userDataService: UserDataService, private apiHttp: ApiHttpService) {
    }

    getMembers(groupId: number, count: number, skip: number) {
        if (this.isMember(groupId)) {

        }
        else {
            return [];
        }
    }

    hasSentMembershipRequest(groupId) {
        return this.apiHttp.get('/api/group/' + groupId + '/request/' + this.userDataService.getClaim("userId")).map(x => x.json());
    }

    getGroupData(groupId) {
        return this.apiHttp.get('/api/group/' + groupId).map(x => x.json());
    }

    leaveGroup(groupId){
        return this.apiHttp.delete('/api/group/' + groupId + '/members/'+ this.userDataService.getClaim("userId")).map(x=> x.json());
    }

    isMember(groupId): Observable<boolean> {
        return this.apiHttp.get('/api/group/' + groupId + '/id/').map(x => {
            let res = x.json();
            if (res == null) return false;
            let userGroups = this.userDataService.getClaim('member');
            if (userGroups == null) return false;
            return [].concat(userGroups).indexOf(res) >= 0;
        });
    }

    sendMembershipRequest(groupId) {
        return this.apiHttp.post('/api/group/' + groupId + '/request', null);
    }

    getPosts(groupId) {
        return this.apiHttp.get('/api/group/' + groupId + '/posts').map(x => x.json());
    }

    isAdmin(groupId: number): Observable<boolean> {
        return this.apiHttp.get('/api/group/' + groupId + '/id/').map(x => {
            let res = x.json();
            if (res == null) return false;
            let userGroups = this.userDataService.getClaim('admin');
            console.log("admin");
            console.log([].concat(userGroups).indexOf(res));
            if (userGroups == null) return false;
            return [].concat(userGroups).indexOf(res) >= 0;
        });
    }
}
