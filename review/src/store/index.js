import Vue from 'vue'
import Vuex from 'vuex'
import * as api from "../api";
import * as types from "./mutation_types";
import _ from 'lodash'
import axios from '../api/apiconfigs'

Vue.use(Vuex)

const state = {
  comment: {
    content: '',
    id: null,
    productId: null,
    score: 5,
    sizingRecommendation: '2'
  },
};
const getters = {
   comment: state => state.comment,
};
const mutations = {
  //comments
  [types.REVIEW_LOAD_COMMENT](state, comment){
    if (!comment)
      comment = {
        content: '',
        id: null,
        productId: null,
        score: 5,
        sizingRecommendation: '2'
      };

    state.comment = comment;
  },

  [types.REVIEW_SEND_COMMENT](state, comment){
    state.comment = comment;
  },

  [types.REVIEW_SENDING](state, sending){
    state.reviewSending = sending
  },
}
const actions = {
  //comments
  loadComment({commit}, {id,server}){
    return api.loadComment(id,server).then((comment) => {
      commit(types.REVIEW_LOAD_COMMENT, comment);
    })
  },
  //sendComment
  sendComment({commit},  {reply,authorization}){
    commit(types.REVIEW_SENDING, true)
    return new Promise((resolve) => {
      api.sendComment(reply,authorization).then((comment) => {
        commit(types.REVIEW_SENDING, false)
        resolve(comment)
      }).catch((e) => {
        console.error(e)
        commit(types.REVIEW_SENDING, false)
      });
    });
  },
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})