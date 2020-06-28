import {fetchObject,createFetchObject,getLink} from "./ApiConfig";

async function addSubscriptionToUser(obj) {
    let url = getLink('api/subscription')
    return await fetch(url,createFetchObject(obj))
}
async function getSubscriptionByUserID(id) {
    let url = getLink(`api/subscription/${id}`)
    return await fetch(url,fetchObject)
}

export {addSubscriptionToUser,getSubscriptionByUserID}