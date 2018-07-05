import React from 'react'
import styled from 'styled-components'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import Loading from '../components/msite/loading.jsx'
import Empty from '../components/msite/empty.jsx'
import {Boxs, Box, BoxClickHead, BoxBody, LineBox, BoxHead} from '../components/msite/layout.jsx'
import GroupOverseasItems from '../components/msite/group-overseas-items.jsx'
import Address from '../components/msite/address.jsx'
import {Grey, Red} from '../components/text.jsx'
import TurnTool from '../components/msite/turn-tool.jsx'
import Money from '../components/money.jsx'
import { connect } from 'react-redux'
import {fetchAll, refreshCart, selectItem, editing,
  edited, editItem, selectPay, CPF, EMAIL, getCreditCards,
  getMercadoCards, toggleCredit, setSecurityCode, setInstallments} from '../store/actions.js'
import ProductEditor from '../components/msite/product-editor.jsx'
import Mask from '../components/mask.jsx'
import _ from 'lodash'
import PayMethodList from '../components/msite/paymethod-list.jsx'
import {BigButton} from '../components/msite/buttons.jsx'
import CreditCard from '../components/msite/credit-card.jsx'
import { useMercadocard, mercadopay, usePoint, useInsurance, creditpay, paypalpay } from '../api'
import {__route_root__} from '../utils/utils.js'

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
      dispatch(getMercadoCards())
    },
    GETCREDITCARDS: () => {
      dispatch(getCreditCards())
    },
    TOGGLECREDIT: (isShow) => {
      dispatch(toggleCredit(isShow))
    },
    SETSECURITYCODE: (securityCode) => {
      dispatch(setSecurityCode(securityCode))
    },
    SETINSTALLMENTS: (installments) => {
      dispatch(setInstallments(installments))
    }
  }
}

