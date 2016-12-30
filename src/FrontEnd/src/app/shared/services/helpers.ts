import {BaseUrl} from "../api-config";
export function resolveAvatarPath(path: string) {
    if (path == null) {
        return "http://test.dev/avatar/testaccountXD/larger/15f544106f8a4f7389f9e46ff312794c.jpeg";
    }
    return BaseUrl + "/" + path;
}
