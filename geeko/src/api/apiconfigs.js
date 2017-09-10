/**
 * Created by shao_ on 2017/7/14.
 */
import axios from 'axios'
import * as http from './http_status'
import qs from 'qs'
import * as http_infos from './http_infos'
import * as utils from '../utils/geekoutils'


const instance = axios.create({
    baseURL: window.ctx,
    timeout: 50000,
    headers: {
        // accessToken: '64f5eea8-66be-4be3-88fc-84421efd144e',
        version: utils.VERSION,
        appVersion: utils.APP_VERSION,
        countryCode: utils.getCountry(),
        wid: utils.getWid()
    }
})


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
    post(url, data, headers = {}){
        return new Promise((resolve, reject) => {
            instance.post(url, data, {
                headers: {...headers}
            }).then((res) => {
                apiResult(res, resolve, reject)
            }).catch((e) => {
                console.error(e)
                reject(e)
            })
        })
    },
    cpost(url, data, headers = {}){
        return this.post(url, qs.stringify(data), {...headers, 'Content-Type': http_infos.default_post_content_type})
    }

}


