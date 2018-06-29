import { combineReducers } from 'redux'
import {LOADING,
  LOADED,
  REFRESHING,
  REFRESHED,
  EDITING,
  EDITED,
  SELECT_PAY,
  CPF,
  EMAIL,
  MERCADO_CARDS,
  TOGGLE_CREDIT} from './actions.js'

const initialState = {
  loading: false,
  empty: false,
  refreshing: false,
  cart: null,
  coupons: null,
  me: null,
  payMethod: null,
  editing: {
    item: null,
    isEditing: false
  },
  cpf: null,
  email: null,
  mercadocards: null,
  isCreditShow: false
}

const refresh = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true}
    case LOADED:
      return {...state, loading: false, cart: action.values[0], me: action.values[1], cpf: action.values[1].payCpf, email: action.values[1].communicationEmail}
    case REFRESHING:
      return {...state, refreshing: true}
    case REFRESHED:
      return {...state, refreshing: false, cart: action.cart}
    case EDITING:
      return {...state,
        editing: {
          item: action.item,
          isEditing: true
        }}
    case EDITED:
      return {...state,
        editing: {
          item: null,
          isEditing: false
        }}
    case SELECT_PAY:
      return {...state, payMethod: action.payMethod}

    case CPF:
      return {...state, cpf: action.cpf}
    case EMAIL:
      return {...state, email: action.email}
    case MERCADO_CARDS:
      return {...state, mercadocards: action.cards}
    case TOGGLE_CREDIT:
      return {...state, isCreditShow: action.isShow}
    default:
      return state
  }
}

export default refresh
