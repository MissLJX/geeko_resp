import * as types from './mutation_types'
import * as api from '../api'

const state = {
  me: null
}

const getters = {
  me: state => state.me
}

const mutations = {
  [types.INIT_ME](state, me){
    state.me = me
  }
}

const actions = {
  init({commit}){
    return api.get().then(data => data.result).then((me) => {
      commit(types.INIT_ME, me)
      return me
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
