import axios from './apiconfigs'

const VPATH = '/v9'
export const get = () =>  axios.get(VPATH + '/product/anon/0d198f26-44da-4ab0-8b2f-f167262e9c53/show')

