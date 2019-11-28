import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import FullFixed from '../components/msite/full-fixed.jsx'
import { getCreditCards, toggleCreditStatus } from '../store/actions.js'
import { __route_root__ } from '../utils/utils.js'
import { deletecreditcard, 
	creditpay, 
	placeorder,
	getJwt,
	getLookup,
	oceanpay3d } from '../api'
import Refreshing from '../components/msite/refreshing.jsx'

const StyledFrame = styled.div`
	height: calc(100vh - 50px);
	overflow: scroll;
  -webkit-overflow-scrolling: touch;
	iframe{
		width: 100%;
		height: 100%;
		border: none;
	}
`

const mapStateToProps = (state) => {
	return {
		...state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		GETCREDITCARDS: (payMethod) => {
			return dispatch(getCreditCards(payMethod))
		},
		TOGGLECREDITSTATUS: (status) => {
			dispatch(toggleCreditStatus(status))
		}
	}
}
const Cards = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`

const HD = styled.h1`
  height: 50px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #e5e5e5;
  line-height: 50px;

`
const CardUL = styled.ul`
  & > li{
    border-top: 1px solid #e5e5e5;
    &:first-child{
      border-top: none;
    }
  }
`

const StyledCard = styled.div`
  height: 50px;
  cursor: pointer;
`

const DeleteIcon = styled.span`
  width: 22px;
  height: 22px;
  background-color: #999;
  border-radius: 50%;
  font-size: 14px;
  display: inline-block;
  cursor: pointer;
  color: #fff;
  text-align: center;
  line-height: 22px;
`

const CardBinding = class extends React.Component {
	constructor(props) {
		super(props)
		this.close = this.close.bind(this)
		this.deleteCardHandle = this.deleteCardHandle.bind(this)
		this.state = {
			frameUrl: `${window.ctx || ''}/w-site/anon/oceanpay?payMethod=${props.payMethod}`,
			frameLoading: true
		}
		this.processCallBack = this.processCallBack.bind(this)
		this.processErrorBack = this.processErrorBack.bind(this)
	}

	componentDidMount() {
		window.bindSuccess = () => {
			this.props.GETCREDITCARDS(this.props.payMethod).then(() => {
				this.props.TOGGLECREDITSTATUS(0)
				// this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
				this.payCredit({})
			})
		}

		window.triggerFalse = (errcode) => {
			this.setState({
				frameUrl: this.state.frameUrl + '&_=' + new Date().getTime()
			})
		}

		if (!this.props.creditcards && this.props.payMethod) {
			this.props.GETCREDITCARDS(this.props.payMethod)
		}

		setTimeout(() => {
			this.setState({
				frameLoading: false
			})
		}, 5000)
	}

	triggerOcean(){
		placeorder().then(({result: payment}) => {
			if(payment){
				const {orderId} = payment
				getJwt(orderId).then(({result}) => {
					const {jwt, bin} = result
					this.listenOcean3D(orderId, jwt, bin)
				}).catch(({result}) => {
					alert(result)
					this.setState({
						checking: false
					})
				})
			}
		}).catch(({result}) => {
			alert(result)
			this.setState({
				checking: false
			})
		})
	}

	listenOcean3D(orderId, jwt, bin){

		var self = this

		/*global Cardinal b:true*/
		/*eslint no-undef: "error"*/
		Cardinal.setup('init', {
			jwt: jwt
		})

		Cardinal.trigger('bin.process', bin)
		Cardinal.off('payments.setupComplete')
		Cardinal.off('payments.validated')

		Cardinal.on('payments.setupComplete', function(setupCompleteData) {
			const referenceId = setupCompleteData.sessionId
			getLookup(referenceId, orderId).then(({result: lookup}) => {
				if(lookup && lookup.lookupUrl){
					Cardinal.continue('cca', {
						'AcsUrl': lookup.lookupUrl,
						'Payload': lookup.lookupLoad
					},{
						'OrderDetails': {
							'TransactionId': lookup.transactionId
						}
					},
					jwt
					)
				}else{
					self.payOcean3D(orderId)
				}
			}).catch(({result}) => {
				alert(result)
				this.setState({
					checking: false
				})
			})


		})
		
		Cardinal.on('payments.validated', function(data, jwt) {
			var cavv = data.Payment.ExtendedData.CAVV
			var eci = data.Payment.ExtendedData.ECIFlag
			var xid = data.Payment.ProcessorTransactionId
			// var status = data.Payment.ExtendedData.PAResStatus
			// var transactionId = data.Payment.ProcessorTransactionId
			
			//请求支付
			self.payOcean3D(orderId, eci, cavv, xid)

		})
	}

	payOcean3D(orderId, eci, cavv, xid){
		oceanpay3d({orderId, cardEci: eci, cardCavv: cavv, cardXid:xid}).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
	}

	payCredit(params) {
		// const {payMethod} = this.props
		// if(payMethod === '3'){
		// 	this.triggerOcean()
		// }else{
		creditpay(params).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
		// }
		
	}

	processCallBack({ success, transactionId, details, orderId, solutions = '' }){
		if (success) {

			window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`

		} else {
			alert(details + '\n' + solutions)
			if (orderId) {
				this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
			}
		}
		this.setState({
			checking: false
		})
	}

	processErrorBack({ result }){
		alert(result)
		this.setState({
			checking: false
		})
	}

	deleteCardHandle(evt, cardId) {
		evt.preventDefault()
		if (confirm('Are you sure to delete this card?')) {
			deletecreditcard(cardId).then(() => {
				this.props.GETCREDITCARDS(this.props.payMethod)
			})
		}
	}

	frameLoadHandle() {
		this.setState({
			frameLoading: false
		})
	}

	close(evt) {
		evt.stopPropagation()
		this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
	}

	render() {
		// const { creditcards } = this.props
		return <FullFixed onClose={this.close} title="Credit Card">
			<StyledFrame>
				{this.state.frameLoading && <Refreshing />}
				<iframe onLoad={this.frameLoadHandle.bind(this)} seamless src={this.state.frameUrl}></iframe>
				{/* {
					creditcards && <Cards>
						<HD>Cards</HD>
						<CardUL>
							{
								creditcards.map(card => <li key={card.quickpayRecord.id}>
									<StyledCard>
										<div className="x-table __fixed x-fw x-fh __vm">
											<div className="x-cell">
												{card.quickpayRecord.cardNumber}
											</div>
											<div className="x-cell __right">
												<DeleteIcon onClick={(evt) => { this.deleteCardHandle(evt, card.quickpayRecord.id) }} className="iconfont">&#xe731;</DeleteIcon>
											</div>
										</div>
									</StyledCard>

								</li>)
							}
						</CardUL>
					</Cards>
				} */}
				{/* <div style={{ height: 100 }}></div> */}
			</StyledFrame>

		</FullFixed>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CardBinding)
