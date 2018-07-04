import axios from './apiconfigs'

const VPATH = '/v7'
export const get = () =>  axios.get(VPATH + '/product/anon/a89c31fb-a9e9-49bc-813e-651948f1b89c/show')