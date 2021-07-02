import axios from 'axios'
import qs from 'qs'

const apiResult = function (res, resolve, reject) {
    var data = res.data
    if (data.code == 200) {
        resolve(data)
    } else {
        reject(data)
    }
}


const API = class {
    constructor(cfg) {
        this.instance = axios.create({
            baseURL: cfg.baseUrl || '/',
            timeout: 50000,
            headers: {
                ...cfg.headers
            }
        })
    }

    setHeaders(headers) {
        headers.forEach((key, value) => {
            this.instance.defaults.headers[key] = value
        })
    }

    get(url, data = {}, headers = {}) {
        return new Promise((resolve, reject) => {
            this.instance.get(url, {
                params: data,
                headers
            }).then(res => {
                apiResult(res, resolve, reject)
            }).catch(e => {
                reject(e)
            })
        })
    }

    post(url, data = {}, headers = {}) {
        return new Promise((resolve, reject) => {
            this.instance.post(url, qs.stringify(data), {
                headers
            }).then(res => {
                apiResult(res, resolve, reject)
            }).catch(e => {
                reject(e)
            })
        })
    }


    put(url, data = {}, headers = {}) {
        return new Promise((resolve, reject) => {
            this.instance.put(url, qs.stringify(data), {
                headers
            }).then(res => {
                apiResult(res, resolve, reject)
            }).catch(e => {
                reject(e)
            })
        })
    }

    delete(url, params, headers = {}) {
        return new Promise((resolve, reject) => {
            this.instance.delete(url, {
                params,
                headers
            }).then(res => {
                apiResult(res, resolve, reject)
            }).catch(e => {
                reject(e)
            })
        })
    }

    form(url, data = {}, headers = {}) {
        return new Promise((resolve, reject) => {
            this.instance.post(url, data, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                apiResult(res, resolve, reject)
            }).catch(e => {
                reject(e)
            })
        })
    }

    body(url, data = {}, headers = {}) {
        return new Promise((resolve, reject) => {
            this.instance.post(url, data, {
                headers
            }).then(res => {
                apiResult(res, resolve, reject)
            }).catch(e => {
                reject(e)
            })
        })
    }


    pbody(url, data = {}, headers = {}) {
        return new Promise((resolve, reject) => {
            this.instance.put(url, data, {
                headers
            }).then(res => {
                apiResult(res, resolve, reject)
            }).catch(e => {
                reject(e)
            })
        })
    }


    exportExcel(url, data={}) {
       return this.instance.post(
            url,data,
            {
                // headers: {
                //     'Content-Disposition': "attachment; filename=template.xlsx",
                //     'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                // },
                responseType: 'arraybuffer'
            }
        ).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'template.xlsx')
            document.body.appendChild(link)
            link.click()
            return 'success'
        })
    }
}

export default API