/**
 * Created by shao_ on 2017/7/14.
 */
const axios = require('axios')
const http = require('./http_status')

const instance = axios.create({
    baseURL: 'http://www.chicme.com',
    timeout: 50000,
    headers: {
        accessToken: 'ed38610b-59e8-447a-a036-17a1b662fad5',
        wid: '34ca61f6-6de1-89c6-0c26-2a75805978ae',
        appVersion: '3.2.0'
    }
});


const apiResult = function (res, resolve, reject) {
    var data = res.data
    if (data.code == http.HTTP_200) {
        resolve(data)
    } else {
        reject(data)
    }
}


exports.get = function (url, params, headers = []) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params,
            headers
        }).then((res) => {
            apiResult(res, resolve, reject)
        }).catch((e) => {
            console.error(e)
            reject(e)
        })
    })
}





