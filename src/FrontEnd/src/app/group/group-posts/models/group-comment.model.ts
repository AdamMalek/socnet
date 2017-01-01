import {UserData} from "../../../shared/models/user-data";
export interface IPostComment{
    id: number;
    profileId: number;
    profile:UserData;
    groupId: number;
    postId:number;
    rating: number;
    content:string;
}
