/**
 * Created by shao_ on 2017/9/4.
 */

import * as types from './mutation_types'
import * as api from '../api'

export const state = {
    countries: null,
    states: null
}


export const getters = {
    countries: state => state.countries,
    states: state => state.states
}


export const mutations = {
    [types.GLOBAL_GET_COUNTRIES](state, countries){
        state.countries = countries
    },
    [types.GLOBAL_GET_STATES](state, states){
        state.states = states
    }
}


export const actions = {
    getCountries({commit}){
        api.getCountries().then((countries) => {
            commit(types.GLOBAL_GET_COUNTRIES, countries)
        })
    },
    getStates({commit}, {country}){
        api.getStates(country).then((states) => {
            commit(types.GLOBAL_GET_STATES, states)
        })
    }
}
