import {Injectable} from '@angular/core';
import {ApiHttpService} from "./api-http.service";
import {UserDataService} from "./user-data.service";
import {Observable} from "rxjs";
import {resolveAvatarPath} from "./helpers";
import {IGroupPost} from "../../group/group-posts/models/group-post.model";
import {IGroupMember} from "../../group/group-members/models/group-member.model";
import {IRequestResult} from "../models/request-result.model";

@Injectable()
export class GroupService {

    constructor(private userDataService: UserDataService, private apiHttp: ApiHttpService) {
    }

    getMembers(groupId): Observable<IGroupMember[]> {
        return this.apiHttp.get('/api/group/' + groupId + '/members').map(response => {
            if (response.status == 200) {
                return <IGroupMember[]>response.json();
            }
            else {
                return [];
            }
        }).map(x => {
            for (let member of x) {
                member.profile.avatarSrc = resolveAvatarPath(member.profile.avatarSrc);
            }
            return x;
        });
    }

    groupExist(groupId): Observable<boolean> {
        return this.apiHttp.get('/api/group/' + groupId + '/id/').map(x => x.status == 200);
    }

    hasSentMembershipRequest(groupId) {
        return this.apiHttp.get('/api/group/' + groupId + '/request/' +
            + this.userDataService.getClaim("userId")).map(x => x.json());
    }

    getGroupData(groupId) {
        return this.apiHttp.get('/api/group/' + groupId).map(x => x.json());
    }

    leaveGroup(groupId): Observable<IRequestResult> {
        return this.apiHttp.delete('/api/group/' + groupId + '/members/' + this.userDataService.getClaim("userId")).map(x => x.json());
    }

    cancelGroupRequest(groupId): Observable<IRequestResult>{
        return this.apiHttp.delete('/api/group/' + groupId + '/request/cancel').map(x => x.json());
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
        return this.apiHttp.get('/api/group/' + groupId + '/posts').map(x => x.json()).map(posts => {
            for (let post of <IGroupPost[]>posts) {
                if (post.profile) {
                    post.profile.avatarSrc = resolveAvatarPath(post.profile.avatarSrc);
                }
                if (post.comments) {
                    for (let comment of post.comments) {
                        if (comment.profile) {
                            comment.profile.avatarSrc = resolveAvatarPath(comment.profile.avatarSrc);
                        }
                    }
                }
            }
            return posts;
        });
    }

    isAdmin(slug): Observable<boolean> {
        let id: number = +slug;
        //if (!isNaN(id)) {
            // TODO local check from token
        //}
        //else {
            return this.apiHttp.get('/api/group/' + slug + '/id/').map(x => {
                let res = x.json();
                if (res == null) return false;
                let userGroups = this.userDataService.getClaim('admin');
                if (userGroups == null) return false;
                return [].concat(userGroups).indexOf(res) >= 0;
            });
        //}
    }
}
