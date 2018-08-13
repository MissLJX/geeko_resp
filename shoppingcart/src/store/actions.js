
import {get,
  select,
  selectAll,
  me,
  changeShippingMethod,
  editProduct,
  mercadocards,
  creditcards,
  getMultiMethodCards,
  getpaypal,
  getcoupons,
  deleteitem,
  deleteitems,
  getSessionShipping,
  gettransaction,
  getMessage} from '../api'

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
export const GET_COUPONS = 'GET_COUPONS'
export const SET_MERCAODO_INSTALLMENTS = 'SET_MERCAODO_INSTALLMENTS'
export const CREDIT_STATUS = 'CREDIT_STATUS'
export const ATM_METHOD = 'ATM_METHOD'
export const TICKET_METHOD = 'TICKET_METHOD'

// order confirm
export const GET_TRANSACTION_PAGE = 'GET_TRANSACTION_PAGE'
export const GET_TRANSACTION = 'GET_TRANSACTION'

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

export const toggleCreditStatus = (status) => {
  return {
    type: CREDIT_STATUS,
    status
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

export const setMercadoInstallments = (installments) => {
  return {
    type: SET_MERCAODO_INSTALLMENTS,
    installments
  }
}

export const setAtmMethod = (method) => {
  return {
    type: ATM_METHOD,
    method
  }
}

export const setTicketMethod = (method) => {
  return {
    type: TICKET_METHOD,
    method
  }
}

export const setCreditCards = (cards) => {
  return {
    type: 'CREDIT_CARDS',
    cards
  }
}

export const getCoupons = (coupons) => {
  return {
    type: GET_COUPONS,
    coupons
  }
}

export const fetchAll = () => {
  const fetchCart = get().then(data => data.result)
  const fetchMe = me().then(data => data.result)
  const paypalUrl = getpaypal().then(data => data.result)

  const excuteArr = window.__is_login__ ? [fetchCart, paypalUrl, fetchMe] : [fetchCart, paypalUrl]

  return dispatch => {
    dispatch(loading())
    return Promise.all(excuteArr).then(values => {
      if (values.length === 2) {
        values.push({})
      }

      const cart = values[0]
      if (window.token && !cart.shippingDetail) {
        getSessionShipping(({result}) => {
          cart.shippingDetail = result
          dispatch(loaded([cart, values[1], values[2]]))
        })
      } else {
        dispatch(loaded(values))
      }
    })
  }
}

export const refreshCart = (cart) => {
  const fetchCart = get().then(data => data.result)
  const fetchCoupon = getcoupons().then(data => data.result)

  if (cart) {
    return dispatch => {
      dispatch(refreshed(cart))
      return fetchCoupon.then(coupons => dispatch(getCoupons(coupons)))
    }
  } else {
    return dispatch => {
      dispatch(refresing())

      return Promise.all([fetchCart, fetchCoupon]).then(values => {
        dispatch(refreshed(values[0]))
        dispatch(getCoupons(values[1]))
      })
    }
  }
}

export const selectItem = (params) => {
  return dispatch => {
    dispatch(refresing())
    return select(params).then(data => data.result).then(cart => dispatch(refreshCart(cart)))
  }
}

export const selectAllItems = () => {
  return dispatch => {
    dispatch(refresing())
    return selectAll().then(data => data.result).then(cart => dispatch(refreshCart(cart)))
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
      dispatch(refreshCart(cart))
      dispatch(edited())
    })
  }
}

export const deleteItem = (itemId) => {
  return dispatch => {
    dispatch(refresing())
    return deleteitem(itemId).then(data => data.result).then(cart => {
      dispatch(refreshCart(cart))
    })
  }
}

export const deleteItems = (itemIds) => {
  return dispatch => {
    dispatch(refresing())
    return deleteitems(itemIds).then(data => data.result).then(cart => {
      dispatch(refreshCart(cart))
    })
  }
}

export const getMercadoCards = () => {
  return dispatch => {
    return mercadocards().then(data => data.result).then(cards => {
      dispatch(setMercadoCards(cards))
      return cards
    })
  }
}

export const getCreditCards = (payMethod, multi) => {
  const getcards = multi ? getMultiMethodCards : creditcards

  return dispatch => {
    return getcards(payMethod).then(data => data.result).then(cards => {
      dispatch(setCreditCards(cards))
      return cards
    })
  }
}

export const fetchCoupons = () => {
  return dispatch => {
    return getcoupons().then(data => data.result).then(coupons => {
      dispatch(getCoupons(coupons))
    })
  }
}

export const getTransactionPage = (page) => {
  return {
    type: GET_TRANSACTION_PAGE,
    page
  }
}

export const getTransaction = (transaction) => {
  return {
    type: GET_TRANSACTION,
    transaction
  }
}

export const fetchTransactionPage = (transactionId) => {
  const __get_transaction = gettransaction(transactionId)
  const __get_me = me()
  const __br_m1132__ = getMessage('M1132')
  const __br_m1133__ = getMessage('M1133')
  const __mx_m1147__ = getMessage('M1147')
  const __normal_m1073 = getMessage('M1073')
  return dispatch => {
    return Promise.all([__get_transaction, __get_me, __br_m1132__, __br_m1133__, __mx_m1147__, __normal_m1073]).then(values => {
      const transactionPage = {
        transaction: values[0].result,
        me: values[1].result,
        m1132: values[2].result,
        m1133: values[3].result,
        m1147: values[4].result,
        m1073: values[5].result
      }
      dispatch(getTransactionPage(transactionPage))
      return transactionPage
    })
  }
}

export const fetchTransaction = (transactionId) => {
  return dispatch => {
    return gettransaction(transactionId).then(({result}) => {
      dispatch(getTransaction(result))
      return result
    })
  }
}
