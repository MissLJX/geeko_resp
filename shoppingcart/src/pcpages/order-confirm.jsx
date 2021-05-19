import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import Icon from '../components/icon.jsx'
import { fetchTransactionPage } from '../store/actions.js'
import { gettransactionrelatedproducts, getRecentlyProducts, clientcall, getCountryMessage } from '../api'
import { Btn, BigButton } from '../components/msite/buttons.jsx'
import Barcode from 'react-barcode'
import Clipboard from 'react-clipboard.js'
import SUCCESSTIP from '../components/pc/successtip.jsx'
import { Grey, Red, Blue } from '../components/text.jsx'

import { OrderAddress } from '../components/pc/address.jsx'
import LinkImage from '../components/link-image.jsx'

import Ellipsis from '../components/ellipsis.jsx'
import Money from '../components/money.jsx'
import { producturl, strconcat } from '../utils/utils.js'
import Tabs from '../components/pc/tabs.jsx'
import Product from '../components/pc/product.jsx'

import Carousel from '../components/pc/carousel.jsx'
import Loadable from 'react-loadable'
import Loading from '../components/msite/loading.jsx'

import { Route, Link } from 'react-router-dom'

import { Tips, PhoneLink } from '../components/pc/order-confirm-tips.jsx'

import '../css/share-pc.css'

import SendEmailPC from './to-share-email-pc.jsx'
import TermsConditionsPC from './terms-condition-pc.jsx'
import CopySharePC from './to-share-copy.jsx'
import { getFaceBookUrl, getShareInputUrl } from '../api/index.js'

