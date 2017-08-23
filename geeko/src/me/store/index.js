/**
 * Created by shao_ on 2017/8/23.
 */
import * as types from './mutation_types'
import {get, getShippingDetails}  from '../api'

const state = {
    me: null,
    addresses: null
}

const getters = {
    me: state => state.me,
    addresses: state => state.addresses
}

const mutations = {
    [types.ME_GET](state, _me){
        state.me = _me
    },
    [types.ME_GET_ADDRESSES](state, _addresses){
        state.addresses = _addresses
    }
}

const actions = {
    getMe({commit}){
        return new Promise((resolve, reject) => {
            get().then(me => {
                commit(types.ME_GET, me)
                resolve()
            }).catch(e => {
                reject(e)
            })
        })

    },
    getAddresses({commit}){

        return new Promise((resolve, reject) => {
            getShippingDetails().then(addresses => {
                commit(types.ME_GET_ADDRESSES, addresses)
                resolve()
            }).catch(e => {
                reject(e)
            })
        })


    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}