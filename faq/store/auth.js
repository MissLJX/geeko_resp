import {login, facelogin} from '../api'
import axios from '../api/apiconfigs'

{
  const info = window.localStorage.getItem('__auth_info')
  if (info) {
    axios.defaults.headers.common['accessToken'] = info.accessToken
  }
}

const setAuthInfo = (info) => {
  window.localStorage.setItem('__auth_info', info)
}

const getAuthInfo = () => {
  window.localStorage.getItem('__auth_info')
}

export default {
  isAuthenticated: getAuthInfo(),
  login ({email, password}) {
  	return login(email, password).then((result) => {
  		setAuthInfo(result)
  		axios.defaults.headers.common['accessToken'] = result.accessToken
  		return this.authInfo = result
  	})
  },
  doFaceBookLogin (response) {
  	if (response.status == 'connected') {
  		const {userID, accessToken} = response.authResponse
  		return facelogin(userID, accessToken).then((result) => {
  			setAuthInfo(result)
  			axios.defaults.headers.common['accessToken'] = result.accessToken
  			return this.authInfo = result
  		})
  	} else {
  		return Promise.reject(resp)
  	}
  }
}
