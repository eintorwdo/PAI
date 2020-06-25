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
export {fetchObject,createFetchObject}