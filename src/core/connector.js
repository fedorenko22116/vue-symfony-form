import axios from "axios";

export default function(action, method, data, isSecure) {
    return axios.request({
        url: action,
        method: method,
        data: data
    });
}
