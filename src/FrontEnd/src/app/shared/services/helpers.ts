import {BaseUrl} from "../api-config";
export function resolveAvatarPath(path: string) {
    if (path == null) {
        return "assets/images/default-avatar.jpg";
    }
    return BaseUrl + "/" + path;
}
