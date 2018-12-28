import React from 'react'
import styled from 'styled-components'
import {injectIntl, FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {__route_root__} from '../utils/utils.js'
import Empty from '../components/pc/empty.jsx'

import OrderSummary from '../components/pc/order-summary.jsx'
import Confirm from '../components/pc/confirm.jsx'

import Loading from '../components/msite/loading.jsx'
import Refreshing from '../components/msite/refreshing.jsx'
import {Boxs, Box} from '../components/pc/layouts.jsx'
import {Modal} from '../components/pc/modal.jsx'

import {OrderAddress} from '../components/pc/address.jsx'
import Icon from '../components/icon.jsx'
import CardList from '../components/pc/card-list.jsx'

import { BigButton } from '../components/msite/buttons.jsx'

import MercadoBinding from '../components/pc/mercado-binding.jsx'

import {submit} from '../utils/common-pay.js'

import {
  checkout,
  checkout_updatepaymethod,
  checkout_getparams,
  checkout_pay,
  checkout_credit,
  checkout_paypal,
  useMercadocard
} from '../api'

import {
  setSecurityCode,
  setInstallments,
  setMercadoInstallments,
  setAtmMethod,
  setTicketMethod,
  SELECT_PAY,
  fetchCheckout,
  getCreditCards,
  getMercadoCards,
  toggleCredit,
  toggleCreditStatus,
  fetchPaypalUrl,
  fetchMe
} from '../store/actions.js'

const __Frame__ = {
  '17': {
  	url: `${window.ctx || ''}/w-site/anon/oceanpay?payMethod=17`,
  	height: 480
  },
  '3': {
  	url: `${window.ctx || ''}/w-site/anon/oceanpay?payMethod=3`,
  	height: 480
  }
}

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

const CREDITBTN = styled.div`
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

const CREDITMODAL = styled.div`
	  width: 860px;
    background-color: #fff;
    padding: 40px 20px;

    .__title{
    	font-family: HelveticaNeue-Medium;
			font-size: 24px;
			color: #222;
    }

    .__frame{
    	width: 100%;
    	margin-top: 15px;
    }
    position: relative;
    .__loading{
  		position: absolute;
  		top: 50%;
  		left: 50%;
  		transform: translate(-50%, -50%);
  	}
`

const MERCADOMODAL = styled.div`
	width: 640px;
  background-color: #fff;
  padding: 60px 80px 60px 80px;

  .__title{
  	font-family: HelveticaNeue-Medium;
		font-size: 24px;
		color: #222;
  }
`

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GETME: () => {
      return dispatch(fetchMe())
    },
    GETCHECKOUT: (orderId) => {
      return dispatch(fetchCheckout(orderId))
    },
    GETCREDITCARDS: (payMethod, multi) => {
      return dispatch(getCreditCards(payMethod, multi))
    },
    GETMERCADOCARDS: () => {
      return dispatch(getMercadoCards())
    },
    SETMERCADOINTALLMENTS: (installments) => {
      dispatch(setMercadoInstallments(installments))
    },
    SETSECURITYCODE: (securityCode) => {
      dispatch(setSecurityCode(securityCode))
    }
  }
}

const Credit = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    	showFrame: false,
    	frameUrl: __Frame__[this.props.payMethod] ? __Frame__[this.props.payMethod].url : null,
    	frameLoading: true,
    	showMercado: false,
      noCard: false,
      checking: false,
      refreshing: false,
      showDeleteConfirm: false,
      cardDelete: null
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.sdkResponseHandler = this.sdkResponseHandler.bind(this)
  }

  componentWillMount () {
    const { checkout, GETCREDITCARDS, GETMERCADOCARDS, cpf, installments } = this.props
    const { orderId } = this.props.match.params
    if (!checkout) {
      this.props.GETME()
      this.props.GETCHECKOUT(orderId).then(() => {
        this.handleCreditCards()
      })
    } else {
      this.handleCreditCards()
    }

    window.triggerPlace = () => {
      this.payCredit({payCpf: cpf, payInstallments: installments})
    }

    window.triggerFalse = (errcode) => {
      this.setState({
        frameUrl: this.state.frameUrl + '&_=' + new Date().getTime()
      })
    }

    setTimeout(() => {
      this.setState({
        frameLoading: false
      })
    }, 5000)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    switch (name) {
      case 'securityCode':
        this.props.SETSECURITYCODE(value)
        break
      case 'mercado-installments':
        this.props.SETMERCADOINTALLMENTS(value)
      default:
        break
    }
  }

  mercadoref (c) {
    this.mercadoform = c
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

  sdkResponseHandler (status, response) {
    const { checkout } = this.props
    if (status != 200 && status != 201) {
      alert('verify filled data')
    } else {
      this.setState({
        token: response.id
      })

      this.payMercado({
        orderId: checkout.orderId,
        token: response.id,
        installments: this.props.mercadoinstallments
      }).then(() => {
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

  getApacPay (payMethod, cpf, fail) {
    getApacPay({payMethod, cpfNumber: cpf}).then(({result}) => {
      const {isFree, transactionId} = result
      if (isFree) {
        window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
      } else {
        submit(result)
      }
    }).catch(({result}) => {
      fail(result)
    })
  }

  showFrameHandle () {
    const { checkout } = this.props
    const { payMethod, orderId } = checkout
    if (payMethod === '18' || payMethod === '22') {
      this.setState({
        checking: true
      })

      this.checkparams({
        orderId
      }).catch(({result}) => {
        this.setState({
          checking: false
        })
        alert(result)
      })
    } else {
      this.setState({
        frameLoading: !this.state.showFrame,
        showFrame: !this.state.showFrame,
        frameUrl: __Frame__[payMethod].url
      })

      setTimeout(() => {
        this.setState({
          frameLoading: false
        })
      }, 5000)
    }
  }

  frameLoadHandle () {
  	this.setState({
  		frameLoading: false
  	})
  }

  showMercadoHandle () {
  	this.setState({
  		showMercado: !this.state.showMercado
  	})
  }

  checkout (evt) {
    const {checkout, installments} = this.props
    if (checkout.payMethod === '19') {
      this.checkmercado(evt)
    } else {
      this.payCredit({orderId: checkout.orderId, payInstallments: installments})
    }
  }

  payCredit (params) {
    this.setState({
      checking: true
    })
    checkout_credit(params).then(data => data.result).then(({success, transactionId, details, solutions}) => {
      if (success) {
        window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
      } else {
        alert(details + '\n' + solutions)
        this.setState({
          checking: false,
          frameUrl: this.state.frameUrl + '&_=' + new Date().getTime()
        })
      }
    }).catch(({result}) => {
      alert(result)
      this.setState({
        checking: false,
        frameUrl: this.state.frameUrl + '&_=' + new Date().getTime()
      })
    })
  }

  addcardback () {}

  handleCreditCards () {
    const { checkout, GETCREDITCARDS, GETMERCADOCARDS } = this.props
    const { payMethod } = checkout

    const getCards = payMethod === '19' ? GETMERCADOCARDS : GETCREDITCARDS

    return getCards(payMethod).then(cards => {
      switch (payMethod) {
        case '18':
        case '22':
          if (!cards || !cards.length) {
            this.props.history.replace(`${window.ctx || ''}/checkout/${this.props.checkout.orderId}`)
          }
          return cards
        default:
          if (!cards || !cards.length) {
            this.setState({
              noCard: true
            })
          }
          return cards
      }
    })
  }

  deleteCardHandle (evt, card) {
    evt.preventDefault()
    evt.nativeEvent.stopImmediatePropagation()
    const deletor = card.quickpayRecord.payMethod === '19' ? removeMercadoCard : deletecreditcard
    const cardId = card.quickpayRecord.payMethod === '19' ? card.quickpayRecord.quickpayId : card.quickpayRecord.id
    const { payMethod } = this.props
    this.setState({
      showDeleteConfirm: true,
      cardDelete: () => {
        this.setState({
          showDeleteConfirm: false,
          refreshing: true
        })

        deletor(cardId).then(() => {
          this.handleCreditCards().then((cards) => {
            this.setState({
              refreshing: false
            })
          })
        })
      }
    })
  }

  selectCardHandle (evt, card) {
    this.setState({
      refreshing: true
    })
    const useor = card.quickpayRecord.payMethod === '19' ? useMercadocard : usecreditcard
    const cardId = card.quickpayRecord.payMethod === '19' ? card.quickpayRecord.quickpayId : card.quickpayRecord.id

    useor(cardId).then(() => {
      this.handleCreditCards().then(() => {
        this.setState({
          refreshing: false
        })
      })
    })
  }

  checkpay (params) {
    return checkout_pay(params).then(({result}) => {
      const {transactionId, success, details} = result
      if (success) {
        window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
      } else {
        alert(details)
      }
      return result
    })
  }

  checkparams (params) {
    return checkout_getparams(params).then(({result}) => {
      const {isFree, transactionId} = result
      if (isFree) {
        window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
      } else {
        submit(result)
      }
    })
  }

  payMercado (params) {
    const { orderId } = this.props.checkout
    return this.checkpay({
      orderId,
      ...params
    })
  }

  render () {
    // alert('fuck')
  	const { intl, checkout, creditcards, mercadocards} = this.props

    let cards, payMethod
    if (checkout) {
      payMethod = checkout.payMethod
      cards = payMethod === '19' ? mercadocards : creditcards
    }

  	return <div>
      {
        checkout && <div>
          {(this.props.refreshing || this.state.refreshing) && <Refreshing/>}
          <SHOPPINGBODY>
            <div className="__left">
              <div>
                <Link to={`${window.ctx || ''}/checkout/${checkout.orderId}`} style={{textDecoration: 'none', color: '#222'}}>
                  ◀ {intl.formatMessage({id: 'back_to_cart'})}
                </Link>
                <div style={{marginTop: 10}}>
                  <OrderAddress address={checkout.shippingDetail}/>
                </div>
                <div style={{marginTop: 50}}>
                  <div style={{borderBottom: 'solid 1px #e6e6e6', paddingBottom: 10}}>
                    <div style={{fontFamily: 'HelveticaNeue-Medium', fontSize: 18}}>
                      {intl.formatMessage({id: 'card_information'})}
                    </div>
                    <div style={{marginTop: 5}}>
                      <Icon style={{fontSize: 20, marginRight: 5, verticalAlign: 'middle', color: '#57b936'}}>&#xe745;</Icon>
                      <span style={{verticalAlign: 'middle'}}>{intl.formatMessage({id: 'guarantee'})}</span>
                    </div>
                  </div>
                  {
                    this.state.noCard ? <div>

                      {
                        payMethod === '19' ? <div style={{width: 500, paddingTop: 10}}>
                          <img style={{display: 'block', marginBottom: 10}} src="https://dgzfssf1la12s.cloudfront.net/shoppingcart/maxicocard.png"/>
                          <MercadoBinding orderTotal={checkout.orderTotal} pay={this.payMercado.bind(this)} email={this.props.me ? this.props.me.email : ''}/>
                        </div> : <div style={{position: 'relative'}}>
                          {
                            this.state.frameLoading && <div style={{textAlign: 'center', paddingTop: 40}} className="__loading">
                              <img alt="loading" src="https://dgzfssf1la12s.cloudfront.net/site/upgrade/20180316/loading.gif"/>
                            </div>
                          }
                          <iframe onLoad={ this.frameLoadHandle.bind(this) } style={{height: __Frame__[ this.props.payMethod ].height, width: '100%'}} src={this.state.frameUrl}/>
                        </div>

                      }

                    </div> : <div>
                      <CardList cards={ cards }
                        orderTotal={checkout.orderTotal}
                        installments={this.props.mercadoinstallments}
                        securityCode = {this.props.securityCode}
                        mercadoref = {this.mercadoref.bind(this)}
                        handleInputChange = { this.handleInputChange }
                        deleteCardHandle = { this.deleteCardHandle.bind(this) }
                        selectCardHandle = { this.selectCardHandle.bind(this) }
                      />

                      { this.state.checking ? <CREDITBTN style={{marginTop: 15}}>{intl.formatMessage({id: 'please_wait'})}...</CREDITBTN> : <CREDITBTN style={{marginTop: 15}} onClick={ payMethod === '19' ? this.showMercadoHandle.bind(this) : this.showFrameHandle.bind(this) }>+ <FormattedMessage id="use_new_card" /></CREDITBTN>}

                      <div style={{borderTop: 'solid 1px #e6e6e6', marginTop: 20, paddingTop: 40}}>

                        {
                          this.state.checking ? <BigButton bgColor="#999" style={{width: 314, height: 45, lineHeight: '45px'}}>
                            {intl.formatMessage({id: 'please_wait'})}...
                          </BigButton> : <BigButton onClick={this.checkout.bind(this)} bgColor="#222" style={{width: 314, height: 45, lineHeight: '45px', textTransform: 'uppercase', fontSize: 18}}>
                            {intl.formatMessage({id: 'pay_now'})}
                          </BigButton>
                        }

                      </div>
                    </div>
                  }

                </div>
              </div>
            </div>
            <div className="__right">

              <Boxs>
                <Box title={intl.formatMessage({id: 'order_summary'})} style={{paddingTop: 40}}>
                  <OrderSummary style={{marginTop: 20}} display={checkout.display}/>

                  <div style={{borderTop: 'solid 1px #e6e6e6', marginTop: 25, paddingTop: 25}}>
                    <div>{intl.formatMessage({id: 'additional_payment'})}</div>
                    <div style={{textAlign: 'center', padding: '15px 0', marginTop: 10}}>
                      <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180831/payment.jpg"/>
                    </div>
                  </div>
                </Box>
              </Boxs>

            </div>
          </SHOPPINGBODY>

          {
            this.state.showFrame && <Modal onClose={ this.showFrameHandle.bind(this) }>
              <CREDITMODAL>
                <div className="__title">{intl.formatMessage({id: 'use_new_card'})}</div>
                <iframe onLoad={ this.frameLoadHandle.bind(this) } style={{height: __Frame__[ this.props.payMethod ].height}} className="__frame" src={this.state.frameUrl}/>

                {
                  this.state.frameLoading && <div className="__loading">
                    <img alt="loading" src="https://dgzfssf1la12s.cloudfront.net/site/upgrade/20180316/loading.gif"/>
                  </div>
                }
              </CREDITMODAL>
            </Modal>
          }

          {
            this.state.showMercado && <Modal onClose={ this.showMercadoHandle.bind(this) }>
              <MERCADOMODAL>
                <div className="__title">Tarjeta de crédito o débito</div>
                <div style={{marginTop: 20, marginBottom: 15}}>
                  <img src="https://dgzfssf1la12s.cloudfront.net/shoppingcart/maxicocard.png"/>
                </div>
                <div>
                  <MercadoBinding orderTotal={checkout.orderTotal} pay={this.payMercado.bind(this)} email={this.props.me ? this.props.me.email : ''}/>
                </div>
              </MERCADOMODAL>
            </Modal>
          }

          {
            this.state.showDeleteConfirm && <Modal onClose={ () => { this.setState({showDeleteConfirm: false}) } }>
              <Confirm yes={ this.state.cardDelete } no={ () => { this.setState({showDeleteConfirm: false}) } }>
                <span>Are you sure to delete this card?</span>
              </Confirm>
            </Modal>
          }

        </div>

      }

    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Credit))
