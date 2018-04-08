import axios from 'axios'
import Cookie from 'js-cookie'



const CODE_OK = '200'
const ACCESS_ERROR_300 = '300'
const ACCESS_ERROR_600 = '600'

const VERSION = 'v7'
const APP_VERSION = '3.5.7'
const VPATH = '/v7'
const BASEPATH = '/api'



const getCountry = () => {
  var language = navigator.language;
  if (language && language.indexOf("-") >= 0) {
    var keys = language.split("-");
    if (keys.length <= 1)
      return "US";
    return keys[1].toUpperCase();
  }
  return "US";
}


const getUUID = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


const getWid = () => {
  let wid = '';
  wid = Cookie.get('clientId');
  if (!wid) {
    Cookie.set('clientId', getUUID(), {expires: 365});
    wid = Cookie.get('clientId');
  }
  return wid;
}


const instance = axios.create({
  baseURL: window.ctx || BASEPATH,
  timeout: 50000,
  headers: {
    version: VERSION,
    appVersion: APP_VERSION,
    countryCode: getCountry(),
    wid: getWid()
  }
});

const _api_result = function (res, resolve, reject) {
  var data = res.data
  if (data.code == CODE_OK) {
    resolve(data.result)
  } else if (data.code == ACCESS_ERROR_300 || data.code == ACCESS_ERROR_600) {

  } else {
    reject(data.result)
  }
}

export default {
  get(url, params, headers){
    return new Promise((resolve, reject) => {
      instance.get(url, {
        params: params,
        headers: {
          ...headers
        }
      }).then((res) => {
        _api_result(res, resolve, reject)
      }).catch(e => console.error(e))
    })
  },
  post(url, data, headers){
    return new Promise((resolve, reject) => {
      instance.post(url,
        JSON.stringify(data),
        {
          headers: {
            ...headers,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      ).then((res) => {
        _api_result(res, resolve, reject)
      }).catch(e => console.error(e))
    })
  },
  form(url, data, headers){
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
        _api_result(res, resolve, reject)
      }).catch(e => console.error(e))
    })
  }
}
