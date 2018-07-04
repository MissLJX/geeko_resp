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
  TOGGLE_CREDIT,
  SET_SECURITY_CODE,
  CREDIT_CARDS,
  SET_INSTALLMENTS} from './actions.js'

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
  securityCode: null,
  mercadocards: null,
  isCreditShow: false,
  noCard: false,
  creditcards: null,
  installments: 1,
  paypal: null
}

const refresh = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true}
    case LOADED:
      return {...state, loading: false, paypal: action.values[2], cart: action.values[0], me: action.values[1], cpf: action.values[1].payCpf, email: action.values[1].communicationEmail}
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
      return {...state, mercadocards: action.cards, noCard: (!action.cards || !action.cards.length)}
    case TOGGLE_CREDIT:
      return {...state, isCreditShow: action.isShow}
    case SET_SECURITY_CODE:
      return {...state, securityCode: action.securityCode}
    case SET_INSTALLMENTS:
      return {...state, installments: action.installments}
    case CREDIT_CARDS:
      return {...state, creditcards: action.cards, noCard: (!action.cards || !action.cards.length)}
    default:
      return state
  }
}

export default refresh
