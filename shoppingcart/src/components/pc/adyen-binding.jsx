import React from 'react'
import AdyenCheckout from '@adyen/adyen-web'
import '@adyen/adyen-web/dist/adyen.css'
import {
	adyen_3d_call_back, alyen_check_out
} from '../../api'

export default class extends React.Component{
	constructor(props) {
		super(props)
		this.checkout = new AdyenCheckout({
			locale: window.locale,
			environment: window.adyenEnv,
			clientKey: window.__adyen_pk__,
			showPayButton: true,
			onSubmit: this.onSubmit.bind(this),
			onAdditionalDetails: this.handleOnAdditionalDetails.bind(this)
		})
		this.state = {
			showFrame: false
		}
	}

	onSubmit(state){
		const {checkout} = this.props

		alyen_check_out({
			...state.data,
			orderId: checkout.orderId
		}).then(data => {
			const result = data.result
			if(result){
				const {transactionId, orderId, success, warnMsg, response} = result
				if(success){
					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}?transactionId=${transactionId}`
				}else if(response){
					if(response.action){
						const { action } = response
						const threeDSConfiguration = {
							challengeWindowSize: '05'
						}
						this.checkout.createFromAction(action,threeDSConfiguration).mount('#frame-container')
						this.setState({
							showFrame: true
						})
					}else{
						if (window.isApp) {
							window.location.href = `${window.ctx || ''}/geekopay/app-fail?errMsg=${warnMsg}`
						}else{
							alert(warnMsg || 'Error')
						}
					}
				}else{
					alert(warnMsg || 'Error')
				}
			}


		}).catch(data => {
			self.setState({
				checking: false,
			})
			if(window.isApp){
				window.location.href = `${window.ctx || ''}/geekopay/app-fail?errMsg=${data.result || data}`
			}else{
				alert(data.result || data)
			}
		})

	}

	handleOnAdditionalDetails(state){
		const {checkout} = this.props
		adyen_3d_call_back({transactionId: checkout.transactionId, details: state.data.details}).then(data => {
			const { result } = data
			const {transactionId, orderId, success, warnMsg, response} = result
			if(success){
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}?transactionId=${transactionId}`
			}else{
				alert(warnMsg || 'Error')
			}
		})
	}

	binding(c){
		if(!this.card){
			this.card = this.checkout.create('card').mount('#component-container')
		}
	}


	render(){
		return <React.Fragment>
			<div style={{display: `${this.state.showFrame? 'none': 'block'}`}} id="component-container" ref={this.binding.bind(this)}>

			</div>

			<div id="frame-container" style={{display: `${this.state.showFrame? 'block': 'none'}`}}></div>
		</React.Fragment>
	}
}