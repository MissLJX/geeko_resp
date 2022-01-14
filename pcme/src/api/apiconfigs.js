import axios from 'axios'
import qs from 'qs'
import {getWid} from "../../../geeko/src/utils/geekoutils";







const instance = axios.create({
    baseURL: typeof window.ctx == 'undefined' ? '/api': window.ctx,
    timeout: 50000,
    headers: {
        appVersion: '3.5.7',
        // wid: "1b328f85-99cc-41da-852e-85e9b2953138",
        wid:getWid(),
        accessToken: window.accessToken || '',
        deviceType: 'pc',
        xtoken: window.secret || ''
    }
})


const apiResult = function (res, resolve, reject) {
    var data = res.data
    if (data.code == 200) {
        resolve(data)
    } else {
        reject(data)
    }
}

const reRequest = () => instance.get('/context/anon/gat', {}, []).then((res) => {
    window.xtoken = res.data.result

    instance.defaults.headers['xtoken'] = window.xtoken

    return window.xtoken
}).catch(() => {
    window.location.reload()
})

export default {
    get(url, params, headers = []){
        return new Promise((resolve, reject) => {
            instance.get(url, {
                params,
                headers
            }).then((res) => {
                if (res.data.code === 310) {
                    reRequest().then((res) => {
                        this.get(url, params, headers)
                    }).catch((e) => {
                        console.error(e)
                        reject(e)
                    })
                } else {
                    apiResult(res, resolve, reject)
                }
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
                if (res.data.code === 310) {
                    reRequest().then((res) => {
                        this.post(url, data, headers)
                    }).catch((e) => {
                        console.error(e)
                        reject(e)
                    })
                } else {
                    apiResult(res, resolve, reject)
                }
            }).catch((e) => {
                console.error(e)
                reject(e)
            })
        })
    },
    cpost(url, data, headers = {}){
        return this.post(url, qs.stringify(data), {...headers, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'})
    },
    specialGet(url, params, headers){
        return new Promise((resolve, reject) => {
            instance.get(url, {
                params: params,
                headers: {
                    ...headers
                }
            }).then((res) => {
                if (res.data.code === 310) {
                    reRequest().then((res) => {
                        this.get(url, params, headers)
                    }).catch((e) => {
                        console.error(e)
                        reject(e)
                    })
                } else {
                    resolve(res.data);
                }
            }).catch(e => console.error(e))
        })
    }

}


