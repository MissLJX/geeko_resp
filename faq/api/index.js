import axios from './apiconfigs'
const VPATH = '/v9'
export const list = (skip, limit) => axios.get(`/ticket/${skip}/${limit}/show`)
export const get = (id) => axios.get(`/ticket/${id}/get`)
export const getByOrderId = (orderId) => axios.get(`/ticket/${orderId}/order/get`)
export const sendImage = (ticket) => axios.cpost('/ticket/order/add', ticket)
export const sendTicket = (ticket) => axios.post('/ticket/order/add', ticket)
export const getOrders = (suffix, skip, limit) => axios.get(`${VPATH}/msite/order/${skip}/${limit}/${suffix}`)
