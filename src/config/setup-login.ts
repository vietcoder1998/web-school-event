import Cookies from 'universal-cookie';
import { encriptTk } from './tk-en-de';
interface IOAuth2 {
    userID: string,
    tokenType: string,
    jti: string,
    target: string,
    userExists: boolean,
    accessToken: string,
    refreshToken: string,
    actkExpSecs: number,
    refreshTokenExpSecs: number
}

export default function setupLogin(oauth2?: IOAuth2) {
    let accessExpSecs = new Date(new Date().getTime() + oauth2.actkExpSecs)
    let refreshTokenExpSecs = new Date(new Date().getTime() + oauth2.refreshTokenExpSecs)
    let cookie = new Cookies();
    console.log(oauth2);
    localStorage.setItem("actk", oauth2.accessToken);
    localStorage.setItem("rftk", oauth2.refreshToken);
    cookie.set("actk", oauth2.accessToken, { expires: accessExpSecs, path: "/" });
    cookie.set("rftk", oauth2.refreshToken, { expires: refreshTokenExpSecs, path: "/" });
    localStorage.setItem("userID", oauth2.userID);
}