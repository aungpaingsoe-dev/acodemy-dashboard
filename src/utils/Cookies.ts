import { getCookie, setCookie } from "typescript-cookie";

export const set = (name : string, value : any) => {
    setCookie(name, value);
}

export const get = (name : string) => {
    return getCookie(name);
}
