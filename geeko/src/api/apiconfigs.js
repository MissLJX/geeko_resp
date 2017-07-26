/**
 * Created by shao_ on 2017/7/14.
 */
import axios from 'axios'
import * as http from './http_status'

const instance = axios.create({
    baseURL: window.ctx,
    timeout: 50000,
    headers: {
        accessToken: '9d246917-a20d-4904-94fa-ff2f26a05e65',
        wid:'bc0498e6-8e90-5947-6e75-8b370bd4d65b',
        appVersion:'3.2.0'
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


export default {
    get(url, params, headers = []){
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
    },


}


