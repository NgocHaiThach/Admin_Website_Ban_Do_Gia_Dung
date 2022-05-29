import axios from "axios";

export default function callApi(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `http://trungdunghouseware.somee.com/api/v1${endpoint}`,
        data: body
    })
        .catch(err => {
            console.error(err)
        })
}