import {createFetchObject} from "./ApiConfig";

async function register(obj) {
    let url = "localhost:9000/auth/register"
    return await fetch(url,createFetchObject(obj)).then(dane=>dane.json())
}

export {register}