import React from 'react'
import styled from 'styled-components'
import {Switch, Route, Link} from 'react-router-dom'
import Loading from '../components/msite/loading.jsx'
import Empty from '../components/msite/empty.jsx'
import {Boxs, Box, BoxClickHead, BoxBody, LineBox, BoxHead} from '../components/msite/layout.jsx'
import GroupOverseasItems from '../components/msite/group-overseas-items.jsx'
import Address from '../components/msite/address.jsx'
import {Grey, Red} from '../components/text.jsx'
import TurnTool from '../components/msite/turn-tool.jsx'
import Money from '../components/money.jsx'
import { connect } from 'react-redux'
import {fetchAll, selectItem, editing, edited, editItem, selectPay, CPF, EMAIL, getMercadoCards, toggleCredit} from '../store/actions.js'
import ProductEditor from '../components/msite/product-editor.jsx'
import Mask from '../components/mask.jsx'
import _ from 'lodash'
import PayMethodList from '../components/msite/paymethod-list.jsx'
import {BigButton} from '../components/msite/buttons.jsx'
import CreditCard from '../components/msite/credit-card.jsx'

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
    TOGGLECREDIT: (isShow) => {
      dispatch(toggleCredit(isShow))
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
  }

  componentDidMount () {
    this.props.INIT()
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
      default:
        break
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

  render () {
    const {cart, loading, empty, editing, isCreditShow, mercadocards} = this.props

  	return loading ? <Loading/> : (empty ? <Empty/> : (
  		cart && <div>
        <Boxs>
          {
            cart.shippingDetail && (
              <Box>
                <BoxClickHead title="Address">
                  <Grey>
                    <Link style={{color: '#222', textDecoration: 'none'}} to={`${window.ctx || ''}/address`}>Edit</Link>
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
                  <TurnTool turnAcitve={cart.insurance}>
                    <span style={{fontSize: 15}}>Add Shipping Insurance(<Red><Money money={cart.shippingInsurancePrice2}/></Red>)</span>
                  </TurnTool>
                )
              }

              {
                cart.expectedPoints && (
                  <TurnTool turnAcitve={cart.openPointUse}>
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
            <Link to={`${window.ctx || ''}/mercado`}>Mercado</Link>

            <div>
              <button onClick={() => {
                this.props.TOGGLECREDIT(true)
                this.props.GETMERCADOCARDS()
              }}>Credit Card</button>

            </div>
          </Box>

          <Box>
            <div style={{height: 90}}>
              <Checkout>
                <div className="__total">
                  <span>Total: </span>
                  <Red><Money money={cart.orderSummary.orderTotal}/></Red>
                </div>
                <BigButton className="__btn" height={47} bgColor="#e5004f">Check Out</BigButton>
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
          isCreditShow && mercadocards && (
            <React.Fragment>
              <Mask/>
              <CreditCard cards={mercadocards} orderTotal={cart.orderSummary.orderTotal}/>
            </React.Fragment>
          )
        }

      </div>
  	))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
