import React from 'react'
import styled from 'styled-components'
import {injectIntl, FormattedMessage} from 'react-intl'
import {__route_root__, storage} from '../utils/utils.js'

import {submit} from '../utils/common-pay.js'
import {CountDownBlock} from '../components/msite/countdowns.jsx'
import AddressFrom from '../components/pc/address-form.jsx'
import Mask from '../components/mask.jsx'
import SUCCESSTIP from '../components/pc/successtip.jsx'
import Confirm from '../components/pc/confirm.jsx'

import { connect } from 'react-redux'
import {fetchAll,
  refreshCart,
  fetchCoupons,
  selectItem,
  selectMethod,
  editItem,
  setAtmMethod,
  setTicketMethod,
  selectPay,
  setInstallments,
  setMercadoInstallments,
  CPF, EMAIL,
  fetchAddresses,
  getCreditCards,
  deleteItem,
  deleteItems,
  updateAddress,
  setCouponCode,
  changeLang} from '../store/actions.js'

import Loading from '../components/msite/loading.jsx'
import Refreshing from '../components/msite/refreshing.jsx'

import GroupOverseasItems from '../components/pc/group-overseas-items.jsx'

import PromotionGroup from '../components/pc/promotion-group.jsx'

import GroupLocalItems from '../components/pc/group-local-items.jsx'
import GroupIvalidItems from '../components/pc/group-invalid-items.jsx'
import Empty from '../components/pc/empty.jsx'
import {Boxs, Box, SecondBox} from '../components/pc/layouts.jsx'
import CheckBox from '../components/checkbox.jsx'
import LabelCheck from '../components/label-check.jsx'
import Address from '../components/pc/address.jsx'
import Addresses from '../components/pc/shipping-details.jsx'
import ItemTableHead from '../components/pc/item-table-head.jsx'
import {Grey, Red} from '../components/text.jsx'
import CouponSelect from '../components/pc/coupon-select.jsx'
import Money from '../components/money.jsx'
import Ask from '../components/pc/ask.jsx'
import OrderSummary from '../components/pc/order-summary.jsx'
import { BigButton } from '../components/msite/buttons.jsx'
import MessageTip from '../components/pc/message-tip.jsx'
import ShippingMethods from '../components/pc/shipping-methods.jsx'
import PayMethods from '../components/pc/pay-methods.jsx'
import Icon from '../components/icon.jsx'
import {Modal} from '../components/pc/modal.jsx'

import Loadable from 'react-loadable'
import Cookie from 'js-cookie'


import { paypalpay,
  setdefaultaddress,
  atmPay,
  ticketPay,
  getSafeCharge,
  addAddress,
  paypalAddress,
  useInsurance,
  usePoint,
  selectAll,
  getMessage,
  placepaypal,
  getApacPay,
  apacPay,
  givingCoupon,
  movetooverseas,
  unusecoupon,
  product2,
  getLeaveImage,
  useMercadoCoupon } from '../api'

export const __address_token__ = window.token


const getPayImage = country => {
  switch(country){
    case 'BR':
      return 'https://s3-us-west-2.amazonaws.com/wanna/pt_BR.png'
    case 'DE':
      return 'https://s3-us-west-2.amazonaws.com/wanna/de_DE.png'
    case 'MX':
      return 'https://s3-us-west-2.amazonaws.com/wanna/es_ES.png'
    default:
      return 'https://s3-us-west-2.amazonaws.com/wanna/pc_default.png'
  }
}

const ItemEditor = Loadable({
    loader: () => import(/* webpackChunkName: "component--pc-item_editor" */ '../components/pc/item-editor.jsx'),
    loading: Loading
})

const SHOPPINGBODY = styled.div`
	width:1150px;
	margin:auto;
	&::after{
		content: '';
		display: block;
		clear: both;
	}

	& > .__left{
		width: 726px;
		float: left;
		padding-top: 50px;
	}

	& > .__right{
		width: 314px;
		float: right;
	}
`

const AddressBTN = styled.div`
	width: 280px;
	height: 40px;
	border-radius: 2px;
	border: solid 1px #222222;
	color: #222;
	text-transform: uppercase;
	text-align: center;
	line-height: 40px;
  cursor: pointer;
`

const SelectLine = styled.div`
	border-bottom: 1px solid #e6e6e6;
	padding-bottom: 12px;
`

const FixedTop = styled.div`
	&.__fixed{
		position: fixed;
		top: 0;
		background-color: #fff;
		z-index: 5;
	}
`

const DISCOUNTTIP = styled.span`
  background-color:#fff9fc;
  border: 1px solid #f3a6c0;
  padding: 4px;
  font-size: 12px;
  position: relative;
  &::before{
    content:'';
    border-left: 1px solid #f3a6c0;
    border-top: 1px solid #f3a6c0;
    background-color:#fff9fc;
    transform: rotate(-135deg);
    position:absolute;
    left: 50%;
    bottom: -5px;
    width: 8px;
    height: 8px;
  }
`

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    INIT: () => {
      dispatch(fetchAll())
    },
    REFRESHCART: (cart) => {
      return dispatch(refreshCart(cart))
    },
    SELECT: (params) => {
      dispatch(selectItem(params))
    },
    EDITITEM: (oldId, newId, quantity) => {
      dispatch(editItem(oldId, newId, quantity))
    },
    DELETEITEM: (itemId) => {
      return dispatch(deleteItem(itemId))
    },
    DELETEITEMS: (itemIds) => {
      return dispatch(deleteItems(itemIds))
    },
    SETATMMETHOD: (method) => {
      dispatch(setAtmMethod(method))
    },
    SETTICKETMETHOD: (method) => {
      dispatch(setTicketMethod(method))
    },
    SELECTPAY: (paymethod) => {
      return dispatch(selectPay(paymethod))
    },
    SETINSTALLMENTS: (installments) => {
      dispatch(setInstallments(installments))
    },
    SETMERCADOINTALLMENTS: (installments) => {
      dispatch(setMercadoInstallments(installments))
    },
    SETSECURITYCODE: (securityCode) => {
      dispatch(setSecurityCode(securityCode))
    },
    SETCPF: (cpf) => {
      dispatch({
        type: CPF,
        cpf
      })
    },
    SETEMAIL: (email) => {
      dispatch({
        type: EMAIL,
        email
      })
    },
    SETCOUPONCODE: (couponCode) => {
      dispatch(setCouponCode(couponCode))
    },
    GETADDRESSES: () => {
      return dispatch(fetchAddresses())
    },
    SELECTSHIPPINGMETHOD: (method) => {
      dispatch(selectMethod(method))
    },
    FETCHCOUPONS: () => {
      dispatch(fetchCoupons())
    },
    GETCREDITCARDS: (payMethod, multi) => {
      return dispatch(getCreditCards(payMethod, multi))
    },
    UPDATINGADDRESS: (updating) => {
      dispatch(updateAddress(updating))
    },
    CHANGELANG: (lang) => {
      return dispatch(changeLang(lang))
    }
  }
}

