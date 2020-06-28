import {fetchObject,createFetchObject,getLink} from "./ApiConfig";

async function getCarByUserId(id) {
    let url = getLink(`api/cars/${id}`)
    return await fetch(url,fetchObject)
}
async function addCarToDatabase(obj){
    let url = getLink(`api/car`)
    return await fetch(url,createFetchObject(obj))
}
async function getCars() {
    let url = getLink("api/cars")
    return await fetch(url,fetchObject)
}

export {getCarByUserId,addCarToDatabase,getCars}