const RouteAddress = Loadable({
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

const PAGECONFIRM = styled.div`
	width: 1150px;
	margin-left: auto;
	margin-right: auto;
	padding-bottom: 50px;
`

const CONTAINER = styled.div`
	width: 726px;
	margin-left: auto;
	margin-right: auto;
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
	width: 687px;
	padding-left: 10px;
	margin-left: 10px;
	line-height: 35px;

	& > button{
		float: right;
		height: 33px;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
		cursor: pointer;
	}
`

const PAYMETHOD = styled.div`
	border:1px solid #e6e6e6;
	padding: 15px;
`

const ORDERS = styled.ul`
	margin-top: 40px;
	& > li{
		margin-top: 30px;
		&:first-child{
			margin-top:0;
		}
	}
`

const ORDER = styled.div`
	border: solid 1px #e6e6e6;
	& > .__hd{
		height: 40px;
		background-color: #f5f5f5;
		padding-left: 10px;
		padding-right: 10px;
	}

	& > .__bd{
		padding-left: 10px;
		padding-right: 10px;
	}
`

const ORDERFD = styled.div`
	text-align: right;
	margin-top: 10px;
`

const ITEMS = styled.ul`
	&> li{
		padding-top: 10px;
		padding-bottom: 10px;
		border-top: dashed 1px #e6e6e6;
		&:first-child{
			border-top: none
		}
	}
`

const ITEM = styled.div`
	
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
			histories: [],
			successTip: null,
			tabIndex: 0,
			faceurl: "",
			confirmBanner: null
		}
	}

	componentWillMount() {
		const { transactionId } = this.props.match.params
		const { me } = this.props
		this.props.GETTRANSACTIONPAGE(transactionId).then((data) => {

			const transaction = data.transaction

			if (transaction) {
				gettransactionrelatedproducts(transaction.id, 0, 11).then(({ result }) => {
					this.setState({
						products: [...this.state.products, ...(result || [])]
					})
				})
				getRecentlyProducts().then(({ result }) => {
					this.setState({
						histories: [...this.state.histories, ...(result || [])]
					})
				})


				if (window.sendEvent) {
					window.sendEvent(data)
				}
			}


		})

		clientcall(transactionId).then(() => { }).catch(e => {
			console.log(e)
		})

		// });

		if (window.__is_login__) {
			// faceUrl
			getFaceBookUrl().then(data => {
				console.log("getFaceBookUrl", data, window.siteUrl);
				this.setState({
					faceurl: window.siteUrl + "/i/share/register?key=" + data.result
				});

			});
		}

		getCountryMessage('M1396').then(({ result }) => {
			this.setState({
				confirmBanner: result
			})
		})


	}

	addressEditHandle() {
		this.props.history.push(`${this.props.match.url}/address`)
	}

	handleViewOrder() {

		const { transaction } = this.props

		window.location.href = `${window.ctx || ''}/me/m/order/detail/${transaction.id}`
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

	handleSetPassword() {
		this.props.history.push(`${this.props.match.url}/set-password`)
	}

	copied() {
		this.showSuccessTip('Copiado com sucesso')
	}

	showSuccessTip(tip) {
		this.setState({
			successTip: tip
		})
		setTimeout(() => {
			this.setState({
				successTip: null
			})
		}, 450)
	}

	tabClickHandle(index) {
		this.setState({
			tabIndex: index
		})
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

	toSendEmail() {
		this.props.history.push(`${this.props.match.url}/to-share-email-pc`)
	}

	// Messenger分享
	messengerShare = () => {
		window.open('https://www.facebook.com/dialog/share_referral/?app_id=' + window.__FB_Messenger_App_ID + '&redirect_uri=' + window.siteUrl + "/i/fbshare-back" + '&state=1', '_blank', 'width=500,height=725,top=110,left=710,menubar=no,toolbar=no,status=no,scrollbars=no');
	}

	faceShare() {
		if (this.state.faceurl) {
			window.shareBack(this.state.faceurl, 'SHARE UP TO 50% OFF , GET $10', 'https://image.geeko.ltd/upgrade/20180920/gift-pc.png', 'Share lucky draw with your friends, and get up to 50% off together. And you\'ll get $10 when they make a purchase', function (response) {
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


	toTermsConditions() {
		this.props.history.push(`${this.props.match.url}/terms-conditions-pc`);
	}

	toCopy() {
		this.props.history.push(`${this.props.match.url}/to-share-copy-pc`);
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
				if (transaction.payMethod === '16' || transaction.payMethod === '23' || transaction.payMethod === '25') { return <div>Seu pedido de compra foi realizado! Pague agora seu Boleto Bancário paraagilizar a confirmação do seu pedido.</div> }
				return null
			}
			return <div>
				<span dangerouslySetInnerHTML={{ __html: message }} />

				{window.__is_login__ && <Link style={{ color: 'skyblue' }} to={`${this.props.match.url}/change-email`}>{communicationEmail}<Icon style={{ marginLeft: 10, color: 'skyblue', cursor: 'pointer' }}>&#xe61f;</Icon></Link>}
				{!window.__is_login__ && !window.__isnew && <span style={{ color: 'skyblue' }}>{communicationEmail}</span>}
				{window.__isnew && <div style={{ marginTop: 15 }}><Btn onClick={this.handleSetPassword.bind(this)}><FormattedMessage id="set_password" /></Btn></div>}
			</div>
		}

		return <PAGECONFIRM>
			{
				transaction && <CONTAINER style={{ paddingTop: 50 }}>
					<div className="x-table __vt __fixed x-fw">
						<div className="x-cell" style={{ width: 42 }}>
							<Icon style={{ color: '#57b936', fontSize: 32 }}>&#xe73c;</Icon>
						</div>
						<div className="x-cell" style={{ paddingTop: 4 }}>
							<div dangerouslySetInnerHTML={{ __html: m1073.message }} style={{ fontFamily: 'HelveticaNeue-Medium', fontSize: 16 }} />
							<div style={{ marginTop: 10, lineHeight: '20px' }}>{getTitle()}</div>
						</div>
					</div>


					{
						isCashout && <div style={{ paddingLeft: 30 }}>
							<Tips style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #e6e6e6' }} tips={__Tips__} />
							<div style={{ textAlign: 'center' }}>
								<PhoneLink phoneNumber={transaction.shippingDetail.phoneNumber} link={`${this.props.match.path}/change-phone`} />
							</div>
							<div style={{ textAlign: 'center', marginTop: 20 }}>
								<Btn onClick={() => { window.location.href = payUrl }} style={{ backgroundColor: '#e64545', padding: '12px 26px' }}>{btnText}</Btn>
							</div>


							{
								transaction.barcodeNumber && <div style={{ marginTop: 25 }}>
									<Barcode value={transaction.barcodeNumber} width={2.21} displayValue={false} />
									<BARCODECOPY>
										<span>{transaction.digitableLine}</span>

										<Clipboard onSuccess={this.copied.bind(this)} style={{ backgroundColor: '#e64545', color: '#fff', border: 'none', outline: 'none', boxShadow: 'none' }} data-clipboard-text={transaction.digitableLine}>
											Copiar código
										</Clipboard>
									</BARCODECOPY>
								</div>
							}

						</div>
					}


					<div style={{ marginTop: 40 }}>
						<OrderAddress address={transaction.shippingDetail} showEdit={true} onEdit={this.addressEditHandle.bind(this)} />
					</div>

					<PAYMETHOD style={{ marginTop: 15 }}>
						<div className="x-table __vt">
							<div className="x-cell" style={{ width: 150, fontSize: 16 }}>
								<FormattedMessage id="payment_method" />
							</div>
							<div className="x-cell">
								<div>
									<span>{transaction.payMethodName}</span>
									{
										transaction.accountNo && <span style={{ marginLeft: 10 }}>{transaction.accountNo}</span>
									}
								</div>

								<div style={{ marginTop: 2 }}>
									<FormattedMessage id="zip_code" />:
									<span style={{ marginLeft: 10 }}>{transaction.shippingDetail.zipCode}</span>
								</div>
							</div>
						</div>
					</PAYMETHOD>

					<ORDERS>
						<li key={transaction.id}>
							<ORDER>
								<div className="__hd">
									<div className="x-table x-fw __vm x-fh">
										<div className="x-cell" style={{ width: 210 }}>
											<span>{new Date(transaction.orderTime).toLocaleString()}</span>
										</div>

										<div className="x-cell __right">
											<Grey><FormattedMessage id="order_no" />:</Grey> <span>{transaction.id}</span>
										</div>
									</div>

								</div>

								<div className="__bd">
									<ITEMS>
										{
											transaction.orderItems.map(item => <li key={item.variantId}>
												<ITEM>
													<div className="x-table __fixed __vm" style={{ width: 670 }}>
														<div className="x-cell" style={{ width: 110 }}>
															<LinkImage style={{ width: 90 }} href={producturl({ id: item.productId, name: item.productName })} src={item.productImageUrl} />
														</div>
														<div className="x-cell" style={{ width: 310 }}>
															<Ellipsis>{item.productName}</Ellipsis>
															<div style={{ marginTop: 4 }}><Grey>{strconcat(item.color, item.size)}</Grey></div>
														</div>
														<div className="x-cell" style={{ textAlign: 'center' }}>
															<span>{item.quantity}</span>
														</div>

														<div className="x-cell __right">
															<Red><Money money={item.price} /></Red>
														</div>
													</div>
												</ITEM>
											</li>)
										}
									</ITEMS>
								</div>
							</ORDER>
							<ORDERFD>
								<span>
									<FormattedMessage style={{ fontFamily: 'HelveticaNeue-Medium' }} id="shipping_price" />:
									<Money money={transaction.shippingPrice} />
								</span>

								{
									transaction.shippingInsurancePrice && transaction.shippingInsurancePrice.amount > 0 && <span style={{ marginLeft: 15 }}>
										<FormattedMessage style={{ fontFamily: 'HelveticaNeue-Medium' }} id="shipping_insurance" />:
										<Money money={transaction.shippingInsurancePrice} />
									</span>
								}
								{
									transaction.points > 0 && <span style={{ marginLeft: 15 }}>
										<FormattedMessage style={{ fontFamily: 'HelveticaNeue-Medium' }} id="credits" />:
										<Red>+{transaction.points}</Red>
									</span>
								}

								<span style={{ marginLeft: 15 }}>
									<FormattedMessage style={{ fontFamily: 'HelveticaNeue-Medium' }} id="total" />:
									<Red style={{ fontSize: 20, fontFamily: 'HelveticaNeue-Medium' }}><Money money={transaction.orderTotal} /></Red>
								</span>

							</ORDERFD>
						</li>
					</ORDERS>

					{
						me && !me.subscribeToFacebookMessage && <div style={{ textAlign: 'center', position: 'relative', top: 30 }}>
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



					<BigButton onClick={this.handleViewOrder.bind(this)} style={{ width: 313, marginLeft: 'auto', marginRight: 'auto', marginTop: 40 }}><FormattedMessage id="check_order" /></BigButton>

				</CONTAINER>
			}

			{
				window.showShare && window.__is_login__ && (
					<div>
						<div style={{ width: '1150px', height: '300px', backgroundColor: '#fafafa', margin: '0px auto', marginTop: '50px' }}>
							<div style={{ paddingTop: '20px', textAlign: 'center' }}>
								<div className="share_title" style={{ marginTop: '15px' }}>
									<FormattedMessage id="share_up_to" />
								</div>
								<div style={{ marginTop: '15px', lineHeight: '18px' }}>
									<FormattedMessage id="share_luckly_draw" />
								</div>
								<div className="icons" style={{ marginTop: '28px' }}>
									<div className="share_icon" id="face-share" onClick={this.faceShare.bind(this)}>
										<div className="icon">
											<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/chicme/20200902/facebook.png" alt="Facebook" />
										</div>
										<div className="txt">
											<FormattedMessage id="facebook" />
										</div>
									</div>


									<div id="face-messenger" className="share_icon" style={{ marginLeft: '70px' }} onClick={this.messengerShare.bind(this)}>
										<div className="icon">
											<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/chicme/20200902/Messenger.png" alt="Messenger" />
										</div>

										<div className="txt">
											<FormattedMessage id="messenger" />
										</div>
									</div>

									<div id="email-show" className="share_icon" style={{ marginLeft: '70px' }} onClick={this.toSendEmail.bind(this)}>
										<div className="icon">
											<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/chicme/20200902/Email.png" alt="Email" />
										</div>
										<div className="txt">
											<FormattedMessage id="email" />
										</div>
									</div>

									<div id="show-copy" className="share_icon" style={{ marginLeft: '70px' }} onClick={this.toCopy.bind(this)}>
										<div className="icon">
											<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/chicme/20200910/copy.png" alt="Copy" />
										</div>

										<div className="txt">
											<FormattedMessage id="copy" />
										</div>
									</div>
								</div>


								<div style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
									<span id="show-term" style={{ cursor: 'pointer' }} onClick={this.toTermsConditions.bind(this)}>Terms & Conditions <span className="share-ask">?</span></span>
								</div>
							</div>
						</div>
					</div>
				)
			}

			{
				this.state.confirmBanner && <div>
					<a href={this.state.confirmBanner.href} className="" data-source data-source-click data-title="shoppingcart" data-type={'Shopping Cart Banner'} data-content={this.state.confirmBanner.refId} data-position={1}>
						<img style={{ display: 'block', width: '100%' }} src={this.state.confirmBanner.src} />
					</a>
				</div>
			}




			{
				transaction && this.state.products && <div style={{ marginTop: 55 }}>


					<Tabs tabIndex={this.state.tabIndex} tabClick={this.tabClickHandle.bind(this)} tabs={[
						{ title: intl.formatMessage({ id: 'you_may_also_like' }) },
						{ title: intl.formatMessage({ id: 'recently_viewed' }) }
					]} />

					{
						this.state.tabIndex === 0 && <div style={{ marginTop: 30 }}>
							<Carousel options={{ margin: 10, displays: 5, count: this.state.products.length, parentWidth: 1150 }}>
								{
									this.state.products.map(product => <div key={product.id}>
										<Product type="often_bought_with" product={product} />
									</div>)
								}
							</Carousel>
						</div>
					}

					{
						this.state.tabIndex === 1 && <div style={{ marginTop: 30 }}>
							{
								this.state.histories && <Carousel options={{ margin: 10, displays: 5, count: this.state.histories.length, parentWidth: 1150 }}>
									{
										this.state.histories.map(product => <div key={product.id}>
											<Product product={product} />
										</div>)
									}
								</Carousel>
							}
						</div>
					}

				</div>
			}

			{
				this.state.successTip && <SUCCESSTIP time={0.5}>
					{this.state.successTip}
				</SUCCESSTIP>
			}


			<Route path={`${this.props.match.path}/address`} component={RouteAddress} />
			<Route path={`${this.props.match.path}/set-password`} component={SetPassword} />
			<Route path={`${this.props.match.path}/change-phone`} component={ChangePhone} />
			<Route path={`${this.props.match.path}/change-email`} component={ChangeEmail} />

			<Route path={`${this.props.match.path}/to-share-email-pc`} component={SendEmailPC} />
			<Route path={`${this.props.match.path}/terms-conditions-pc`} component={TermsConditionsPC} />
			<Route path={`${this.props.match.path}/to-share-copy-pc`} component={CopySharePC} />





		</PAGECONFIRM>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderConfirm))
