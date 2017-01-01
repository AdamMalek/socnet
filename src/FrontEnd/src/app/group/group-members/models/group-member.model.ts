import {UserData} from "../../../shared/models/user-data";

export interface IGroupMember{
    memberId: number;
    groupId;
    profile: UserData;
    admin: boolean;
}
