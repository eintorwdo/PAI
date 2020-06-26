import {createFetchObject,fetchObject,getLink} from "./ApiConfig";

async function getPlans() {
    let url = getLink('api/plans')
    return await fetch(url,fetchObject)
}
async function createPlan(obj){
    let url = getLink('api/plan')
    return await fetch(url,createFetchObject(obj))
}
export {getPlans,createPlan}