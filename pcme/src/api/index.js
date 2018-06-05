import axios from './apiconfigs'

const VPATH = '/v7'
export const get = () =>  axios.get(VPATH + '/customer/get')
