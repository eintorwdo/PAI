import {createFetchObject,fetchObject} from "./ApiConfig";

async function register(obj) {
    let url = "http://localhost:9000/auth/register"
    return await fetch(url,createFetchObject(obj))
}
async function login(obj){
    let url = "http://localhost:9000/auth/login"
    return  fetch(url,createFetchObject(obj))
}
async function logout() {
    let url = "http://localhost:9000/auth/logout"
    return fetch(url,fetchObject)
}

export {register,login,logout}