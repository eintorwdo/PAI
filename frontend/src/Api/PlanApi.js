import {createFetchObject,fetchObject,getLink} from "./ApiConfig";

async function getPlans() {
    let url = getLink('api/plans')
    return await fetch(url,fetchObject)
}
export {getPlans}