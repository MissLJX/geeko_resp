import React from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Boxs, Box, BoxBody, BoxHead } from '../components/msite/layout.jsx'
import { Grey, Red, UpperCase, Blue } from '../components/text.jsx'
import Address from '../components/msite/address.jsx'
import { Btn, BigButton } from '../components/msite/buttons.jsx'
import { gettransactionrelatedproducts, clientcall } from '../api'
import Order from '../components/msite/order.jsx'
import { fetchTransactionPage } from '../store/actions.js'
import { Link } from 'react-router-dom'
import { AnimatedRoute } from 'react-router-transition'
import Icon from '../components/icon.jsx'
import Products from '../components/msite/products.jsx'
import Loading from '../components/msite/loading.jsx'

import Loadable from 'react-loadable'

import Barcode from 'react-barcode'
import Clipboard from 'react-clipboard.js'
import '../css/share.css'

import { getFaceBookUrl, getShareInputUrl } from '../api/index.js'

import SendEmail from '../pages/to-share-email.jsx'
import TermsConditions from '../pages/terms-condition.jsx'

const OrderAddress = Loadable({
	loader: () => import(/* webpackChunkName: "component--order-address" */ './order-address.jsx'),
	loading: Loading
})

const SetPassword = Loadable({
	loader: () => import(/* webpackChunkName: "component--set-password" */ './set-password.jsx'),
	loading: Loading
})

const ChangePhone = Loadable({
	loader: () => import(/* webpackChunkName: "component--change-phone" */ './change-phone.jsx'),
	loading: Loading
})

const ChangeEmail = Loadable({
	loader: () => import(/* webpackChunkName: "component--change-email" */ './change-email.jsx'),
	loading: Loading
})

const defaultStyles = {
	position: 'fixed',
	top: 0,
	backgroundColor: '#fff',
	width: '100%',
	zIndex: 20,
	overflow: 'auto'

}

const defaultAnimations = {
	atEnter: { offset: 100, height: 0 },
	atLeave: { offset: 100, height: 0 },
	atActive: { offset: 0, height: 100 }
}

const DashedLine = styled.div`
	background: linear-gradient(to right, #dd747d 35%,transparent 25%,transparent 50%,#626e94 50%,#626e94 85%,transparent 75%);
		background-size: 40px 1px;
		height: 2px;  
		transform:skew(20deg,0);
`

const OverFlow = styled.div`
	overflow: hidden;
`

const AddressBox = styled.div`
	& > .__hd{
		height: 50px;
		padding-left: 10px;
		padding-right: 10px;
		border-bottom: 1px solid #ededed;
	}
	& > .__bd{
		padding: 10px;
	}
`

const LI = styled.li`
	&::before{
		display: inline-block;
		content: attr(data-index);
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: #e64545;
		color: #fff;
		line-height: 16px;
		text-align: center;
		font-size: 12px;
		vartical-align: middle;
		margin-right: 5px;
	}

	line-height: 20px;
`

const OL = styled.ol`
	& > li{
		margin-top: 10px;
		&:first-child{
			margin-top:0;
		}
	}
`

const BARCODECOPY = styled.div`
	border:1px solid #e6e6e6;
	border-radius: 2px;
	height: 35px;
	padding-left: 10px;
	line-height: 35px;
	& > span{
		width: calc(100% - 95px);
		overflow: hidden;
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	& > button{
		float: right;
		height: 33px;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
		cursor: pointer;
		width: 95px;
	}
`

const BARCODE = styled.div`
	& > svg{
		width:100% !important;
		height: auto;
	}
`

const mapStateToProps = (state) => {
	return {
		transaction: state.transaction,
		me: state.me,
		m1186: state.m1186,
		m1147: state.m1147,
		m1073: state.m1073
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		GETTRANSACTIONPAGE: (transactionId) => {
			return dispatch(fetchTransactionPage(transactionId))
		}
	}
}