const ShoppingCart = class extends React.Component {
  constructor (props) {
    super(props)
    this.itemSelect = this.itemSelect.bind(this)
    this.groupClick = this.groupClick.bind(this)
    this.itemEdit = this.itemEdit.bind(this)
    this.itemConfirmHandle = this.itemConfirmHandle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.sdkResponseHandler = this.sdkResponseHandler.bind(this)
  }

  componentDidMount () {
    this.props.INIT()
    Mercadopago.setPublishableKey('TEST-aa971175-51cd-4be7-8ae4-f12006ac536d')
  }

  mercadoref (c) {
    this.mercadoform = c
  }

  handleMercado (event) {

  }

  checkmercado (event) {
    event.preventDefault()
    this.mercadoform.validateAll()
    const $dommercado = document.getElementById('mercadoform')
    Mercadopago.createToken($dommercado, this.sdkResponseHandler)
  }

  checkout (event) {
    event.preventDefault()
    const { payMethod, cart, paypal } = this.props

    if (!cart.shippingDetail) {
      this.props.history.push(`${window.ctx || ''}${__route_root__}/address`)
      return
    }

    if (payMethod === '3' || payMethod === '17') {
      this.props.TOGGLECREDIT(true)
      this.props.GETCREDITCARDS()
    } else if (payMethod === '19') {
      this.props.TOGGLECREDIT(true)
      this.props.GETMERCADOCARDS()
    } else if (payMethod === '1') {
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
      })
    }
  }

  sdkResponseHandler (status, response) {
    if (status != 200 && status != 201) {
      alert('verify filled data')
    } else {
      this.setState({
        token: response.id
      })

      mercadopay({
        token: response.id
      }).then(data => data.result).then(({success, transactionId, details, solutions}) => {
        if (success) {
          window.location.href = `${window.ctx || ''}/v7/order/confirm/web/ocean?transactionId=${transactionId}`
        } else {
          alert(details + '\n' + solutions)
        }
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
      default:
        break
    }
  }

  cardSelect (card) {
    if (card.quickpayRecord.payMethod == '19') {
      useMercadocard(card.quickpayRecord.quickpayId).then(() => {
        this.props.GETMERCADOCARDS()
      })
    } else {

    }
  }

  selectPayHandle (paymethod) {
    this.props.SELECTPAY(paymethod)
  }

  itemConfirmHandle (oldId, newId, quantity) {
    this.props.EDITITEM(oldId, newId, quantity)
  }

  itemEdit (item) {
    this.props.EDITING(item)
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

  handleCredit (evt) {
    evt.preventDefault()
    const {cpf, installments} = this.props

    creditpay({payCpf: cpf, payInstallments: installments}).then(data => data.result).then(({success, transactionId, details, solutions}) => {
      if (success) {
        window.location.href = `${window.ctx || ''}/order/confirm/web/ocean?transactionId=${transactionId}`
      } else {
        alert(details + '\n' + solutions)
      }
    })
  }

  render () {
    const {cart, loading, empty, editing, isCreditShow, mercadocards, creditcards, noCard} = this.props

  	return loading ? <Loading/> : (empty ? <Empty/> : (
  		cart && <div style={{opacity: this.props.refreshing ? 0.9 : 1}}>
        <Boxs>
          {
            cart.shippingDetail && (
              <Box>
                <BoxClickHead title="Address">
                  <Grey>
                    <Link style={{color: '#222', textDecoration: 'none'}} to={`${window.ctx || ''}${__route_root__}/address`}>Edit</Link>
                  </Grey>
                </BoxClickHead>
                <BoxBody>
                  <Address address={cart.shippingDetail}/>
                </BoxBody>
              </Box>
            )
          }

    			<Box>
    				 <GroupOverseasItems quantityChange={(itemId, quantity) => { this.props.EDITITEM(itemId, itemId, quantity) }} itemEdit={this.itemEdit} groupClick={this.groupClick} itemSelect={this.itemSelect} items={cart.shoppingCartProductsByOverseas} shippingMethod={cart.shippingMethod}/>
    			</Box>

          <Box>
            <BoxClickHead title="Coupon">
              {cart.coupon ? (
                <span><Red>{cart.coupon.amount} OFF</Red> {cart.coupon.name}</span>
              ) : (
                <span>Available <Red>{cart.canUseCouponCount}</Red></span>
              )}
            </BoxClickHead>

            <LineBox style={{paddingLeft: 10, paddingRight: 10}}>
              {
                cart.shippingInsurancePrice2 && (
                  <TurnTool open={this.openInsurance.bind(this)} turnAcitve={cart.insurance}>
                    <span style={{fontSize: 15}}>Add Shipping Insurance(<Red><Money money={cart.shippingInsurancePrice2}/></Red>)</span>
                  </TurnTool>
                )
              }

              {
                cart.expectedPoints > 0 && (
                  <TurnTool open={this.openPoints.bind(this)} turnAcitve={cart.openPointUse}>
                    <span style={{fontSize: 15}}>Apply {cart.expectedPoints} (<Red><Money money={cart.expectedPointDiscount}/></Red>) To This Order?</span>
                  </TurnTool>
                )
              }
            </LineBox>
          </Box>

          <Box>
            <BoxHead title="Payment Method"/>
            <div style={{paddingLeft: 10, paddingRight: 10}}>
              <PayMethodList cpf={this.props.cpf} email={this.props.email} handleInputChange={this.handleInputChange} selectedPayId={this.props.payMethod} selectPayHandle={this.selectPayHandle.bind(this)} methods={this.props.cart.payMethodList}/>
            </div>
          </Box>

          <Box>
            <BoxHead title="Order Summary"/>
            <OrderSummary>

              {
                cart.orderSummary.display.map(display => (
                  <div key={display.value} className="x-flex __between __summary">
                    <span dangerouslySetInnerHTML={{__html: display.label}}/>
                    <span dangerouslySetInnerHTML={{__html: display.value}}/>
                  </div>
                ))
              }

            </OrderSummary>
          </Box>

          {/* <Box>
            <Link to={`${window.ctx || ''}/mercado`}>Mercado</Link>

            <div>
              <button onClick={() => {
                this.props.TOGGLECREDIT(true)
                this.props.GETMERCADOCARDS()
              }}>Credit Card</button>

            </div>
          </Box> */}

          <Box>
            <div style={{height: 90}}>
              <Checkout>
                <div className="__total">
                  <span>Total: </span>
                  <Red><Money money={cart.orderSummary.orderTotal}/></Red>
                </div>
                <BigButton onClick={this.checkout.bind(this)} className="__btn" height={47} bgColor="#e5004f">Check Out</BigButton>
              </Checkout>
            </div>
          </Box>

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
                orderTotal={cart.orderSummary.orderTotal}/>
            </React.Fragment>
          )
        }

        {
          isCreditShow && noCard && this.props.payMethod === '19' && <Redirect push to={`${window.ctx || ''}${__route_root__}/mercado`}/>
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
                handleInputChange = { this.handleInputChange }
                creditClose={() => { this.props.TOGGLECREDIT(false) }}
                installmentoptions={this.props.cart.payInstalmentsByOceanpaymentBRACreditCard}
                installments={this.props.installments}
              />
            </React.Fragment>
          )
        }

      </div>
  	))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
