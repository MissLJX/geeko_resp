import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CreditCard from '../components/msite/credit.jsx'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { AnimatedRoute } from 'react-router-transition'

import Loadable from 'react-loadable'
import Loading from '../components/msite/refreshing.jsx'

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

export default connect(state => {
	return {
		...state
	}
}, dispatch => {
	return {

	}
})(props => {

	const [p, setP] = React.useState(window.__is_login__? `${window.ctx || ''}/checkout/${props.match.params.orderId}`: undefined)


	return <div>
		<ShoppingBody>
			{
				!window.isApp && <div className="__hd">
					<ShoppingHead>
						<span className="__title"><FormattedMessage id="credit_card" /></span>
						<span onClick={evt => {
							p ? props.history.replace(p) : props.history.goBack()
						}} className="__back">&#xe690;</span>
					</ShoppingHead>
				</div>
			}

			<div className="__bd" style={{paddingTop: window.isApp ? 0: 44}}>
				<CreditCard onGo={p => { setP(p); alert(p) }} orderId={props.match.params.orderId} />
			</div>
		</ShoppingBody>

		<AnimatedRoute	{...defaultAnimations}
			mapStyles={(styles) => ({
				transform: `translateY(${styles.offset}%)`,
				...defaultStyles
			})}
			path={`${props.match.url}/billing-address`} component={BillingAddressModal} />


	</div>

})