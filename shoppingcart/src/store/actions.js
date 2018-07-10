
import {get,
  select,
  selectAll,
  me,
  changeShippingMethod,
  editProduct,
  mercadocards,
  creditcards,
  getpaypal,
  getcoupons,
  deleteitem,
  deleteitems,
  getSessionShipping} from '../api'

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

export const deleteItem = (itemId) => {
  return dispatch => {
    dispatch(refresing())
    return deleteitem(itemId).then(data => data.result).then(cart => {
      dispatch(refreshed(cart))
    })
  }
}

export const deleteItems = (itemIds) => {
  return dispatch => {
    dispatch(refresing())
    return deleteitems(itemIds).then(data => data.result).then(cart => {
      dispatch(refreshed(cart))
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

export const fetchCoupons = () => {
  return dispatch => {
    return getcoupons().then(data => data.result).then(coupons => {
      dispatch(getCoupons(coupons))
    })
  }
}
