

import { CONSTANT } from '../helpers/constant';
import axios from 'axios';
import { jsonToQueryString } from '../helpers/index';
import UserAgent from 'react-native-user-agent';

export async function fetchApi(params, options) {
    const header = {
        'Access-Control-Allow-Origin': '*',
        'User-Agent': UserAgent.getUserAgent(),
    };
    const url = 'api.php';
    let config = {
        headers: header,
        ...options
    };

    return axios.get(CONSTANT.KEY_API_URL + url + "?" + jsonToQueryString(params), config);
}

export async function postApi(method, params) {
    const url = 'api.php';

    const formData = new FormData();

    Object.keys(params).map(function (key) {
        formData.append(key, params[key]);
    })

    return axios({
        url: CONSTANT.KEY_API_URL + url + "?" + jsonToQueryString(method),
        method: 'POST',
        data: formData,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM=',
            'User-Agent': UserAgent.getUserAgent(),
        }
    });
}


export async function fetchCheckAccount(method) {
    const url = 'checkacc.php';

    const formData = new FormData();

    // Object.keys(params).map(function (key) {
    //     formData.append(key, params[key]);
    // })

    return axios({
        url: CONSTANT.KEY_API_URL + url + "?" + jsonToQueryString(method),
        method: 'POST',
        // data: formData,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM=',
            'User-Agent': UserAgent.getUserAgent(),
        }
    });
}