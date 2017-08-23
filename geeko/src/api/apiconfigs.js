/**
 * Created by shao_ on 2017/7/14.
 */
import axios from 'axios'
import * as http from './http_status'

const instance = axios.create({
    baseURL: window.ctx,
    timeout: 50000,
    headers: {
        accessToken: 'c3802d2c-40b1-4f97-a8bb-8d88d134e620',
        wid:'34ca61f6-6de1-89c6-0c26-2a75805978ae',
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


