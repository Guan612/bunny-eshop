import http from "@/utils/http";

export function loginAPI(user){
    return http.post("/login",user);
}