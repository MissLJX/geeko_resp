import API from './apiconfig'

const api = new API({
    baseUrl:'/'
})

export const fetchHotQuestions = () => {
    return api.get('/service-robot/hot-question', {})
}

export const fetchThemesByParentId = parentId => {
    return api.get(`/service-robot/themes/${parentId}`)
}

export const matchQuestion = question => {
    return api.get(`/service-robot/match-question`, {question})
}

export const suggest = question => {
    return api.get(`/service-robot/suggest`, {question})
}


export const getUser = () => {
    return api.get('/v9/customer/get')
}
