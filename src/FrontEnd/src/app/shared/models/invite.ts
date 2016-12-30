import {UserData} from "./user-data";
export class Invite {
    constructor(public inviteId,public profile:UserData, public friend: UserData){}
}
