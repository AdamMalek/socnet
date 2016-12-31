import {UserData} from "../../../shared/models/user-data";
export interface IPostComment{
    Id: number;
    ProfileId: number;
    Profile:UserData;
    GroupId: number;
    PostId:number;
    Rating: number;
    Content:string;
}
