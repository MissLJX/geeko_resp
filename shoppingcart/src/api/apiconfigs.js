/**
 * Created by shao_ on 2017/7/14.
 */
import axios from 'axios'
import qs from 'qs'
import Cookie from 'js-cookie'

const getCountry = () => {
	var language = navigator.language
	if (language && language.indexOf('-') >= 0) {
		var keys = language.split('-')
		if (keys.length <= 1) { return 'US' }
		return keys[1].toUpperCase()
	}
	return 'US'
}

const getUUID = () => {
	function S4 () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}

	return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

const getWid = () => {
	if(window.wid) return window.wid
	var wid = ''
	wid = Cookie.get('clientId')
	if (!wid) {
		Cookie.set('clientId', getUUID(), {expires: 365})
		wid = Cookie.get('clientId')
	}
	return wid
}

const instance = axios.create({
	baseURL: typeof window.ctx === 'undefined' ? '/api' : window.ctx,
	timeout: 50000,
	headers: {
		appVersion: '4.4.11',
		deviceType: deviceType,
		xtoken: window.secret || '',
		// countryCode: getCountry(),
		wid: getWid(),
		StemFrom: typeof (utm_source) === 'undefined' ? '' : utm_source,
		accessToken: window.accessToken || ''
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


const reRequest = () => instance.get('/context/anon/gat', {}, []).then( (res) => { 
	window.xtoken = res.data.result
	instance.defaults.headers['xtoken'] = window.xtoken
	return window.xtoken
} ).catch(() => {
	window.location.reload()
})

export default {
	get (url, params, headers = []) {
		return new Promise((resolve, reject) => {
			instance.get(url, {
				params,
				headers
			}).then((res) => {
				if(res.data.code == 310){
					reRequest().then((res) => {
						this.get(url, params, headers)
					}).catch((e) => {
						console.error(e)
						reject(e)
						
					})
				}else{
					apiResult(res, resolve, reject)
				}

				
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
				if(res.data.code == 310){
					reRequest().then((res) => {
						this.post(url, data, headers)
					}).catch((e) => {
						console.error(e)
						reject(e)
					})
				}else{
					apiResult(res, resolve, reject)
				}
			}).catch((e) => {
				console.error(e)
				reject(e)
			})
		})
	},
	body (url, data, headers = {}) {
		return new Promise((resolve, reject) => {
			instance.post(url, data, {
				headers: {...headers}
			}).then((res) => {
				if(res.data.code == 310){
					reRequest().then((res) => {
						this.body(url, data, headers)
					}).catch((e) => {
						console.error(e)
						reject(e)
					})
				}else{
					apiResult(res, resolve, reject)
				}
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
				if(res.data.code == 310){
					reRequest().then((res) => {
						this.cpost(url, data, headers)
					}).catch((e) => {
						console.error(e)
						reject(e)
					})
				}else{
					apiResult(res, resolve, reject)
				}
			}).catch((e) => {
				console.error(e)
				reject(e)
			})
		})
	}
}
