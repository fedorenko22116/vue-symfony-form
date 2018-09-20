import axios from "axios";

export default function(action, method, data, isSecure) {
    return 'GET' === method
        ? axios.get(action, { params: data })
        : axios.request({
                url: action,
                method: method,
                data: data
            });
}
