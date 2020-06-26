import {fetchObject,createFetchObject,getLink,createFetchObjectPut,fetchObjectDelete} from "./ApiConfig";

async function getUsers() {
    let url = getLink("api/users")
    return await fetch(url,fetchObject)
}
async function getUserById(id){
    let url= getLink(`api/user/${id}`)
    return await fetch(url,fetchObject)
}
async function editUser(id,obj){
    let url = getLink(`api/user/${id}`)
    return await fetch(url,createFetchObjectPut(obj))
}
async function deleteUser(id) {
    let url = getLink(`api/user/${id}`)
    return await fetch(url,fetchObjectDelete)
}

export {getUsers,getUserById,editUser,deleteUser}