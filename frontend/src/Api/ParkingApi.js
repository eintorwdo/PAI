import {createFetchObject,fetchObject,getLink} from "./ApiConfig";

async function getAllParkings() {
    let url = getLink('api/parkinglots')
    return await fetch(url,fetchObject)
}

async function getParkingById(id) {
    let url = getLink(`api/parkinglot/${id}`)
    return await fetch(url,fetchObject)
}
async function createParking(obj) {
    let url = getLink('api/parkinglot')
    return await fetch(url,createFetchObject(obj))
}

export {getAllParkings,getParkingById,createParking}