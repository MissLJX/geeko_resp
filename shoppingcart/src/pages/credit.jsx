import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CreditCard from '../components/msite/credit.jsx'
import CreditCardC from '../components/msite/creditC.jsx'
import styled from 'styled-components'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { AnimatedRoute } from 'react-router-transition'

import Loadable from 'react-loadable'
import Loading from '../components/msite/refreshing.jsx'
import Icon from '../components/icon.jsx'
import {CountDown} from '../components/msite/countdowns.jsx'
import qs from 'qs'

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

const BillingAddressModal = Loadable({
	loader: () => import(/* webpackChunkName: "page--address-modal" */ './billing-modal.jsx'),
	loading: Loading
})


const ShoppingBody = styled.div`
	& > .__hd{
		height: 44px;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		z-index: 5;
	}
	& > .__bd{
		padding-top: 44px;
	}

	& > .__fd{
		height: 60px;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding-left: 20px;
		padding-right: 20px;
		align-items: center;
		border-top: solid 1px #e6e6e6;
	}
`

const ShoppingHead = styled.div`
	position: relative;
	text-align: center;
	line-height: 44px;
	height: 44px;
	.__title{
		font-family: AcuminPro-Bold;
		font-size: 16px;
		color: #222;
	}

	.__back, .__tools{
		position: absolute;
		top: 0;
	}

	.__back{
		left: 12px;
		font-family: iconfont;
		cursor: pointer;
		font-size: 18px;
		transform: rotate(180deg);
	}

	.__tools{
		right: 12px;
		display: inline-block;

		.__edit, .__wish{
			font-family: iconfont;
			cursor: pointer;
			font-size: 18px;
			cursor: pointer;
		}

		.__wish{
			margin-left: 12px;
		}
	}

`

const MASK = styled.div`
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, .4);
`

const ASKC = styled.div`
    position: fixed;
    width: 280px;
    border-radius: 12px;
    background-color: #fff;
    padding: 20px;
	padding-top:34px;
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const SUBMITBTN = styled.button`
    height: 42px;
    background-color: #222222;
    color: #fff;
    width: 100%;
    border: none;
    outline: none;
    font-family: AcuminPro-Bold;
	font-size: 14px;
    text-transform: uppercase;
	

	&.outlined{
		border: solid 1px #cacaca;
		color: #222;
		background-color: transparent;
	}
`


const AskC = props => {
    return <ASKC>
        <Icon onClick={props.onClose} style={{width: 30, height: 30, lineHeight: '30px', position: 'absolute', right: 0, top: 10, fontSize: 14, color: '#999'}}>&#xe6af;</Icon>
        <div style={{fontSize: 14, lineHeight: '20px', fontFamily:'SlatePro-Medium', textAlign:'center'}}>
			<FormattedMessage id="cancel_info" values={{countdown: <span style={{color: '#e64545'}}><CountDown showHour offset={12*60*60*1000}/></span>}}/>
		</div>
        <div>
            <SUBMITBTN onClick={props.onClose} style={{marginTop: 23}}><FormattedMessage id="continue_to_pay" /></SUBMITBTN>
			
			<SUBMITBTN onClick={props.onCancel} className="outlined" style={{marginTop: 12}}><FormattedMessage id="confirm_cancel" /></SUBMITBTN>
        </div>
    </ASKC>
}

export default connect(state => {
	return {
		...state
	}
}, dispatch => {
	return {

	}
})(props => {

	const [p, setP] = React.useState(window.__is_login__ ? `${window.ctx || ''}/checkout/${props.match.params.orderId}` : undefined)
	const [showLeave, setShowLeave] = React.useState(false)
	const [leaved, setLeaved] = React.useState(false)

	const search = qs.parse(props.location.search, {ignoreQueryPrefix: true})

	return <div>
		<ShoppingBody>
			{
				!window.isApp && <div className="__hd">
					<ShoppingHead>
						<span className="__title"><FormattedMessage id="order_payment" /></span>
						<span onClick={evt => {

							if(leaved){
								p ? props.history.replace(p) : props.history.goBack()
							}else{
								setLeaved(true)
								setShowLeave(true)
							}
							
						}} className="__back">&#xe690;</span>
					</ShoppingHead>
				</div>
			}

			<div className="__bd" style={{ paddingTop: window.isApp ? 0 : 44 }}>

				{
					search.payMethod === '87' && <CreditCardC onPurchase={() => {setLeaved(true)}} onGo={p => { setP(p); }} orderId={props.match.params.orderId} />
				}


				{
					 search.payMethod === '18' && <CreditCard onPurchase={() => {setLeaved(true)}} onGo={p => { setP(p); }} orderId={props.match.params.orderId} />
				}
			</div>
		</ShoppingBody>

		<AnimatedRoute	{...defaultAnimations}
			mapStyles={(styles) => ({
				transform: `translateY(${styles.offset}%)`,
				...defaultStyles
			})}
			path={`${props.match.url}/billing-address`} component={BillingAddressModal} />


		{
			showLeave && <React.Fragment>
				<MASK onClick={() => { setShowLeave(false) }} />
				<AskC onCancel={() => {
					p ? props.history.replace(p) : props.history.goBack()
				}} onClose={() => { setShowLeave(false) }} />
			</React.Fragment>
		}
	</div>

})