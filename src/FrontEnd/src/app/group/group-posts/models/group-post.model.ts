import {IPostComment} from "./group-comment.model";
import {UserData} from "../../../shared/models/user-data";

export interface IGroupPost {
    Id: number;
    ProfileId: number;
    Rating: number;
    Content:string;
    Profile:UserData;
    Comments: IPostComment[];
}
