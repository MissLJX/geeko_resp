import React from 'react'
import styled from 'styled-components'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import Loading from '../components/msite/loading.jsx'
import Empty from '../components/msite/empty.jsx'
import Refreshing from '../components/msite/refreshing.jsx'
import Ask from '../components/ask.jsx'
import FixedMessage from '../components/msite/fixed-message.jsx'
import {Boxs, Box, BoxClickHead, BoxBody, LineBox, BoxHead} from '../components/msite/layout.jsx'
import GroupOverseasItems from '../components/msite/group-overseas-items.jsx'
import GroupLocalItems from '../components/msite/group-local-items.jsx'
import GroupInvalidItems from '../components/msite/group-ivalid-items.jsx'
import Address from '../components/msite/address.jsx'
import {Grey, Red} from '../components/text.jsx'
import TurnTool from '../components/msite/turn-tool.jsx'
import Money from '../components/money.jsx'
import { connect } from 'react-redux'
import {fetchAll, refreshCart, selectItem, editing,
  edited, editItem, selectPay, CPF, EMAIL, getCreditCards,
  getMercadoCards, toggleCredit, setSecurityCode, setInstallments, fetchCoupons, deleteItem, deleteItems, setMercadoInstallments} from '../store/actions.js'
import ProductEditor from '../components/msite/product-editor.jsx'
import Mask from '../components/mask.jsx'
import _ from 'lodash'
import PayMethodList from '../components/msite/paymethod-list.jsx'
import {BigButton} from '../components/msite/buttons.jsx'
import CreditCard from '../components/msite/credit-card.jsx'
import { useMercadocard, mercadopay, usePoint, useInsurance, creditpay, paypalpay, usecreditcard, movetooverseas, getMessage, placepaypal, givingCoupon } from '../api'
import {__route_root__, storage} from '../utils/utils.js'
import {CountDownBlock} from '../components/msite/countdowns.jsx'
import {injectIntl} from 'react-intl'

const OrderSummary = styled.div`
  padding: 5px 10px;
  & > div.__summary{
    padding-top: 5px;
    padding-bottom: 5px;
    font{
      font-size: 16px !important;
    }
  }
`

const Checkout = styled.div`
  &>div{
    &.__total{
      font-size: 18px;
    }
    &.__btn{
      margin-top: 2px;
    }
  }
  padding: 10px;
  box-shadow: 0 -1px 4.5px rgba(136, 136, 136, 0.5);
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: #fff;
`

const Tip = styled.div`
  background-color: #fdeff5;
  padding: 10px;
  line-height: 18px;
  font-size: 12px;
  &.__fixed{
    position: fixed;
    width: 100%;
    z-index: 1;
    top: ${window.headerHeight || 0}px;
  }
`

const DoubleBtn = styled.div`
  & > div{
    width: calc(50% - 5px);
  }
`

const PaypalBtn = styled.div`
  cursor: pointer;
  border-radius: 2px;
  height: 47px;
  background-color: rgb(252, 208, 0);
  text-align: center;
  img{
    height: 37px;
    margin-top: 5px;
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
      dispatch(refreshCart(cart))
    },
    SELECT: (params) => {
      dispatch(selectItem(params))
    },
    EDITING: (item) => {
      dispatch(editing(item))
    },
    EDITED: () => {
      dispatch(edited())
    },
    EDITITEM: (oldId, newId, quantity) => {
      dispatch(editItem(oldId, newId, quantity))
    },
    SELECTPAY: (paymethod) => {
      dispatch(selectPay(paymethod))
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
    GETMERCADOCARDS: () => {
      return dispatch(getMercadoCards())
    },
    GETCREDITCARDS: (payMethod) => {
      return dispatch(getCreditCards(payMethod))
    },
    TOGGLECREDIT: (isShow) => {
      dispatch(toggleCredit(isShow))
    },
    SETSECURITYCODE: (securityCode) => {
      dispatch(setSecurityCode(securityCode))
    },
    SETINSTALLMENTS: (installments) => {
      dispatch(setInstallments(installments))
    },
    SETMERCADOINTALLMENTS: (installments) => {
      dispatch(setMercadoInstallments(installments))
    },
    FETCHCOUPONS: () => {
      dispatch(fetchCoupons())
    },
    DELETEITEM: (itemId) => {
      dispatch(deleteItem(itemId))
    },
    DELETEITEMS: (itemIds) => {
      dispatch(deleteItems(itemIds))
    }
  }
}

const SendCouponTip = styled.div`
  width: 100%;
  & > div{
    &:first-child{
    }
    &:last-child{
    }
  }
