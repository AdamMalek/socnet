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

    isMember(groupId): Observable<boolean> | boolean {
        return this.apiHttp.get('/api/group/' + groupId + '/id/').map(x => {
            let res = x.json();
            if (res == null) return false;
            let userGroups = this.userDataService.getClaim('member');
            console.log("member");
            console.log([].concat(userGroups).indexOf(res));
            if (userGroups == null) return false;
            return [].concat(userGroups).indexOf(res) >= 0;
        });
    }

    getPosts(groupId){
        return this.apiHttp.get('/api/group/'+groupId+'/posts').map(x=> x.json());
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
