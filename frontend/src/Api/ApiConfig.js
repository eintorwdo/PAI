const fetchObject = {
    mode: "cors",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
    method: "GET"
}
function createFetchObject(obj) {
    return {
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
        method: "POST",
        body: JSON.stringify(obj)
    }
}
export {fetchObject,createFetchObject}