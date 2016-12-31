import {UserData} from "./user-data";
import {EGroupRole} from "./egroup-role.enum";

export class Member {
    constructor(public profile:UserData,public role:EGroupRole){}
}
