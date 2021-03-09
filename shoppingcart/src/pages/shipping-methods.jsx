import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { selectMethod } from '../store/actions.js'
import FullFixed from '../components/msite/full-fixed.jsx'
import Money from '../components/money.jsx'
import { Grey } from '../components/text.jsx'
import { injectIntl } from 'react-intl'
import { __route_root__ } from '../utils/utils.js'

const mapStateToProps = (state) => {
	return {
		methods: state.cart ? state.cart.shippingMethodList : null,
		selectedMethod: state.cart ? state.cart.shippingMethod : null
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		SELECT: (method) => {
			dispatch(selectMethod(method))
		}
	}
}

const Method = styled.li`
	padding-top: 12px;
	padding-bottom: 12px;
	position: relative;
	cursor: pointer;
	&.selected{
		&::after{
			content: '\\e73b';
			color: #000000;
			font-size: 20px;
			font-family: iconfont;
			font-style:normal;
			-webkit-font-smoothing: antialiased;
  			-moz-osx-font-smoothing: grayscale;
  			position: absolute;
  			right: 10px;
  			top: calc(50% - 10px);
		}
	}

	.price{
		font-family: SlatePro-Medium;
		font-size: 16px;
	}
` 

const Methods = styled.ul`
	padding-left: 20px;
	padding-right: 20px;
	border-top: 8px solid #f6f6f6;
	& > li{
		border-top: 1px solid #e5e5e5;
		&:first-child{
			border-top: none;
		}
	}
`

const ShippingMethods = class extends React.Component {
	constructor(props) {
		super(props)
		this.close = this.close.bind(this)
		this.clickHandle = this.clickHandle.bind(this)
	}

	close(evt) {
		evt.preventDefault()
		this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
	}

	clickHandle(evt, method) {
		evt.preventDefault()
		this.props.SELECT(method)
		this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
	}

	render() {
		const { methods, selectedMethod, intl } = this.props
		return <FullFixed onClose={this.close} title={intl.formatMessage({ id: 'shipping_method' })}>
			<Methods>
				{
					methods && methods.map(method => (
						<Method onClick={(evt) => { this.clickHandle(evt, method.id) }} className={method.id === selectedMethod.id ? 'selected' : ''}>
							<div>
								{method.title}: <span className="price"><Money money={method.price} /></span>
							</div>

							<div style={{ marginTop: 6 }}>
								{method.shippingTime}
							</div>
						</Method>
					))
				}
			</Methods>

			<div style={{padding: '0 20px 20px 20px'}}>

				<p style={{ fontSize: 12, borderTop: '1px dashed #666', paddingTop: 10 }}><Grey>{intl.formatMessage({ id: 'shipping_tip' })}</Grey></p>
				<div style={{ marginTop: 10 }}>
					<img style={{width:188}} src="https://dgzfssf1la12s.cloudfront.net/upgrade/20210304/shippingmethod.png"/>
				</div>
			</div>

			
		</FullFixed>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ShippingMethods))
