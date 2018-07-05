
import {get,
  select,
  selectAll,
  me,
  changeShippingMethod,
  editProduct,
  mercadocards,
  creditcards,
  getpaypal} from '../api'

export const LOADING = 'LOADING'
export const LOADED = 'LOADED'
export const REFRESHING = 'REFRESHING'
export const REFRESHED = 'REFRESHED'
export const SELECTITEMS = 'SELECTITEMS'
export const SELECTALL = 'SELECTALL'
export const EDITING = 'EDITING'
export const EDITED = 'EDITED'
export const SELECT_PAY = 'SELECT_PAY'
export const CPF = 'CPF'
export const EMAIL = 'EMAIL'
export const MERCADO_CARDS = 'MERCADO_CARDS'
export const TOGGLE_CREDIT = 'TOGGLE_CREDIT'
export const SET_SECURITY_CODE = 'SET_SECURITY_CODE'
export const CREDIT_CARDS = 'CREDIT_CARDS'
export const SET_INSTALLMENTS = 'SET_INSTALLMENTS'

export const loading = () => {
  return {
    type: LOADING
  }
}

export const loaded = (values) => {
  return {
    type: LOADED,
    values
  }
}

export const refresing = () => {
  return {
    type: REFRESHING
  }
}

export const refreshed = (cart) => {
  return {
    type: REFRESHED,
    cart
  }
}

export const editing = (item) => {
  return {
    type: EDITING,
    item
  }
}

export const edited = () => {
  return {
    type: EDITED
  }
}

export const selectPay = (payMethod) => {
  return {
    type: SELECT_PAY,
    payMethod
  }
}

export const setMercadoCards = (cards) => {
  return {
    type: 'MERCADO_CARDS',
    cards
  }
}

export const toggleCredit = (isShow) => {
  return {
    type: TOGGLE_CREDIT,
    isShow
  }
}

export const setSecurityCode = (code) => {
  return {
    type: SET_SECURITY_CODE,
    securityCode: code
  }
}

export const setInstallments = (installments) => {
  return {
    type: SET_INSTALLMENTS,
    installments
  }
}

export const setCreditCards = (cards) => {
  return {
    type: 'CREDIT_CARDS',
    cards
  }
}

export const fetchAll = () => {
  const fetchCart = get().then(data => data.result)
  const fetchMe = me().then(data => data.result)
  const paypalUrl = getpaypal().then(data => data.result)

  return dispatch => {
    dispatch(loading())
    return Promise.all([fetchCart, fetchMe, paypalUrl]).then(values => dispatch(loaded(values)))
  }
}

export const refreshCart = (cart) => {
  if (cart) {
    return {
      type: REFRESHED,
      cart
    }
  } else {
    return dispatch => {
      dispatch(refresing())
      return get().then(data => data.result).then(cart => dispatch(refreshed(cart)))
    }
  }
}

export const selectItem = (params) => {
  return dispatch => {
    dispatch(refresing())
    return select(params).then(data => data.result).then(cart => dispatch(refreshed(cart)))
  }
}

export const selectAllItems = () => {
  return dispatch => {
    dispatch(refresing())
    return selectAll().then(data => data.result).then(cart => dispatch(refreshed(cart)))
  }
}

export const selectMethod = (method) => {
  return dispatch => {
    dispatch(refresing())
    return changeShippingMethod(method).then(() => {
      dispatch(refreshCart())
    })
  }
}

export const editItem = (oldId, newId, quantity) => {
  return dispatch => {
    dispatch(refresing())
    return editProduct(oldId, newId, quantity).then(data => data.result).then(cart => {
      dispatch(refreshed(cart))
      dispatch(edited())
    })
  }
}

export const getMercadoCards = () => {
  return dispatch => {
    return mercadocards().then(data => data.result).then(cards => {
      dispatch(setMercadoCards(cards))
    })
  }
}

export const getCreditCards = () => {
  return dispatch => {
    return creditcards().then(data => data.result).then(cards => {
      dispatch(setCreditCards(cards))
    })
  }
}
