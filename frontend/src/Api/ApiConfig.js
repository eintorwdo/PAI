const fetchObject = {
    mode: "cors",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
    credentials:"include",
    method: "GET"
}
function getLink(string){
    return `http://localhost:9000/${string}`
}
function createFetchObject(obj) {
    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials:"include",
        method: "POST",
        body: JSON.stringify(obj)
    }
}
function createFetchObjectPut(obj){
    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials:"include",
        method: "PUT",
        body: JSON.stringify(obj)
    }
}
export {fetchObject,createFetchObject,getLink,createFetchObjectPut  }