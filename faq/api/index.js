import axios from './apiconfigs'
const VPATH = '/v9'
export const list = (skip, limit) => axios.get(`/ticket/${skip}/${limit}/show?state=0`)
export const get = (id) => axios.get(`/ticket/${id}/get`)
export const getByOrderId = (orderId) => axios.get(`/ticket/${orderId}/order/get`)
export const getByCode = (code) => axios.get(`/ticket/${code}/get-by-order`)
export const sendImage = (ticket) => axios.cpost('/ticket/order/add', ticket)
export const sendTicket = (ticket) => axios.post('/ticket/order/add', ticket)
export const getOrders = (suffix, skip, limit) => axios.get(`${VPATH}/order/${skip}/${limit}/${suffix}`)
export const sendRate = (rate) => axios.post('/ticket/rate-service', rate)

export const getOrdersNew = (suffix, skip) => axios.get('/v9/order/' + skip + '/20/' + suffix)

export const getQuestionType = () => axios.get("/message/anon/get-list/M1551")
export const questionTypeChange = (type) => axios.post('/ticket/order/add', type)

/**
 * 
 * axios.get('/v9/order/' + skip + '/20/' + api_suffix).then((orders) => {
            callBack(orders)
        }).catch((e) => {
            console.log(e)
        });
 */
