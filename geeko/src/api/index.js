/**
 * Created by shao_ on 2017/7/14.
 */
import axios from './apiconfigs'

export function getDictionary(type) {
    return axios.get('/dictionary/anon/get', {typeCode: type}).then(data => data.result)
}


export function getCountries() {
    return getDictionary('country')
}

export function getStates(country) {
    return getDictionary('state-' + country)
}