const ShoppingCart = class extends React.Component {
  constructor (props) {
    super(props)
    this.scrollhandle = this.scrollhandle.bind(this)
    this.leavehandle = this.leavehandle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)

    this.state = {
      ticketMethods: [],
      atmMethods: [],
      showAddresses: false,
      refreshing: false,
      paypalAddressConfirmed: false,
      pointMessage: null,
      cpfMessage: null,
      editing: null,
      paypaling: false,
      showLeaveImage: false,
      leaveImage:'',
      successTip: null,
      showDeleteConfirm: false,
      itemDelete: null
    }


  }

  showSuccessTip(tip){
    this.setState({
      successTip: tip
    })
    setTimeout(() => {
      this.setState({
        successTip: null
      })
    }, 2000)
  }

  componentDidMount () {
    if (!this.props.cart) {
      this.props.INIT()
    }
    this.props.FETCHCOUPONS()

    getLeaveImage().then( ({result}) => {
      this.setState({
        leaveImage: result
      })
    })

    window.addEventListener('scroll', this.scrollhandle, false)
    window.addEventListener('resize', this.scrollhandle, false)
    window.document.addEventListener('mouseleave', this.leavehandle, false)

    getMessage('M1136').then(({result}) => {
      this.setState({
        pointMessage: result.message,
        cpfMessage: 'CPF (Cadastro de Pessoa Física), utilizado para tributação, é necessário para todos os produtos enviados ao Brasil, independentemente de encomendas expressas ou contêineres logísticos.Quando preenchemos o conhecimento de embarque e fatura, por favor, não esqueça de preencher o número de contribuinte do destinatário.Na maioria dos casos, sua forma é o número digital como abaixo, XXX.XXX.XXX-XX'
      })
    })

    if (Mercadopago) {
      Mercadopago.getAllPaymentMethods((status, methods) => {
        if (status === 200) {
          const tickets = methods.filter(method => method.payment_type_id === 'ticket')
          const atms = methods.filter(method => method.payment_type_id === 'atm')

          if (tickets && tickets.length === 1) {
            this.props.SETTICKETMETHOD(tickets[0].id)
          }

          if (atms && atms.length === 1) {
            this.props.SETATMMETHOD(atms[0].id)
          }

          this.setState({
            ticketMethods: tickets,
            atmMethods: atms
          })
        }
      })
    }
  }

  overseasHandle (variantId) {
    this.setState({
      refreshing: true
    })
    movetooverseas({variantId}).then(({result}) => {
      this.setState({
        refreshing: false
      })
      this.props.REFRESHCART(result)
      this.showSuccessTip('Changed Successed')
    })
  }

  togglePaypalButton(actions){
     const {cart} = this.props
     return cart.shippingDetail ? actions.enable() : actions.disable()
  }

  getProps(){
    return this.props
  }

  paypalRender (c, method) {
    const self = this

    const __confirm_address__ = this.props.intl.formatMessage({id:'please_confirm_address'})

    if (c && (!c.children || c.children.length < 1)) {
      paypal.Button.render({
        env: window.paypalEnv,
        commit: window.__is_login__,
        onClick: function(){
          const {cart, history} = self.getProps()
          if (!cart.shippingDetail && method !== 'quick') {
            alert(__confirm_address__)
            self.$addressdom.scrollIntoView()
            return false
          }
        },

       validate: function(actions) {
          if( method !== 'quick' ){
            self.togglePaypalButton(actions)
            self.actions = actions
          }
          
        },

        payment: function () {
          return paypalpay(method).then(data => data.result).then(({TOKEN, success, transactionId, ACK, L_LONGMESSAGE0}) => {
            if (success && transactionId && !TOKEN) {
              window.location.href = `${window.ctx || ''}/v7/order/confirm/free?transationId=${transactionId}`
              throw new Error('free')
            }
            if (ACK === 'Failure') {
              throw new Error(L_LONGMESSAGE0)
            }
            return TOKEN
          }).catch((err) => {
            if(err.result){
              throw new Error(err.result)
            }else{
              throw new Error(err)
            }
            
          })
        },
        onAuthorize: function (data, actions) {
          return actions.redirect()
        },

        onCancel: function (data, actions) {
          return actions.redirect()
        },

        onError: function (err) {
          var msg = err.stack
          if (msg.indexOf('free') >= 0) {
            console.log('free order')
          } else {
            alert(msg.substring(0, msg.indexOf('\n')))
          }
        },
        style: {
          label: window.__is_login__ ? 'pay' : 'checkout',
          shape: 'rect',
          size: 'responsive',
          tagline: false
        }
      }, '#ip-paypal-pay')
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollhandle, false)
    window.removeEventListener('resize', this.scrollhandle, false)
    window.removeEventListener('mouseleave', this.leavehandle, false)
  }

  // 支付
  checkout (event) {
    event.preventDefault()
    const { payMethod, cart, paypal, payType } = this.props
    const __confirm_address__ = this.props.intl.formatMessage({id:'please_confirm_address'})
    const __confirm_paymethod__ = this.props.intl.formatMessage({id:'please_select_paymethod'})
    if (!payType) {
      alert(__confirm_paymethod__)
      this.$paylistdom.scrollIntoView()
      return
    }

    if (!cart.shippingDetail) {

      if(this.$addressdom){
        this.$addressdom.scrollIntoView()
        alert(__confirm_address__)
      }else{
        this.props.history.push(`${window.ctx || ''}${__route_root__}/address/add`)
      }

      
      return
    }

    if (payType === '2' || payType === '7') {
      if (payMethod === '17') {
        const {cpf} = this.props
        this.brazilOceanForm.validateAll()
        if (!this.brazilOcean.context._errors || !this.brazilOcean.context._errors.length) {
          this.props.history.push(`${window.ctx || ''}${__route_root__}/credit-card`)
        }
      } else {
        this.props.history.push(`${window.ctx || ''}${__route_root__}/credit-card`)
      }
    } else if (payType === '3') {
      window.location.href = `${window.ctx || ''}/computoppay/pay?payMethod=${payMethod}`
    } else if (payType === '5') {
      const {cpf, email} = this.props
      this.boletoForm.validateAll()
      if (!this.boleto.context._errors || !this.boleto.context._errors.length) {
        window.location.href = `${window.ctx || ''}/geekopay/pay?cpf=${cpf}&email=${email}&payMethod=${payMethod}`
      }
    } else if (payType === '8') {
      // TODO
      this.setState({
        checking: true
      })

      this.props.GETCREDITCARDS(['3', '18'], true).then(cards => {
        if (!cards || !cards.length) {
          getSafeCharge().then(({result}) => {
            const {isFree, payURL, params, transactionId} = result
            if (isFree) {
              window.location.href = `${window.ctx || ''}/v7/order/confirm/free?transationId=${transactionId}`
            } else {
              submit(result)

              // window.location.href = `${payURL}?${qs.stringify(params, true)}`
            }
          }).catch(({result}) => {
            alert(result)
            this.setState({
              checking: false
            })
          })
        } else {
          this.setState({
            checking: false
          })
          this.props.history.push(`${window.ctx || ''}${__route_root__}/credit-card`)
        }
      })
    } else if (payType === '9') {
      if (!this.props.atmMethod) {
        alert(__confirm_paymethod__)
        this.$paylistdom.scrollIntoView()
        return
      }

      this.setState({
        checking: true
      })

      atmPay(this.props.atmMethod).then(({result}) => {
        const {transactionId, success, details} = result

        if (success) {
          if(siteType === 'new'){
            window.location.href = `${window.ctx || ''}/shoppingcart/order-confirm/credit-card?order_number=${transactionId}`
          }else{
            window.location.href = `${window.ctx || ''}/v7/order/confirm/web/ocean?transactionId=${transactionId}`
          }
          
        } else {
          alert(details)
        }

        this.setState({
          checking: false
        })
      }).catch(data => {
        alert(data.result)
        this.setState({
          checking: false
        })
      })
    } else if (payType === '10') {
      // if (!this.props.ticketMethod) {
      //   alert('Please select a pay method!')
      //   this.$paylistdom.scrollIntoView()
      //   return
      // }

      this.setState({
        checking: true
      })

      // ticketPay(this.props.ticketMethod).then(({result}) => {
      ticketPay('oxxo').then(({result}) => {
        const {transactionId, success, details} = result

        if (success) {
          if(siteType === 'new'){
            window.location.href = `${window.ctx || ''}/shoppingcart/order-confirm/credit-card?order_number=${transactionId}`
          }else{
            window.location.href = `${window.ctx || ''}/v7/order/confirm/web/ocean?transactionId=${transactionId}`
          }
        } else {
          alert(details)
        }

        this.setState({
          checking: false
        })
      }).catch(data => {
        alert(data.result)
        this.setState({
          checking: false
        })
      })
    } else if (payType === '11') {
      this.setState({
        checking: true
      })

      if (payMethod === '23') {
        const {cpf} = this.props
        this.apac.validateAll()
        if (this.apacBB.context._errors && this.apacBB.context._errors.length) {
          this.setState({
            checking: false
          })
          return
        }

        this.apacPay(payMethod, this.props.cpf, (result) => {
          this.setState({
            checking: false
          })
          alert(result)
        })
      } else {
        this.props.GETCREDITCARDS(['17', '22'], true).then((cards) => {
          if (!cards || cards.length < 1) {
            this.getApacPay(payMethod, this.props.cpf, (result) => {
              this.setState({
                checking: false
              })
              alert(result)
            })
          } else {
            this.setState({
              checking: false
            })
            this.props.history.push(`${window.ctx || ''}${__route_root__}/credit-card`)
          }
        }).catch(() => {
          this.setState({
            checking: false
          })
        })
      }
    }

    if (this.getCountdown(this.props.cart) > 0) {
      givingCoupon()
    }
    window.eventcheck(cart, payMethod)
  }

  getApacPay (payMethod, cpf, fail) {
    getApacPay({payMethod, cpfNumber: cpf}).then(({result}) => {
      const {isFree, transactionId, success,details,solutions} = result
      if (isFree) {
        window.location.href = `${window.ctx || ''}/v7/order/confirm/free?transationId=${transactionId}`
      } else {
        submit(result)
        // console.log(result)
      }
    }).catch(({result}) => {
      fail(result)
    })
  }

  apacPay(payMethod, cpf, fail){
    apacPay({payMethod, cpfNumber: cpf}).then(({result}) => {
      const {isFree, transactionId, success,details,solutions} = result
      if (isFree) {
        window.location.href = `${window.ctx || ''}/v7/order/confirm/free?transationId=${transactionId}`
      } else {
        if( success ){
          if(siteType === 'new'){
            window.location.href = `${window.ctx || ''}/shoppingcart/order-confirm/credit-card?order_number=${transactionId}`
          }else{
            window.location.href = `${window.ctx || ''}/v7/order/confirm/web/ocean?transactionId=${transactionId}`
          }
        }else{
          fail(details)
        }
      }
    }).catch(({result}) => {
      fail(result)
    })
  }

  quickPlace (evt) {
    const { cart, paypal } = this.props

    const __confirm_address__ = this.props.intl.formatMessage({id:'please_confirm_address'})

    if (!cart.shippingDetail || !this.state.paypalAddressConfirmed) {
      alert(__confirm_address__)
      return
    }

    this.setState({
      paypaling: true
    })

    placepaypal().then(() => {

      if(siteType === 'new'){
        
        window.location.href = `${window.ctx || ''}/shoppingcart/order-confirm/paypal`
      }else{
        window.location.href = `${window.ctx || ''}/v7/orderConfirm/anon/order-confirm`
      }

      
    }).catch(({result}) => {
      this.setState({
        paypaling: false
      })
      alert(result)
      window.location.href = `${window.ctx || ''}${__route_root__}/`
    })
  }

  getCountdown (cart) {
    const {sendCouponMessage} = cart || {sendCouponMessage: null}
    let couponcountdown = 0
    if (sendCouponMessage) {
      // 设置15分钟后的毫秒数
      let endcounpontime = storage.get('_end_coupon_time')
      if (!endcounpontime) {
        endcounpontime = new Date().getTime() + 30 * 60 * 1000
        storage.add('_end_coupon_time', endcounpontime)
      }
      couponcountdown = Number(endcounpontime) - new Date().getTime()
    }
    return couponcountdown
  }

  chooseAnthorAddresHandle () {
    this.setState({
      refreshing: true
    })
    this.props.GETADDRESSES().then(() => {
      this.setState({
        showAddresses: true,
        refreshing: false
      })
    }).catch(() => {
      this.setState({
        refreshing: false,
        showAddresses: false
      })
    })
  }

  closeAddressesHandle () {
    this.setState({
      showAddresses: false
    })
  }

  addressEditHandle (shipping) {
    this.props.history.push(`${window.ctx || ''}${__route_root__}/address/${shipping.id}`)
  }

  addressSelectHandle (shipping) {
    this.setState({
      refreshing: true
    })
    setdefaultaddress(shipping.id).then(() => {
      this.props.GETADDRESSES().then(() => {
        this.setState({
          refreshing: false

        })
      }).catch(() => {
        this.setState({
          refreshing: false
        })
      })


      let __refreshCart
      if (shipping.country.value === 'BR') {
        Cookie.set('currency', 'BRL', {expires: 365})
        __refreshCart = this.props.CHANGELANG('pt')
      } else if (shipping.country.value === 'MX') {
        Cookie.set('currency', 'MXN', {expires: 365})
        __refreshCart = this.props.CHANGELANG('es')
      }else{
        __refreshCart = this.props.REFRESHCART()
      }



      __refreshCart.then(() => {
        this.setState({
          showAddresses: false
        })
      })
    }).catch(() => {
      this.setState({
        refreshing: false
      })
    })
  }

  selectShippingMethodHandle (method) {
    this.props.SELECTSHIPPINGMETHOD(method)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    switch (name) {
      case 'cpf':
        this.props.SETCPF(value)
        break
      case 'email':
        this.props.SETEMAIL(value)
        break
      case 'securityCode':
        this.props.SETSECURITYCODE(value)
        break
      case 'installments':
        this.props.SETINSTALLMENTS(value)
      case 'mercado-installments':
        this.props.SETMERCADOINTALLMENTS(value)
      default:
        break
    }
  }

  leavehandle (evt) {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if(evt.pageY - scrollTop <= 0 && !storage.get('leaveImageShowed')){
      this.setState({
        showLeaveImage: true
      })
      storage.add('leaveImageShowed', 1 ,  24 * 60 * 60)
    }
  }

  scrollhandle (evt) {
    if (this.fixedCart && this.fixedCartWrapper) {
      const {clientHeight} = this.fixedCart
      this.fixedCartWrapper.style.height = clientHeight + 'px'
      const rect = this.fixedCartWrapper.getBoundingClientRect()
      if (rect.top <= 0) {
        this.fixedCart.classList.add('__fixed')
        this.fixedCart.style.left = `${Math.floor((document.body.clientWidth - 1150) / 2)}px`
      } else {
        this.fixedCart.classList.remove('__fixed')
      }
    }

    if (this.fixedSummary && this.fixedSummaryWrapper) {
      this.fixedSmall.classList.remove('__fixed')
      const {clientHeight} = this.fixedSummary
      if (window.innerHeight > clientHeight) {
      	this.fixedSummaryWrapper.style.height = clientHeight + 'px'
        const rect = this.fixedSummaryWrapper.getBoundingClientRect()
        if (rect.top <= 0) {
          this.fixedSummary.classList.add('__fixed')
          this.fixedSummary.style.right = `${Math.floor((document.body.clientWidth - 1150) / 2)}px`
        } else {
          this.fixedSummary.classList.remove('__fixed')
        }
      } else {
      	this.fixedSummary.classList.remove('__fixed')
        const { clientHeight } = this.fixedSmall
        this.fixedSmallWrapper.style.height = clientHeight + 'px'
        const rect = this.fixedSmallWrapper.getBoundingClientRect()
        if (rect.top <= 0) {
          this.fixedSmall.classList.add('__fixed')
          this.fixedSmall.style.right = `${Math.floor((document.body.clientWidth - 1150) / 2)}px`
        } else {
          this.fixedSmall.classList.remove('__fixed')
        }
      }
    }
  }

  isOutStock (item) {
    return (item.inventory <= 0 && !item.isDomesticDelivery) && !item.isAutoInventory || item.status !== '1'
  }

  getValidItems (items = []) {
    return items.filter(item => !this.isOutStock(item))
  }

  getInvalidItems ({shoppingCartProductsByOverseas, domesticDeliveryCases}) {
    const invalidItems = []
    if (shoppingCartProductsByOverseas) {
		  _.each(shoppingCartProductsByOverseas, (item) => {
		    if (this.isOutStock(item)) invalidItems.push(item)
		  })
    }

    if (domesticDeliveryCases) {
		 _.each(domesticDeliveryCases, ({shoppingCartProducts}) => {
		    _.each(shoppingCartProducts, (item) => {
		      if (this.isOutStock(item)) invalidItems.push(item)
		    })
		  })
    }
    return invalidItems
  }

  // PayMethods
  selectPayHandle (paymethod) {
    this.props.SELECTPAY(paymethod).then((cart) => {
      if(cart && cart.changeCurrencyMsg){
        alert(cart.changeCurrencyMsg)
      }
    })

    // storage.add('payMethod', paymethod.id, 365 * 24 * 60 * 60)
    // storage.add('payType', paymethod.type, 365 * 24 * 60 * 60)
  }

  atmClickHandle (method) {
    this.props.SETATMMETHOD(method.id)
    storage.add('atmMethod', method.id, 365 * 24 * 60 * 60)
  }

  ticketClickHandle (method) {
    this.props.SETTICKETMETHOD(method.id)
    storage.add('ticketMethod', method.id, 365 * 24 * 60 * 60)
  }

  editAddress (address) {
    const { cart } = this.props
    this.props.UPDATINGADDRESS(true)
    if (__address_token__ && cart.shippingDetail) {
      paypalAddress({...address, id: cart.shippingDetail.id, token: __address_token__}).then(() => {
        this.props.UPDATINGADDRESS(false)
        this.setState({
          paypalAddressConfirmed: true
        })
        this.props.REFRESHCART()
      }).catch(({result}) => {
        alert(result)
        this.props.UPDATINGADDRESS(false)
      })
    } else {
      addAddress(address).then(() => {

        let __refreshCart
        if (address.country === 'BR') {
          Cookie.set('currency', 'BRL', {expires: 365})
          __refreshCart = this.props.CHANGELANG('pt')
        } else if (address.country === 'MX') {
          Cookie.set('currency', 'MXN', {expires: 365})
          __refreshCart = this.props.CHANGELANG('es')
        }else{
          __refreshCart = this.props.REFRESHCART()
        }
        
        __refreshCart.then( () => {
          this.props.UPDATINGADDRESS(false)
          if(this.actions){
            this.togglePaypalButton(this.actions)
          }
        }).catch( () => {
          this.props.UPDATINGADDRESS(false)
        })
        
        
      }).catch(({result}) => {
        alert(result)
        this.props.UPDATINGADDRESS(false)
      })
    }
  }

  openPoints () {
    this.setState({refreshing: true})
    usePoint(!this.props.cart.openPointUse).then(data => data.result).then((cart) => {
      this.setState({refreshing: false})
      this.props.REFRESHCART(cart)
    }).catch(() => {
      this.setState({refreshing: false})
    })
  }

  openInsurance () {
    this.setState({refreshing: true})
    useInsurance(!this.props.cart.insurance).then(data => data.result).then(cart => {
      this.setState({refreshing: false})
      this.props.REFRESHCART(cart)
    }).catch(() => {
      this.setState({refreshing: false})
    })
  }

  getItemUnselected (items) {
    return items && items.length > 0 && items.find(item => !item.selected)
  }

  getLocalFullSelected () {
    const {cart} = this.props
    const { domesticDeliveryCases } = cart

    if (!domesticDeliveryCases || domesticDeliveryCases.length < 1) { return true }

    return !domesticDeliveryCases.find(domestic => this.getItemUnselected(this.getValidItems(domestic.shoppingCartProducts)))
  }

  getOverseasFullSelected () {
    const {cart} = this.props

    const shoppingCartProductsByOverseas = this.getValidItems(cart.shoppingCartProductsByOverseas)

    if (!shoppingCartProductsByOverseas || shoppingCartProductsByOverseas.length < 1) { return true }
    return !this.getItemUnselected(shoppingCartProductsByOverseas)
  }

  getFullSelected () {
    return this.getOverseasFullSelected() && this.getLocalFullSelected()
  }

  selectAllHandle (select) {
    this.setState({
      refreshing: true
    })
    selectAll(select).then(data => data.result).then(cart => {
      this.props.REFRESHCART(cart)
      this.setState({
        refreshing: false
      })
    })
  }

  itemSelect (variantId, selected) {
    this.props.SELECT({
      variantIds: variantId,
      select: selected
    })
  }

  groupClick (variantIds, selected) {
    this.props.SELECT({
      variantIds: variantIds.join(','),
      select: selected
    })
  }

  itemDelete (item) {

    this.setState({
      showDeleteConfirm: true,
      itemDelete: () => {

        this.setState({
          showDeleteConfirm: false
        })
        this.props.DELETEITEM(item.variantId).then(() => {
          this.showSuccessTip('Removed Successed')
        })
      }
    })
    
  }

  itemIdDelete (itemId) {
    this.setState({
      showDeleteConfirm: true,
      itemDelete: () => {

        this.setState({
          showDeleteConfirm: false
        })
        this.props.DELETEITEM(itemId).then(() => {
          this.showSuccessTip('Removed Successed')
        })
      }
    })
  }

  itemEdit (item){
    this.setState({
      refreshing: true
    })
    product2(item.productId).then( ({result}) => {
      this.setState({
        refreshing: false,
        editing: {
          quantity: item.quantity,
          products: result.products,
          variantId: item.variantId,
          productId: result.selectedProductId
        }
      })
    })
  }

  itemEditClose (){
    this.setState({
      editing: null
    })
  }

  unSelectCoupon () {
    unusecoupon().then(() => {
      this.props.REFRESHCART()
    })
  }

  editHandle(oldId, newId, quantity){
    this.props.EDITITEM(oldId, newId, quantity)
    this.itemEditClose()
  }

  clearall () {
    const {cart} = this.props
    const ivalidItems = this.getInvalidItems(cart)
    const itemIds = (ivalidItems || []).map(item => item.variantId)

    this.props.DELETEITEMS(itemIds.join(',')).then( () => {
      this.showSuccessTip('Changed Successed')
    } )
  }

  quantityChange(itemId, quantity, isRemove){
    if(isRemove){
      this.itemIdDelete(itemId)
    }else{
      this.props.EDITITEM(itemId, itemId, quantity)
    }
  }

  useMercadoCoupon(couponCode){

    if(!couponCode) return

    this.setState({
      refreshing: true
    })
    useMercadoCoupon(couponCode).then( ({result}) => {
      this.setState({
        refreshing: false
      })
      this.props.REFRESHCART(result)
      this.showSuccessTip('Used Successed')

    } ).catch(({result}) => {
      this.setState({
        refreshing: false
      })
      alert(result)
    })
  }


  hasSelectedItem(items){
    return items && !!items.find(item => item.selected)
  }

  formatOverseasDelivery(overseasDelivery){
    const deliveryItems = overseasDelivery.deliveryItems
    let hasSelectedItem = false

    if(deliveryItems && deliveryItems.length){
      deliveryItems.forEach(deliveryItem => {
        let items = this.getValidItems(deliveryItem.shoppingCartProducts)
        deliveryItem.shoppingCartProducts = items || []

        if(!hasSelectedItem) hasSelectedItem = this.hasSelectedItem(items)

      })
    }

    return {
      overseasDelivery,
      hasSelectedItem
    }
  }

  formatDomesticDeliveryCases(domesticDeliveryCases){
    let hasSelectedItem = false
    if(domesticDeliveryCases && domesticDeliveryCases.length){
      domesticDeliveryCases.forEach( domestic => {
        let items = this.getValidItems(domestic.shoppingCartProducts)
        domestic.shoppingCartProducts = items || []
        if(!hasSelectedItem) hasSelectedItem = this.hasSelectedItem(items)
      } )
    }
    return {
      domesticDeliveryCases,
      hasSelectedItem
    }
  }


  formatData(cart){
    const invalidItems = this.getInvalidItems(cart)
    let data1 = this.formatOverseasDelivery(cart.overseasDelivery)
    let data2 = this.formatDomesticDeliveryCases(cart.domesticDeliveryCases)

    return {
      invalidItems,
      overseasDelivery: data1.overseasDelivery,
      domesticDeliveryCases: data2.domesticDeliveryCases,
      hasSelectedItem: data1.hasSelectedItem || data2.hasSelectedItem,
      hasSelectedItem1: data1.hasSelectedItem,
      hasSelectedItem2: data2.hasSelectedItem
    }
  }

  countCart(overseasDelivery, domesticDeliveryCases){
    let count = 0

    const deliveryItems = overseasDelivery.deliveryItems

    if(deliveryItems && deliveryItems.length){
      deliveryItems.forEach(deliveryItem => {
        let items = deliveryItem.shoppingCartProducts
        if(items && items.length){
          items.forEach( item => {
            if(item.selected) count += item.quantity
          } )
        }
      })
    }


    if(domesticDeliveryCases && domesticDeliveryCases.length){
      domesticDeliveryCases.forEach( domestic => {
        let items = domestic.shoppingCartProducts
        if(items && items.length){
          items.forEach( item => {
            if(item.selected) count += item.quantity
          } )
        }
      })
    }

    return count

  }

  render () {
    const {cart, loading, empty, intl} = this.props





    let formatedData, invalidItems,cancheckout,hasLocalItems, sendCouponMessage, couponcountdown, totalCount=0, hasOverseas
    let hasOverseasHead, fullSelected, cancheckout1

    if(cart){
      formatedData = this.formatData(cart)
      invalidItems = formatedData.invalidItems
      sendCouponMessage = cart.sendCouponMessage
      couponcountdown = this.getCountdown(cart)
      cancheckout = formatedData.hasSelectedItem
      cancheckout1 = formatedData.hasSelectedItem1
      hasLocalItems = formatedData.domesticDeliveryCases && !!formatedData.domesticDeliveryCases.find( domestic => domestic.shoppingCartProducts && domestic.shoppingCartProducts.length )
      totalCount = this.countCart(formatedData.overseasDelivery, formatedData.domesticDeliveryCases)

      let validateOverseasItems = this.getValidItems(cart.shoppingCartProductsByOverseas) 
      hasOverseas = validateOverseasItems && validateOverseasItems.length > 0
      hasOverseasHead = hasOverseas && hasLocalItems
      fullSelected = this.getFullSelected()
    }




    const Address1 = cart && <Box title={intl.formatMessage({id: 'shipping_address'})}>
      <div style={{position: 'relative'}}>

        {
          this.state.showAddresses && this.props.addresses ? (
            <React.Fragment>
              <Icon onClick={this.closeAddressesHandle.bind(this)} style={{position: 'absolute', right: 0, top: -35, fontSize: 28, cursor: 'pointer'}}>&#xe69a;</Icon>
              <Addresses shippings={this.props.addresses} onSelect= { this.addressSelectHandle.bind(this) } onEdit= { this.addressEditHandle.bind(this)}/>
            </React.Fragment>

          ) : (

            <div className="x-table x-fw __fixed __vm" style={{paddingTop: 15}}>
              <div className="x-cell" style={{width: 362}}>
                <Address onEdit={ () => { this.props.history.push(`${window.ctx || ''}${__route_root__}/address`) } } address={cart.shippingDetail}/>
              </div>
              {
                !window.token && <div className="x-cell">
                  <AddressBTN onClick={ this.chooseAnthorAddresHandle.bind(this) } style={{marginBottom: 10}}>{intl.formatMessage({id: 'choose_anthor_address'})}</AddressBTN>
                  <AddressBTN onClick={ () => { this.props.history.push(`${window.ctx || ''}${__route_root__}/address/add`) } } >+ {intl.formatMessage({id: 'add_new_address'})}</AddressBTN>
                </div>
              }

            </div>

          )
        }

      </div>
    </Box>

    const Address2 = cart && <Box title={intl.formatMessage({id: 'shipping_address'})}>
      <div style={{paddingTop: 20}}>
        <AddressFrom isConfirm={true} updating={this.props.addressUpdating} address={cart.shippingDetail} editAddress={this.editAddress.bind(this)} isNew={true}/>
      </div>
    </Box>

    const AddressBook = () => {
      if (window.__is_login__) {
        if (cart.shippingDetail) {
          return Address1
        }
        return Address2
      } else {
        if (__address_token__) {
          if (this.state.paypalAddressConfirmed) {
            return Address1
          }
          return Address2
        } else {
          return null
        }
      }
    }

    const __addressbook = cart ? AddressBook() : null
   

    const shippingLabel = !hasLocalItems ? intl.formatMessage({id: 'shipping_method'}) : 'Shipping Method For Overseas Warehouse' 


    const country = cart && cart.shippingDetail && cart.shippingDetail.country ? cart.shippingDetail.country.value : window.__country

    return loading ? <Loading/> : (empty ? <Empty/> : cart && <div>
      {(this.props.refreshing || this.state.refreshing) && <Refreshing/>}
      <SHOPPINGBODY>

        <div className="__left">

          <Boxs>
            {
              __addressbook && <div ref={c => { this.$addressdom = c }}>
                { __addressbook }
              </div>
            }
            

            

            {
              window.__is_login__ && <div ref={ c => this.$paylistdom = c}>
                <Box title={intl.formatMessage({id: 'payment_method'})}>
                  <div style={{paddingTop: 20}}>
                    <PayMethods
                      couponCode={this.props.couponCode}
                      cpf={this.props.cpf}
                      email={this.props.email}
                      payMethodList={ cart.payMethodList }
                      selectedPayId={this.props.payMethod}
                      selectPayHandle={this.selectPayHandle.bind(this)}
                      ticketMethods={this.state.ticketMethods}
                      atmClickHandle={this.atmClickHandle.bind(this)}
                      ticketClickHandle={this.ticketClickHandle.bind(this)}
                      atmMethod={this.props.atmMethod}
                      ticketMethod={this.props.ticketMethod}
                      atmMethods={this.state.atmMethods}
                      handleInputChange={this.handleInputChange}
                      installmentoptions={this.props.cart.payInstalmentsByOceanpaymentBRACreditCard || []}
                      installments={this.props.installments}
                      orderTotal={cart.orderSummary.orderTotal}
                      cart={cart}

                      boletoForm={(c) => this.boletoForm = c}
                      boleto={(c) => { this.boleto = c }}

                      apac={c => this.apac = c}
                      apacBB={c => this.apacBB = c}

                      brazilOceanForm={ c => this.brazilOceanForm = c }
                      brazilOcean={ c => this.brazilOcean = c }

                      setCouponHandle={ this.useMercadoCoupon.bind(this) }
                      couponCode={this.props.couponCode}
                    />
                  </div>
                </Box>
              </div>
            }

            {
              (window.__is_login__ && (cancheckout1 || !hasLocalItems) || window.token) && <Box title={shippingLabel}>
                <ShippingMethods onSelect={this.selectShippingMethodHandle.bind(this)} shippingMethodList={ cart.shippingMethodList } selectedShippingMethod={ cart.shippingMethod }/>
                {
                  cart.shippingInsurancePrice2 && <div style={{borderTop:'1px solid #e6e6e6', paddingTop: 10}}>
                  <LabelCheck clickHandle={this.openInsurance.bind(this)} disabled={cart.isShippingInsuranceMust} selected={cart.insurance}>
                    <FormattedMessage id="add_shipping_insurance" values={{price: <Red><Money money={cart.shippingInsurancePrice2}/></Red>}}/>
                  </LabelCheck>
                  <Ask style={{marginLeft: 5}} message={cart.shippingInsuranceMsg2}/>
                </div>
                }
                
                
              </Box>
            }

            <Box title={`${intl.formatMessage({id: 'shopping_bag'})} (${totalCount})`} ignoreLine={true}>
            	<div ref={c => this.fixedCartWrapper = c}>
            		<FixedTop style={{width: 726}} innerRef={c => this.fixedCart = c}>
  		          	<SelectLine style={{paddingTop: 20}}>
  		          		<div className="x-table __vm x-fw">
  		          			<div className="x-cell">
  		          				<CheckBox className={`${fullSelected ? 'selected' : ''}`} onClick={ (evt) => { this.selectAllHandle(!fullSelected) } } style={{verticalAlign: 'middle'}}/>
  		          				<span style={{marginLeft: 10, verticalAlign: 'middle'}}>{intl.formatMessage({id:'select_all'})}</span>
  		          			</div>
  		          			<div className="x-cell __right">
                        { cart.messages && cart.messages.shippingMsg && <span dangerouslySetInnerHTML={{__html: cart.messages.shippingMsg}}/>}
                      </div>
  		          		</div>
  		          	</SelectLine>
  		          	<ItemTableHead/>
      		  		</FixedTop>
      	  		</div>

{/*              { 
                shoppingCartProductsByOverseas && shoppingCartProductsByOverseas.length > 0 && <GroupOverseasItems style={{marginTop: 25, borderBottom: '1px dashed #e6e6e6'}}
                  hasHead={hasOverseasHead}
                  items={shoppingCartProductsByOverseas}
                  serverTime={cart.serverTime}
                  groupClick={this.groupClick.bind(this)}
                  itemDelete={this.itemDelete.bind(this)}
                  itemSelect={this.itemSelect.bind(this)}
                  itemEdit={this.itemEdit.bind(this)}
                  setQuantity={(itemId, quantity) => { this.props.EDITITEM(itemId, itemId, quantity) }}
                  quantityChange={ this.quantityChange.bind(this)}/>
              }*/}


              { 
                hasOverseas && formatedData.overseasDelivery && <PromotionGroup style={{marginTop: 25, borderBottom: '1px dashed #e6e6e6'}}
                  hasHead={hasOverseasHead}
                  group={formatedData.overseasDelivery}
                  serverTime={cart.serverTime}
                  groupClick={this.groupClick.bind(this)}
                  itemDelete={this.itemDelete.bind(this)}
                  itemSelect={this.itemSelect.bind(this)}
                  itemEdit={this.itemEdit.bind(this)}
                  setQuantity={(itemId, quantity) => { this.props.EDITITEM(itemId, itemId, quantity) }}
                  quantityChange={ this.quantityChange.bind(this)}/>
              }
      	  		

              {
                hasLocalItems && formatedData.domesticDeliveryCases.map(domestic => <GroupLocalItems
                	style={{marginTop: 25, borderBottom: '1px dashed #e6e6e6'}}
                  key={ domestic.countryCode }
                  domestic= {domestic}
                  serverTime={cart.serverTime}
                  groupClick={this.groupClick.bind(this)}
                  itemDelete={this.itemDelete.bind(this)}
                  itemSelect={this.itemSelect.bind(this)}
                  overseasHandle={this.overseasHandle.bind(this)}
                  itemEdit={this.itemEdit.bind(this)}
                  setQuantity={(itemId, quantity) => { this.props.EDITITEM(itemId, itemId, quantity) }}
                  quantityChange={ this.quantityChange.bind(this)}
                />)
              }

              {
                invalidItems && invalidItems.length > 0 && <GroupIvalidItems style={{marginTop: 25, borderBottom: '1px dashed #e6e6e6'}}
                  items={invalidItems}
                  clearall={this.clearall.bind(this)}
                  itemDelete={this.itemDelete.bind(this)}
                  serverTime={cart.serverTime}/>
              }

            </Box>
          </Boxs>

        </div>
        <div className="__right">
        	<div style={{height: 32}}></div>
        	<div ref={ c => this.fixedSummaryWrapper = c}>
        		<FixedTop style={{paddingTop: 20, width: 314}} innerRef={c => this.fixedSummary = c}>
  	        	<SecondBox>
  	        		<div className="__hd">
  	        			{intl.formatMessage({id: 'coupon'})}
  	        		</div>
  	        		<div className="__bd">
  	        			<CouponSelect unSelectCoupon={this.unSelectCoupon.bind(this)} selectCoupon={ () => { this.props.history.push(`${window.ctx || ''}${__route_root__}/coupons`) } } coupon={cart.coupon} canUseCouponCount={cart.canUseCouponCount}/>
  	        		  {
                    cart.messages && cart.messages.couponMsg && <MessageTip style={{marginTop: 20}}>
                      <span dangerouslySetInnerHTML={{__html: cart.messages.couponMsg}}/>
                    </MessageTip>
                  }

                </div>
  	        	</SecondBox>
              {
                cart.expectedPoints > 0 && <SecondBox style={{marginTop: 22}}>
                  <div className="__hd">
                    {intl.formatMessage({id: 'credits'})}
                  </div>
                  <div className="__bd">
                    <LabelCheck clickHandle={this.openPoints.bind(this)} selected={cart.openPointUse}>
                      <FormattedMessage  id="credit_msg" values={{credits: cart.expectedPoints, discount: <Red><Money money={cart.expectedPointDiscount}/></Red>}}/>
                    </LabelCheck>
                    <span> </span>
                    <Ask message={this.state.pointMessage} />
                  </div>
                </SecondBox>
              }
              {
                 (!window.__is_login__ || !cancheckout1 && hasLocalItems) && !window.token && <SecondBox style={{marginTop: 22}}>
                <div className="__hd">
                  {intl.formatMessage({id: 'shipping_insurance'})}
                </div>
                <div className="__bd">
                  <LabelCheck clickHandle={this.openInsurance.bind(this)} disabled={cart.isShippingInsuranceMust} selected={cart.insurance}>
                    <FormattedMessage id="add_shipping_insurance" values={{price: <Red><Money money={cart.shippingInsurancePrice2}/></Red>}}/>
                  </LabelCheck>
                  <Ask style={{marginLeft: 5}} message={cart.shippingInsuranceMsg2}/>

                </div>
              </SecondBox>
              }
              

      

              <div ref={ c => this.fixedSmallWrapper = c }>
                <FixedTop style={{paddingTop: 40, width: 314}} innerRef={c => this.fixedSmall = c}>
      	        	<Boxs>
      	        		<Box title={intl.formatMessage({id: 'order_summary'})}>

                      <OrderSummary style={{marginTop: 20}} orderSummary={cart.orderSummary}/>
                      {
                          this.props.payMethod === '22' && <div style={{marginTop:5, textAlign:'right'}}>
                            <Red style={{fontWeight:'normal', marginLeft:5, fontSize: 14}}>(Em até 3x s/ juros)</Red>
                          </div>
                      }

                      {
                        cancheckout ? (
                          window.__is_login__ ? <div>
                            {
                              this.props.payMethod === '1' ? <div id='ip-paypal-pay' style={{marginTop: 30}} ref={ (c) => this.paypalRender(c, 'normal') }/> : (!this.state.checking ? <BigButton onClick={this.checkout.bind(this)} bgColor="#222" style={{marginTop: 30, height: 45, lineHeight: '45px', textTransform: 'uppercase', fontSize: 18}}>
                                {intl.formatMessage({id: 'check_out'})}
                              </BigButton> : <BigButton bgColor="#999" style={{marginTop: 30, height: 45, lineHeight: '45px'}}>
                                {intl.formatMessage({id: 'please_wait'})}...
                              </BigButton>)
                            }

                          </div> : (
                            window.token ? <div>
                              <BigButton onClick={this.quickPlace.bind(this)} bgColor="#e5004f" style={{marginTop: 30, height: 45, lineHeight: '45px', textTransform: 'uppercase', fontSize: 18}}>
                                {intl.formatMessage({id: 'place_order'})}
                              </BigButton>
                            </div> : <div>

                              { 
                                cart.paypalDiscountMessage && <DISCOUNTTIP style={{position:'relative', top:15}}>
                                  <span dangerouslySetInnerHTML={{__html: cart.paypalDiscountMessage}}/>
                                </DISCOUNTTIP> 
                              }

                              <div id='ip-paypal-pay' style={{marginTop: 30}} ref={ (c) => this.paypalRender(c, 'quick') }/>
                              <div style={{color: '#999', textAlign: 'center', height: 30, lineHeight: '30px', textTransform: 'uppercase'}}>
                                {intl.formatMessage({id: 'or'})}
                              </div>
                              <BigButton onClick={ () => { window.location.href = `${window.ctx}/${siteType === 'new' ? 'page' : 'i'}/login?redirectUrl=${encodeURIComponent(window.location.href)}` } } bgColor="#222" style={{height: 45, lineHeight: '45px', textTransform: 'uppercase', fontSize: 18}}>
                                {intl.formatMessage({id: 'proceed_checkout'})}
                              </BigButton>
                            </div>

                          )

                        ) : (
                          <BigButton bgColor="#999" style={{marginTop: 30, cursor: 'not-allowed', height: 45, lineHeight: '45px', textTransform: 'uppercase', fontSize: 18}}>
                            {intl.formatMessage({id: 'check_out'})}
                          </BigButton>
                        )
                      }

          	        		



                      {

                        couponcountdown > 1000 ?  <MessageTip style={{marginTop: 20}}>
                          <div className="x-table __fixed x-fw __vm">
                            <div className="x-cell" style={{width: 75}}>
                              <CountDownBlock offset={couponcountdown}/>
                            </div>
                            <div className="x-cell">
                              <span dangerouslySetInnerHTML={{__html: cart.sendCouponMessage.message}}/>
                            </div>
                          </div>
                        </MessageTip> : (
                          cart.messages && cart.messages.orderSummaryMsg && <MessageTip style={{marginTop: 20}}>
                          <span dangerouslySetInnerHTML={{__html: cart.messages.orderSummaryMsg}}/>
                        </MessageTip>

                        )
                      }


      	        			<div style={{marginTop: 40}}>
      	        				<div>
      	        					{intl.formatMessage({id: 'we_accept'})}
      	        				</div>
      	        				<div style={{marginTop: 10}}>
      	        					<img style={{width: '100%'}} src={getPayImage(country)}/>
      	        				</div>
      	        			</div>

      	        		</Box>
      	        	</Boxs>
                </FixedTop>
              </div>

  	        </FixedTop>

        	</div>

        </div>

      </SHOPPINGBODY>

      {
        this.state.editing && <ItemEditor editHandle={this.editHandle.bind(this)} onClose={this.itemEditClose.bind(this)} { ...this.state.editing }/>
      }

      {
        this.state.paypaling && <React.Fragment>
          <Mask/>
          <div className="paypal-loading-wrap">
            <div className="paypal-back"></div>
            <div className="paypal-loading">
            </div>
          </div>
        </React.Fragment>
      }

      {
        this.state.showLeaveImage && this.state.leaveImage && <Modal onClose={ () => {this.setState({showLeaveImage: false})} }>
          <img style={{cursor: 'pointer'}} onClick={ () => {this.setState({showLeaveImage: false})} } src={this.state.leaveImage}/>
        </Modal>
      }


      {
        this.state.successTip && <SUCCESSTIP>
          { this.state.successTip }
        </SUCCESSTIP>
      }

      {
        this.state.showDeleteConfirm && <Modal onClose={ () => {this.setState({showDeleteConfirm: false})} }>
          <Confirm yes={ this.state.itemDelete } no={ () => {this.setState({showDeleteConfirm: false})} }>
            <span><FormattedMessage id="sure_delete_item"/></span>
          </Confirm>
        </Modal>
      }


    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ShoppingCart))
