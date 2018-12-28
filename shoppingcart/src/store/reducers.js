import { combineReducers } from 'redux'
import {storage} from '../utils/utils.js'
import {
  SET_LANG,
  LOADING,
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
  SET_INSTALLMENTS,
  SET_MERCAODO_INSTALLMENTS,
  GET_COUPONS,
  CREDIT_STATUS,
  ATM_METHOD,
  TICKET_METHOD,
  GET_TRANSACTION_PAGE,
  GET_TRANSACTION,
  GET_ADDRESSES,
  UPDATE_ADDRESS, SET_ME, SET_COUPON_CODE,
  SET_CHECKOUT, DLOCAL_CARDS} from './actions.js'

const initialState = {
  lang: window.lang || 'en',
  loading: false,
  empty: false,
  refreshing: false,
  cart: null,
  coupons: null,
  me: null,
  payMethod: null,
  payType: null,
  atmMethod: storage.get('atmMethod'),
  ticketMethod: storage.get('ticketMethod'),
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
  noCreditCard: false,
  creditcards: null,
  dlocalcards: null,
  installments: 1,
  paypal: null,
  mercadoinstallments: 1,
  creditstatus: 0,
  transaction: null,
  m1186: null,
  m1147: null,
  m1073: null,
  addresses: null,
  addressUpdating: false,
  couponCode: null,
  dlocal: null,
  checkout: null
}

const isEmpty = cart => !cart

const getPaymethod = (cart) => {
  if (cart && cart.selectedPayMethod) {
    return cart.selectedPayMethod.id
  }
  return null
}

const getPaymethodType = (cart) => {
  if (cart && cart.selectedPayMethod) {
    return cart.selectedPayMethod.type
  }
  return null
}

const refresh = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANG:
      return {...state, lang: action.lang}
    case LOADING:
      return {...state, loading: true}
    case LOADED:
      return {...state, loading: false, payType: getPaymethodType(action.values[0]), payMethod: getPaymethod(action.values[0]), paypal: action.values[1], empty: isEmpty(action.values[0]), cart: action.values[0], me: action.values[2], cpf: action.values[2].payCpf, email: action.values[2].communicationEmail}
    case REFRESHING:
      return {...state, refreshing: true}
    case REFRESHED:
      return {...state, refreshing: false, cart: action.cart, payType: getPaymethodType(action.cart), payMethod: getPaymethod(action.cart), empty: isEmpty(action.cart)}
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
      return {...state, payMethod: action.payMethod.id, payType: action.payMethod.type}

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
    case SET_MERCAODO_INSTALLMENTS:
      return {...state, mercadoinstallments: action.installments}
    case CREDIT_CARDS:
      return {...state, creditcards: action.cards, noCreditCard: (!action.cards || !action.cards.length)}
    case GET_COUPONS:
      return {...state, coupons: action.coupons}
    case CREDIT_STATUS:
      return {...state, creditstatus: action.status}
    case ATM_METHOD:
      return {...state, atmMethod: action.method}
    case TICKET_METHOD:
      return {...state, ticketMethod: action.method}
    case GET_TRANSACTION_PAGE:
      return {...state, ...action.page}
    case GET_TRANSACTION:
      return {...state, transaction: action.transaction}
    case GET_ADDRESSES:
      return {...state, addresses: action.addresses}
    case UPDATE_ADDRESS:
      return {...state, addressUpdating: action.updating}
    case SET_ME:
      return {...state, me: action.me}
    case SET_COUPON_CODE:
      return {...state, couponCode: action.couponCode}
    case 'DLOCAL':
      return {...state, dlocal: action.dlocal}
    case SET_CHECKOUT:
      return {...state, checkout: action.checkout}
    case 'SET_PAYPAL':
      return {...state, paypal: action.paypal}
    case DLOCAL_CARDS:
      return {...state, dlocalcards: action.cards}
    default:
      return state
  }
}

export default refresh
