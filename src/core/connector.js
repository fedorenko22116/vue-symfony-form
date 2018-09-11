import axios from "axios";

export default function(route, method, data, isSecure) {
    return axios.request({
        url: route,
        method: method,
        data: data
    });
}