`

const ShoppingCart = class extends React.Component {
  constructor (props) {
    super(props)
    this.itemSelect = this.itemSelect.bind(this)
    this.groupClick = this.groupClick.bind(this)
    this.itemEdit = this.itemEdit.bind(this)
    this.itemConfirmHandle = this.itemConfirmHandle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.sdkResponseHandler = this.sdkResponseHandler.bind(this)
    this.scrollhandle = this.scrollhandle.bind(this)
    this.itemDelete = this.itemDelete.bind(this)
    this.clearall = this.clearall.bind(this)
    this.state = {
      creditstatus: 0,
      tipFixed: false,
      showAsk: false,
      askMessage: '',
      paypaling: false,
      checking: false
    }
  }

  componentDidMount () {
    this.props.INIT()
    this.props.FETCHCOUPONS()

    Mercadopago.setPublishableKey(MercadoPublicKey)

    window.addEventListener('scroll', this.scrollhandle, false)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollhandle, false)
  }

  scrollhandle (evt) {
    // let [scrollTop, documentHeight, windowHeight] = [
    //   document.documentElement.scrollTop || document.body.scrollTop,
    //   document.body.clientHeight,
    //   window.screen.height
    // ]

    const headerHeight = window.headerHeight || 0

    if (this.fixedTip && this.fixedTipWrapper) {
      const {clientHeight} = this.fixedTip
      this.fixedTipWrapper.style.height = clientHeight + 'px'
      const rect = this.fixedTipWrapper.getBoundingClientRect()
      if (rect.top < headerHeight) {
        this.fixedTip.classList.add('__fixed')
      } else {
        this.fixedTip.classList.remove('__fixed')
      }
    }
  }

  mercadoref (c) {
    this.mercadoform = c
  }

  handleMercado (event) {

  }

  checkmercado (event) {
    event.preventDefault()
    this.setState({
      checking: true
    })
    Mercadopago.clearSession()
    this.mercadoform.validateAll()

    if (!this.props.securityCode) {
      this.setState({
        checking: false
      })
      return
    }

    const $dommercado = document.getElementById('mercadoform')
    Mercadopago.createToken($dommercado, this.sdkResponseHandler)
  }

  checkout (event) {
    event.preventDefault()
    const { payMethod, cart, paypal, payType } = this.props

    if (!payType) {
      window.scrollTop = window.scrollHeight
      return
    }

    if (!cart.shippingDetail) {
      this.props.history.push(`${window.ctx || ''}${__route_root__}/address`)
      return
    }

    if (payType === '2' || payMethod === '17') {
      this.props.TOGGLECREDIT(true)
      this.setState({
        checking: true
      })
      this.props.GETCREDITCARDS(payMethod).then((cards) => {
        if (!cards || cards.length < 1) {
          this.props.history.push(`${window.ctx || ''}${__route_root__}/credit-card`)
        }
        this.setState({
          checking: true
        })
      }).catch(() => {
        this.setState({
          checking: false
        })
      })
    } else if (payType === '7') {
      this.props.TOGGLECREDIT(true)
      this.setState({
        checking: true
      })
      this.props.GETMERCADOCARDS().then((cards) => {
        if (!cards || cards.length < 1) {
          this.props.history.push(`${window.ctx || ''}${__route_root__}/mercado`)
        }
        this.setState({
          checking: false
        })
      }).catch(() => {
        this.setState({
          checking: false
        })
      })
    } else if (payType === '1') {
      this.setState({
        paypaling: true
      })
      paypalpay('normal').then(data => data.result).then(({TOKEN, success, transactionId, ACK, L_LONGMESSAGE0}) => {
        if (success && transactionId && !TOKEN) {
          window.location.href = `${window.ctx || ''}/v7/order/confirm/free?transationId=${transactionId}`
          return
        }
        if (ACK === 'Failure') {
          alert(L_LONGMESSAGE0)
          return
        }

        if (TOKEN && paypal) {
          window.location.href = paypal + TOKEN
        }
      }).catch(({result}) => {
        this.setState({
          paypaling: false
        })
        alert(result)
      })
    } else if (payType === '5') {
      const {cpf, email} = this.props

      if (!this.boleto.context._errors || !this.boleto.context._errors.length) {
        window.location.href = `${window.ctx || ''}/geekopay/pay?cpf=${cpf}&email=${email}&payMethod=${payMethod}`
      }
    } else if (payType === '3') {
      window.location.href = `${window.ctx || ''}/computoppay/pay?payMethod=${payMethod}`
    }
    if (this.getCountdown(this.props.cart) > 0) {
      givingCoupon()
    }
  }

  quickPaypal (evt) {
    evt.preventDefault()
    const { cart, paypal } = this.props
    this.setState({
      paypaling: true
    })

    paypalpay('quick').then(data => data.result).then(({TOKEN, ACK, L_LONGMESSAGE0}) => {
      if (ACK === 'Failure') {
        alert(L_LONGMESSAGE0)
        return
      }

      if (TOKEN && paypal) {
        window.location.href = paypal.replace('&useraction=commit', '') + TOKEN
      }
    }).catch(({result}) => {
      this.setState({
        paypaling: false
      })
      alert(result)
    })

    if (this.getCountdown(this.props.cart) > 0) {
      givingCoupon()
    }
  }

  quickPlace (evt) {
    const { cart, paypal } = this.props

    this.setState({
      paypaling: true
    })

    if (!cart.shippingDetail) {
      this.props.history.push(`${window.ctx || ''}${__route_root__}/address`)
    }

    placepaypal().then(() => {
      window.location.href = `${window.ctx || ''}/v7/orderConfirm/anon/order-confirm`
    }).catch(({result}) => {
      this.setState({
        paypaling: false
      })
      alert(result)
    })

    // self.webpaypay(function(){
    //       window.location.href = ctx + "/v7/orderConfirm/anon/order-confirm";
    //     });
  }

  sdkResponseHandler (status, response) {
    if (status != 200 && status != 201) {
      alert('verify filled data')
    } else {
      this.setState({
        token: response.id
      })

      mercadopay({
        token: response.id,
        installments: this.props.mercadoinstallments
      }).then(data => data.result).then(({success, transactionId, details, solutions}) => {
        if (success) {
          window.location.href = `${window.ctx || ''}/v7/order/confirm/web/ocean?transactionId=${transactionId}`
        } else {
          alert(details + '\n' + solutions)
        }
        this.setState({
          checking: false
        })
      }).catch(({result}) => {
        alert(result)
        this.setState({
          checking: false
        })
      })
    }
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

  overseasHandle (variantId) {
    movetooverseas({variantId}).then(({result}) => {
      this.props.REFRESHCART(result)
    })
  }

  cardSelect (card) {
    if (card.quickpayRecord.payMethod == '19') {
      useMercadocard(card.quickpayRecord.quickpayId).then(() => {
        this.props.GETMERCADOCARDS()
      })
    } else {
      usecreditcard(card.quickpayRecord.id).then(() => {
        this.props.GETCREDITCARDS(card.quickpayRecord.payMethod)
      })
    }
  }

  selectPayHandle (paymethod) {
    this.props.SELECTPAY(paymethod)
    storage.add('payMethod', paymethod.id, 365 * 24 * 60 * 60)
    storage.add('payType', paymethod.type, 365 * 24 * 60 * 60)
  }

  itemConfirmHandle (oldId, newId, quantity) {
    this.props.EDITITEM(oldId, newId, quantity)
  }

  itemEdit (item) {
    this.props.EDITING(item)
  }

  itemDelete (item) {
    if (window.confirm('Are you sure delete this item?')) {
      this.props.DELETEITEM(item.variantId)
    }
  }

  clearall () {
    const {cart} = this.props
    const ivalidItems = this.getInvalidItems(cart)
    const itemIds = (ivalidItems || []).map(item => item.variantId)

    this.props.DELETEITEMS(itemIds.join(','))
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

  openPoints () {
    usePoint(!this.props.cart.openPointUse).then(data => data.result).then((cart) => {
      this.props.REFRESHCART(cart)
    })
  }

  openInsurance () {
    useInsurance(!this.props.cart.insurance).then(data => data.result).then(cart => {
      this.props.REFRESHCART(cart)
    })
  }

  insuranceClickHandle () {
    const {shippingInsuranceMsg2} = this.props.cart
    this.setState({
      showAsk: true,
      askMessage: shippingInsuranceMsg2
    })
  }

  creditClickHandle () {
    getMessage('M1136').then(({result}) => {
      this.setState({
        showAsk: true,
        askMessage: result.message
      })
    })
  }

  handleCredit (evt) {
    evt.preventDefault()
    this.setState({
      checking: true
    })
    const {cpf, installments} = this.props
    if (this.props.payMethod === '17') {
      if (!this.brazilref.context._errors || !this.brazilref.context._errors.length) {
        this.payCredit({payCpf: cpf, payInstallments: installments})
      }
    } else {
      this.payCredit({})
    }
  }

  payCredit (params) {
    creditpay(params).then(data => data.result).then(({success, transactionId, details, solutions}) => {
      if (success) {
        window.location.href = `${window.ctx || ''}/v7/order/confirm/web/ocean?transactionId=${transactionId}`
      } else {
        alert(details + '\n' + solutions)
      }
      this.setState({
        checking: false
      })
    }).catch(({result}) => {
      alert(result)
      this.setState({
        checking: false
      })
    })
  }

  addMercadoCard (evt) {
    evt.preventDefault()
    const path = {
      pathname: `${window.ctx || ''}${__route_root__}/mercado`,
      state: {
        exsiting: true
      }
    }
    this.props.history.push(path)
  }

  addCreditCard (evt) {
    evt.preventDefault()
    const path = {
      pathname: `${window.ctx || ''}${__route_root__}/credit-card`,
      state: {
        exsiting: true
      }
    }
    this.props.history.push(path)
  }

  getValidItems (items = []) {
    return items.filter(item => item.status === '1')
  }

  getInvalidItems ({shoppingCartProductsByOverseas, domesticDeliveryCases}) {
    const invalidItems = []
    if (shoppingCartProductsByOverseas) {
      _.each(shoppingCartProductsByOverseas, (item) => {
        if (item.status !== '1') invalidItems.push(item)
      })
    }

    if (domesticDeliveryCases) {
      _.each(domesticDeliveryCases, ({shoppingCartProducts}) => {
        _.each(shoppingCartProducts, (item) => {
          if (item.status !== '1') invalidItems.push(item)
        })
      })
    }
    return invalidItems
  }

  getCountdown (cart) {
    const {sendCouponMessage} = cart || {sendCouponMessage: null}
    let couponcountdown = 0
    if (sendCouponMessage) {
      // 设置15分钟后的毫秒数
      let endcounpontime = storage.get('_end_coupon_time')
      if (!endcounpontime) {
        endcounpontime = new Date().getTime() + 15 * 60 * 1000
        storage.add('_end_coupon_time', endcounpontime)
      }
      couponcountdown = Number(endcounpontime) - new Date().getTime()
    }
    return couponcountdown
  }

  render () {
    const {cart, loading, empty, editing, isCreditShow, mercadocards, creditcards, noCard, intl, noCreditCard} = this.props
    const invalidItems = cart ? this.getInvalidItems(cart) : []

    const {sendCouponMessage} = cart || {sendCouponMessage: null}
    let couponcountdown = this.getCountdown(cart)

    let cancheckout = false
    if (cart) {
      let cancheckout1 = cart.shoppingCartProductsByOverseas && cart.shoppingCartProductsByOverseas.find(item => item.selected)
      let cancheckout2 = false
      if (cart.domesticDeliveryCases) {
        _.each(cart.domesticDeliveryCases, demestic => {
          _.each(demestic.shoppingCartProducts, item => {
            if (item.selected) {
              cancheckout2 = true
              return false
            }
          })
        })
      }

      cancheckout = cancheckout1 || cancheckout2
    }

    return loading ? <Loading/> : (empty ? <Empty/> : (
      cart && (
        <div style={{opacity: this.props.refreshing ? 0.9 : 1}}>
          {this.props.refreshing && <Refreshing/>}

          <div ref={wrapper => { this.fixedTipWrapper = wrapper }}>

            {
              couponcountdown > 1000 ? (
                <Tip innerRef={tip => { this.fixedTip = tip }}>
                  <div className="x-table __fixed x-fw __vm">
                    <div className="x-cell" style={{width: 75}}>
                      <CountDownBlock offset={couponcountdown}/>
                    </div>
                    <div className="x-cell">
                      <span dangerouslySetInnerHTML={{__html: sendCouponMessage.message}}/>
                    </div>
                  </div>
                </Tip>
              ) : (
                <React.Fragment>
                  {cart.messages && cart.messages.orderSummaryMsg && <Tip className={this.state.tipFixed ? '__fixed' : ''} innerRef={tip => { this.fixedTip = tip }}>
                    <span dangerouslySetInnerHTML={{__html: cart.messages.orderSummaryMsg}}/>
                  </Tip>}
                </React.Fragment>
              )
            }

          </div>

          <Boxs>
            {
              cart.shippingDetail ? (
                window.__is_login__ && <Box>
                  <BoxClickHead title={intl.formatMessage({id: 'address'})}>
                    <Grey>
                      <Link style={{color: '#222', textDecoration: 'none'}} to={`${window.ctx || ''}${__route_root__}/address`}>
                        {intl.formatMessage({id: 'edit'})}
                      </Link>
                    </Grey>
                  </BoxClickHead>
                  <BoxBody>
                    <Address address={cart.shippingDetail}/>
                  </BoxBody>
                </Box>
              ) : (
                window.__is_login__ && <Box>
                  <BoxClickHead title={intl.formatMessage({id: 'address'})} single={true}>
                    <Grey>
                      <Link style={{color: '#222', textDecoration: 'none'}} to={`${window.ctx || ''}${__route_root__}/address`}>
                                                Add
                      </Link>
                    </Grey>
                  </BoxClickHead>
                </Box>
              )
            }

            {
              cart.domesticDeliveryCases && cart.domesticDeliveryCases.length > 0 && cart.domesticDeliveryCases.map(domestic => (
                <Box key={domestic.countryCode}>
                  <GroupLocalItems
                    icon={domestic.icon}
                    title={domestic.title}
                    quantityChange={(itemId, quantity) => { this.props.EDITITEM(itemId, itemId, quantity) }}
                    itemEdit={this.itemEdit}
                    itemDelete={this.itemDelete}
                    groupClick={this.groupClick}
                    itemSelect={this.itemSelect}
                    overseasHandle={this.overseasHandle.bind(this)}
                    serverTime={cart.serverTime}
                    items={this.getValidItems(domestic.shoppingCartProducts)}/>
                </Box>
              ))
            }
            {
              cart.shoppingCartProductsByOverseas && cart.shoppingCartProductsByOverseas.length > 0 && (
                <Box>
                  <GroupOverseasItems
                    quantityChange={(itemId, quantity) => { this.props.EDITITEM(itemId, itemId, quantity) }}
                    itemEdit={this.itemEdit}
                    itemDelete={this.itemDelete}
                    groupClick={this.groupClick}
                    itemSelect={this.itemSelect}
                    items={this.getValidItems(cart.shoppingCartProductsByOverseas)}
                    shippingMethod={cart.shippingMethod}
                    serverTime={cart.serverTime}
                    shippingMsg={cart.messages ? cart.messages.shippingMsg : null}/>
                </Box>
              )
            }

            {
              invalidItems && invalidItems.length > 0 && <Box>
                <GroupInvalidItems serverTime={cart.serverTime}
                  items={this.getInvalidItems(cart)}
                  clearall={this.clearall}
                  itemDelete={this.itemDelete}/>
              </Box>
            }

            <Box>
              <BoxClickHead title={intl.formatMessage({id: 'coupon'})}>
                <Link style={{textDecoration: 'none', color: '#666'}} to={`${window.ctx || ''}${__route_root__}/coupons`}>

                  {cart.coupon ? (
                    <span><Red>{cart.coupon.amount} OFF</Red> {cart.coupon.name}</span>
                  ) : (
                    <span>Available <Red>{cart.canUseCouponCount}</Red></span>
                  )}
                </Link>
              </BoxClickHead>

              {
                cart.messages && cart.messages.couponMsg && <Tip>
                  <span dangerouslySetInnerHTML={{__html: cart.messages.couponMsg}}/>
                </Tip>
              }

              <LineBox style={{paddingLeft: 10, paddingRight: 10}}>
                {
                  cart.shippingInsurancePrice2 && (
                    <TurnTool ignoreButton={cart.isShippingInsuranceMust} open={this.openInsurance.bind(this)} turnAcitve={cart.insurance}>
                      <span style={{fontSize: 15}}>Add Shipping Insurance(<Red><Money money={cart.shippingInsurancePrice2}/></Red>)</span>
                      <Ask style={{marginLeft: 4}} onClick={this.insuranceClickHandle.bind(this)}/>
                    </TurnTool>
                  )
                }

                {
                  cart.expectedPoints > 0 && (
                    <TurnTool open={this.openPoints.bind(this)} turnAcitve={cart.openPointUse}>
                      <span style={{fontSize: 15}}>{intl.formatMessage({id: 'apply'})} {cart.expectedPoints} (<Red><Money money={cart.expectedPointDiscount}/></Red>) {intl.formatMessage({id: 'to_this_order'})}</span>
                      <Ask style={{marginLeft: 4}} onClick={this.creditClickHandle.bind(this)}/>
                    </TurnTool>
                  )
                }
              </LineBox>
            </Box>

            {
              window.__is_login__ && (
                <Box>
                  <BoxHead title={intl.formatMessage({id: 'payment_method'})}/>
                  <div style={{paddingLeft: 10, paddingRight: 10}}>
                    <PayMethodList boleto={(c) => { this.boleto = c }} cpf={this.props.cpf} email={this.props.email} handleInputChange={this.handleInputChange} selectedPayId={this.props.payMethod} selectPayHandle={this.selectPayHandle.bind(this)} methods={this.props.cart.payMethodList}/>
                  </div>
                </Box>
              )
            }

            <Box>
              <BoxHead title={intl.formatMessage({id: 'order_summary'})}/>
              <OrderSummary>

                {
                  cart.orderSummary.display.map(display => (
                    <div key={display.label} className="x-flex __between __summary">
                      <span dangerouslySetInnerHTML={{__html: display.label}}/>
                      <span dangerouslySetInnerHTML={{__html: display.value}}/>
                    </div>
                  ))
                }

              </OrderSummary>
            </Box>

            {
              window.__is_login__ ? (
                <Box>
                  <div style={{height: 90}}>
                    <Checkout>
                      <div className="__total">
                        <span>{intl.formatMessage({id: 'total'})}: </span>
                        <Red><Money money={cart.orderSummary.orderTotal}/></Red>
                      </div>

                      {
                        cancheckout ? (
                          !this.state.checking ? <BigButton onClick={this.checkout.bind(this)} className="__btn" height={47} bgColor="#e5004f">
                            {intl.formatMessage({id: 'check_out'})}
                          </BigButton> : <BigButton onClick={this.checkout.bind(this)} className="__btn" height={47} bgColor="#999">
                            Please Wait
                          </BigButton>
                        ) : (
                          <BigButton className="__btn" height={47} bgColor="#999">
                            {intl.formatMessage({id: 'check_out'})}
                          </BigButton>
                        )
                      }

                    </Checkout>
                  </div>
                </Box>
              ) : (
                window.token ? (
                  <Box>
                    <div style={{height: 90}}>
                      <Checkout>
                        <div className="__total">
                          <span>{intl.formatMessage({id: 'total'})}: </span>
                          <Red><Money money={cart.orderSummary.orderTotal}/></Red>
                        </div>

                        {
                          cancheckout ? (
                            <BigButton onClick={this.quickPlace.bind(this)} className="__btn" height={47} bgColor="#e5004f">
                                Place Order
                            </BigButton>
                          ) : (
                            <BigButton className="__btn" height={47} bgColor="#ddd">
                              {intl.formatMessage({id: 'check_out'})}
                            </BigButton>
                          )
                        }
                      </Checkout>
                    </div>
                  </Box>
                ) : (
                  <Box>
                    <div style={{height: 90}}>
                      <Checkout>
                        <div className="__total">
                          <span>{intl.formatMessage({id: 'total'})}: </span>
                          <Red><Money money={cart.orderSummary.orderTotal}/></Red>
                        </div>
                        <DoubleBtn className="x-flex __between">
                          <div>
                            <PaypalBtn onClick={this.quickPaypal.bind(this)}><img src={cart.paypalButtonImage}/></PaypalBtn>
                          </div>
                          <div>
                            <BigButton onClick={ () => { window.location.href = `${window.ctx}/w-site/anon/register?redirectUrl=${encodeURIComponent(window.location.href)}` } } className="__btn" height={47} bgColor="#e5004f">
                              {intl.formatMessage({id: 'check_out'})}
                            </BigButton>
                          </div>
                        </DoubleBtn>
                      </Checkout>
                    </div>
                  </Box>
                )
              )
            }

          </Boxs>

          {
            editing.isEditing && (
              <React.Fragment>
                <Mask/>
                <ProductEditor onClose={() => { this.props.EDITED() }} itemConfirmHandle={this.itemConfirmHandle} item={editing.item}/>
              </React.Fragment>
            )
          }

          {
            isCreditShow && this.props.payMethod === '19' && mercadocards && mercadocards.length && (
              <React.Fragment>
                <Mask/>
                <CreditCard
                  payMethod = {this.props.payMethod}
                  securityCode = {this.props.securityCode}
                  handleMercado = {this.checkmercado.bind(this)}
                  mercadoref = {this.mercadoref.bind(this)}
                  handleInputChange = { this.handleInputChange }
                  creditClose={() => { this.props.TOGGLECREDIT(false) }}
                  cardSelect={ this.cardSelect.bind(this)}
                  cards={mercadocards}
                  addCard={this.addMercadoCard.bind(this)}
                  status = {this.state.creditstatus}
                  orderTotal={cart.orderSummary.orderTotal}
                  installments={this.props.mercadoinstallments}
                  checking={this.state.checking}
                  toggleBack= {() => {
                    this.setState({
                      creditstatus: this.state.creditstatus === 0 ? 1 : 0
                    })
                  }}
                />
              </React.Fragment>
            )
          }

          {
            isCreditShow && (this.props.payMethod === '3' || this.props.payMethod === '17') && creditcards && creditcards.length && (
              <React.Fragment>
                <Mask/>
                <CreditCard
                  cards={creditcards}
                  payMethod = {this.props.payMethod}
                  orderTotal={cart.orderSummary.orderTotal}
                  cpf={this.props.cpf}
                  handleCredit = {this.handleCredit.bind(this)}
                  brazilref = {(c) => { this.brazilref = c }}
                  handleInputChange = { this.handleInputChange }
                  creditClose={() => { this.props.TOGGLECREDIT(false) }}
                  installmentoptions={this.props.cart.payInstalmentsByOceanpaymentBRACreditCard || []}
                  installments={this.props.installments}
                  addCard={this.addCreditCard.bind(this)}
                  cardSelect={ this.cardSelect.bind(this)}
                  status = {this.state.creditstatus}
                  checking={this.state.checking}
                  toggleBack= {() => {
                    this.setState({
                      creditstatus: this.state.creditstatus === 0 ? 1 : 0
                    })
                  }}
                />
              </React.Fragment>
            )
          }

          {
            this.state.showAsk && this.state.askMessage && (
              <React.Fragment>
                <Mask/>
                <FixedMessage onClose={() => { this.setState({showAsk: false, askMessage: null}) }}>
                  <p dangerouslySetInnerHTML={{__html: this.state.askMessage}}/>
                </FixedMessage>
              </React.Fragment>
            )
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

        </div>)
    ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ShoppingCart))
