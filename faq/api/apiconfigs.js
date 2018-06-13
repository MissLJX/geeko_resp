/**
 * Created by shao_ on 2017/7/14.
 */
import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: typeof window.ctx === 'undefined' ? '/api' : window.ctx,
  timeout: 50000,
  headers: {
    appVersion: '3.5.7',
    countryCode: 'US',
    wid: '1234567u8i9956789456',
    accessToken: '2d49593c-2d8a-46ce-b1c8-68c8cc286007'
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

export default {
  get (url, params, headers = []) {
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
  post (url, data, headers = {}) {
    return new Promise((resolve, reject) => {
      instance.post(url, qs.stringify(data), {
        headers: {...headers}
      }).then((res) => {
        apiResult(res, resolve, reject)
      }).catch((e) => {
        console.error(e)
        reject(e)
      })
    })
  },
  cpost (url, data, headers) {
    return new Promise((resolve, reject) => {
      instance.post(url,
        data,
        {
          headers: {
            ...headers,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      ).then((res) => {
        apiResult(res, resolve, reject)
      }).catch((e) => {
        console.error(e)
        reject(e)
      })
    })
  }
}
