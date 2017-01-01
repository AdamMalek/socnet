import {IPostComment} from "./group-comment.model";
import {UserData} from "../../../shared/models/user-data";

export interface IGroupPost {
    id: number;
    profileId: number;
    rating: number;
    content:string;
    profile:UserData;
    comments: IPostComment[];
}