const OrderConfirm = class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			products: [],
			faceurl: "",
			inputValue: ""
		}
	}

	componentWillMount() {
		const { transactionId } = this.props.match.params
		this.props.GETTRANSACTIONPAGE(transactionId).then((data) => {

			if (data) {
				const { transaction } = data
				gettransactionrelatedproducts(transaction.id, 0, 20).then(({ result }) => {
					this.setState({
						products: [...this.state.products, ...result]
					})
				})
				clientcall(transactionId).then(() => { }).catch(e => {
					console.log(e)
				})

				if (window.sendEvent) {
					window.sendEvent(data)
				}
			}

		})

		if (window.__is_login__) {
			// inputValue
			getShareInputUrl().then(data => {
				// console.log("getShareInputUrl", data);
				this.setState({
					inputValue: window.siteUrl + "/i/share/register?key=" + data.result
				});

			});

			// faceUrl
			getFaceBookUrl().then(data => {
				// console.log("getFaceBookUrl", data);
				this.setState({
					faceurl: window.siteUrl + "/i/share/register?key=" + data.result
				});
			});
		}

	}

	bindFBCheckBox() {
		const { transaction, me } = this.props

		if (window.FB && !this.hassubed && transaction && me) {
			/*global FB b:true*/
			/*eslint no-undef: "error"*/
			FB.Event.subscribe('messenger_checkbox', function (e) {

				if (e.event == 'rendered') {
					console.log('Plugin was rendered')
					document.getElementById('fmsg').style.display = 'block'
				} else if (e.event == 'checkbox') {
					var checkboxState = e.state
					console.log('Checkbox state: ' + checkboxState)

					FB.AppEvents.logEvent('MessengerCheckboxUserConfirmation', null, {
						'app_id': window.__FB_Messenger_App_ID,
						'page_id': window.__FB_Page_ID,
						'ref': transaction.id,
						'user_ref': me.id
					})



				} else if (e.event == 'not_you') {
					console.log('User clicked \'not you\'')
				} else if (e.event == 'hidden') {
					console.log('Plugin was hidden')
					document.getElementById('fmsg').style.display = 'none'
				}

			})

			this.hassubed = true
		}


	}

	handleViewOrder() {
		const { transaction } = this.props

		window.location.href = `${window.ctx || ''}/me/m/order/detail/${transaction.id}`
	}

	handleSetPassword() {
		this.props.history.push(`${this.props.match.url}/set-password`)
	}

	copied() {
		this.showSuccessTip('Copiado com sucesso')
	}

	showSuccessTip(tip) {
		alert(tip)
	}


	isCashout() {
		const { transaction } = this.props
		const { payMethod } = transaction
		return ['20', '21', '16', '23', '25', '29', '27', '28', '30', '31', '34', '35', '37', '40', '41', '43', '44'].indexOf(payMethod) >= 0
	}

	getPayUrl() {
		const { transaction } = this.props
		switch (transaction.payMethod) {
			case '20':
			case '21':
				return transaction.mercadopagoPayURL
			case '16':
			case '23':
			case '25':
			case '29':
			case '27':
			case '28':
			case '30':
			case '31':
			case '34':
			case '35':
			case '37':
			case '40':
			case '41':
			case '43':
			case '44':
				return transaction.boletoPayCodeURL
		}
	}

	getTips() {
		const { m1186, transaction } = this.props
		const bb = JSON.parse(m1186.message)
		switch (transaction.payMethod) {
			case '20':
			case '21':
			case '27':
			case '28':
			case '30':
			case '31':
			case '34':
			case '35':
			case '37':
			case '40':
			case '41':
			case '43':
			case '44':
				return bb.spain
			case '16':
			case '23':
			case '25':
			case '29':
				return bb.portugal
			default:
				return null
		}
	}

	getBtnText() {
		const { transaction } = this.props
		switch (transaction.payMethod) {
			case '20':
			case '21':
			case '27':
			case '28':
			case '30':
			case '31':
			case '34':
			case '35':
			case '37':
			case '40':
			case '41':
			case '43':
			case '44':
				return 'Generar Ticket'
			case '29':
				return 'Gerar Ticket'
			case '16':
			case '23':
			case '25':
				return 'Imprimir boleto'
			default:
				return null
		}
	}

	// facebook
	faceShare = () => {
		if (this.state.faceurl) {
			window.shareBack(this.state.faceurl, 'SHARE UP TO 50% OFF , GET $10', 'https://dgzfssf1la12s.cloudfront.net/upgrade/20180920/gift-pc.png', 'Share lucky draw with your friends, and get up to 50% off together. And you\'ll get $10 when they make a purchase', function (response) {
				if (response && !response.error_message) {
					window.mobileAnalyticsClient.recordEvent('REGISTER_SHARE', {
						'customerId': window.gobalCustomerId ? gobalCustomerId : '',
						'currentPage': 'share',
						'type': '1',
						'info1': window.utm_source,
						'info2': window.utm_campaign
					});
				}
			});
		}
	}

	// Messenger分享
	messengerShare = () => {
		window.open('https://www.facebook.com/dialog/share_referral/?app_id=' + window.__FB_Messenger_App_ID + '&redirect_uri=' + window.siteUrl + "/i/fbshare-back" + '&state=1', '_blank', 'width=500,height=725,top=110,left=710,menubar=no,toolbar=no,status=no,scrollbars=no');
	}

	// 点击email
	toSendEmail = () => {
		// this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
		// this.props.history.push(`${window.ctx || ''}/order-confirm/toShareEmail`)
		this.props.history.push(`${this.props.match.url}/to-share-email`)
	}

	// 去terms页面
	toTermsConditions() {
		this.props.history.push(`${this.props.match.url}/term-conditions`);
	}


	render() {
		const { transaction, me, m1186, m1147, m1073, intl } = this.props
		const { message } = transaction || {}
		const __me = me ? me : window.__session_customer__

		const communicationEmail = __me ? __me.communicationEmail : ''

		let __Tips__, payUrl, isCashout, btnText

		if (transaction) {
			isCashout = this.isCashout()
			payUrl = this.getPayUrl()
			btnText = this.getBtnText()
			if (m1186) {
				__Tips__ = this.getTips()
			}
		}

		const getTitle = () => {

			if (isCashout) {
				if (transaction.payMethod === '16' || transaction.payMethod === '23' || transaction.payMethod === '25' || transaction.payMethod === '29') { return <div>Seu pedido de compra foi realizado! Pague agora seu Boleto Bancário paraagilizar a confirmação do seu pedido.</div> }
				return null
			}


			return <div>
				<span dangerouslySetInnerHTML={{ __html: message }} />

				{
					window.__is_login__ && <Link style={{ color: 'skyblue' }} to={`${this.props.match.url}/change-email`}>{communicationEmail}<Icon style={{ marginLeft: 10, color: 'skyblue', cursor: 'pointer' }}>&#xe61f;</Icon></Link>
				}

				{!window.__is_login__ && !window.__isnew && <span style={{ color: 'skyblue' }}>{communicationEmail}</span>}


				{window.__isnew && <div style={{ marginTop: 15 }}><Btn onClick={this.handleSetPassword.bind(this)}><FormattedMessage id="set_password" /></Btn></div>}


			</div>
		}

		return <div>{transaction && (
			<div>
				<Boxs>
					<Box>
						<div style={{ padding: 10 }}>
							<div>
								<Icon style={{ color: '#57b936', fontSize: 25, marginRight: 10 }}>&#xe73c;</Icon><span style={{ fontSize: 20 }} dangerouslySetInnerHTML={{ __html: m1073.message }} />
							</div>

							<div style={{ marginTop: 10, lineHeight: '20px' }}>{getTitle()}</div>
						</div>

					</Box>

					{
						isCashout && <Box style={{ marginTop: -20 }}>
							<div style={{ paddingBottom: 10 }}>
								<OL style={{ padding: 10 }}>
									{
										__Tips__ && __Tips__.map((tip, index) => <LI key={index} data-index={index + 1} dangerouslySetInnerHTML={{ __html: tip.message }} />)
									}
								</OL>

								<div style={{ textAlign: 'center' }}>
									{
										transaction.shippingDetail.phoneNumber && <Link style={{ textDecoration: 'none' }} to={`${this.props.match.url}/change-phone`}>
											<Blue style={{ cursor: 'pointer' }}>
												<span>{transaction.shippingDetail.phoneNumber}</span>
												<Icon style={{ marginLeft: 5 }}>&#xe62b;</Icon>
											</Blue>
										</Link>
									}
								</div>

								<div onClick={() => { window.location.href = payUrl }} style={{ marginTop: 10, marginLeft: 10, textAlign: 'center' }}><Btn style={{ backgroundColor: '#e64545', padding: '10px 12px' }}>{btnText}</Btn></div>

								{
									transaction.barcodeNumber && <div style={{ marginTop: 25 }}>
										<BARCODE>
											<Barcode value={transaction.barcodeNumber} width={2.21} displayValue={false} />
										</BARCODE>
										<div style={{ paddingLeft: 10, paddingRight: 10 }}>
											<BARCODECOPY>
												<span>{transaction.digitableLine}</span>

												<Clipboard onSuccess={this.copied.bind(this)} style={{ backgroundColor: '#e64545', color: '#fff', border: 'none', outline: 'none', boxShadow: 'none' }} data-clipboard-text={transaction.digitableLine}>
													Copiar código
												</Clipboard>
											</BARCODECOPY>
										</div>

									</div>
								}

							</div>
						</Box>
					}



					<Box>
						<AddressBox>
							<div className="__hd">
								<div className="x-table __vm __fixed x-fw x-fh">
									<div className="x-cell">
										<div><UpperCase><FormattedMessage id="shipping_address" /></UpperCase></div>
										<div><Red style={{ fontSize: 12 }}>(Please check it carefully.)</Red></div>
									</div>
									<div className="x-cell __right">
										<Btn><Link style={{ textDecoration: 'none', color: '#fff' }} to={`${this.props.match.url}/address`}><FormattedMessage id="edit" /></Link></Btn>
									</div>
								</div>
							</div>
							<div className="__bd">
								<Address address={transaction.shippingDetail} />
							</div>
							<OverFlow>
								<DashedLine />
							</OverFlow>
						</AddressBox>

					</Box>

					<Box>
						<BoxHead title={intl.formatMessage({ id: 'payment_method' })} />
						<BoxBody>
							<div>{transaction.payMethodName}</div>
							{transaction.accountNo && <div style={{ marginTop: 5 }}>
								{transaction.accountNo}
							</div>}
							<div style={{ marginTop: 5 }}><span>{intl.formatMessage({ id: 'zip_code' })}: </span> <span>{transaction.shippingDetail.zipCode}</span></div>
						</BoxBody>
					</Box>

					<Box key={transaction.id}>
						<Order transaction={transaction} />
					</Box>

				</Boxs>


				<div style={{ marginTop: 15, paddingLeft: 20, paddingRight: 20 }}>



					{
						me && !me.subscribeToFacebookMessage && <div style={{ textAlign: 'center', marginBottom: 10 }}>
							<div id="fmsg" style={{ display: 'none', fontSize: 12, color: '#e64545' }}>{intl.formatMessage({ id: 'facebook_check' })}</div>
							<div ref={this.bindFBCheckBox.bind(this)} className="fb-messenger-checkbox"
								origin={window.__FB_Origin}
								page_id={window.__FB_Page_ID}
								messenger_app_id={window.__FB_Messenger_App_ID}
								user_ref={window.__FB_User_Ref}
								size="small"
								skin="light"
								center_align="true">
							</div>
						</div>
					}



					<BigButton onClick={this.handleViewOrder.bind(this)} className="__btn" height={47}>
						<FormattedMessage id="check_order" />
					</BigButton>
				</div>
				{
					window.showShare && window.__is_login__ && (
						<div className="main" style={{ margin: "10px 0px", borderTop: '10px solid #f7f7f7', borderBottom: '10px solid #f7f7f7' }}>

							<div className="share-body">
								<div>
									<img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180920/gift.png" />
								</div>
								<div style={{ fontWeight: 'bold', fontSize: '15px', marginTop: '15px' }}>
									<FormattedMessage id="share_up_to" />
								</div>
								<div style={{ fontSize: '13px', lineHeight: '16px', marginTop: '10px', color: '#666666' }}>
									<FormattedMessage id="share_luckly_draw" />
								</div>
								<div style={{ color: '#999', fontSize: '14px', marginTop: '15px' }}><span style={{ cursor: 'pointer' }} className="open-page" data-page="#terms" onClick={this.toTermsConditions.bind(this)}><FormattedMessage id="terms_conditions" /><span className="share-ask">?</span></span></div>
							</div>

							<div className="shares">
								<div style={{ cursor: 'pointer' }} id="face-share" onClick={this.faceShare}>
									<span className="myimg">
										<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/chicme/20200902/facebook.png" alt="Facebook" />
									</span>
									<div><FormattedMessage id="facebook" /></div>
								</div>

								<div style={{ cursor: 'pointer' }} id="messenger-share" onClick={this.messengerShare}>
									<span className="myimg">
										<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/chicme/20200902/Messenger.png" alt="Messenger" />
									</span>
									<div><FormattedMessage id="messenger" /></div>
								</div>



								<div style={{ cursor: 'pointer' }} className="open-page" data-page="#shareemail" onClick={this.toSendEmail}>
									<span className="myimg">
										<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/chicme/20200902/Email.png" alt="Email" />
									</span>
									<div><FormattedMessage id="email" /></div>
								</div>
							</div>

							<div style={{ backgroundColor: '#fff', marginTop: '10px', padding: '15px 10px 20px 10px' }}>
								<div style={{ marginLeft: '10px', fontSize: '16px', fontWeight: 'bold' }}><FormattedMessage id="invitation_link" /></div>
								<div>
									<input className="share-input" id="foo" value={this.state.inputValue} type="text" readOnly />
									<Clipboard onSuccess={this.copied.bind(this)} style={{ background: 'transparent', border: 'none', outline: 'none', boxShadow: 'none' }} data-clipboard-text={this.state.inputValue}>
										<span style={{ marginLeft: '20px' }} className="iconfont share-icon-copy">&#xe776;</span>
									</Clipboard>
								</div>
							</div>
						</div>
					)
				}



				<Boxs style={{ marginTop: 20 }}>
					<Box>
						<BoxHead title={intl.formatMessage({ id: 'you_may_also_like' })} />
						<BoxBody>
							<Products products={this.state.products} type="often_bought_with"/>
						</BoxBody>
					</Box>

				</Boxs>
			</div>

		)}

			<AnimatedRoute {...defaultAnimations}
				mapStyles={(styles) => ({
					transform: `translateY(${styles.offset}%)`,
					...defaultStyles
				})}
				path={`${this.props.match.path}/address`} component={OrderAddress} />

			<AnimatedRoute {...defaultAnimations}
				mapStyles={(styles) => ({
					transform: `translateY(${styles.offset}%)`,
					...defaultStyles
				})}
				path={`${this.props.match.path}/set-password`} component={SetPassword} />

			<AnimatedRoute {...defaultAnimations}
				mapStyles={(styles) => ({
					transform: `translateY(${styles.offset}%)`,
					...defaultStyles
				})}
				path={`${this.props.match.path}/change-phone`} component={ChangePhone} />

			<AnimatedRoute {...defaultAnimations}
				mapStyles={(styles) => ({
					transform: `translateY(${styles.offset}%)`,
					...defaultStyles
				})}
				path={`${this.props.match.path}/change-email`} component={ChangeEmail} />

			<AnimatedRoute {...defaultAnimations}
				mapStyles={(styles) => ({
					transform: `translateY(${styles.offset}%)`,
					...defaultStyles
				})}
				path={`${this.props.match.path}/to-share-email`} component={SendEmail} />

			<AnimatedRoute {...defaultAnimations}
				mapStyles={(styles) => ({
					transform: `translateY(${styles.offset}%)`,
					...defaultStyles
				})}
				path={`${this.props.match.path}/term-conditions`} component={TermsConditions} />
		</div>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderConfirm))
