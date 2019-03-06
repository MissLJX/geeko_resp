export const submit = (result) => {
	const { payURL, params } = result
	const form = document.createElement('form')
	form.style.display = 'none'
	form.setAttribute('method', 'POST')
	form.setAttribute('action', payURL)
	let input
	for (let key in params) {
		input = document.createElement('input')
		input.setAttribute('type', 'hidden')
		input.setAttribute('name', key)
		input.setAttribute('value', params[key])
		form.appendChild(input)
	}
	document.body.appendChild(form)
	form.submit()
	document.body.removeChild(form)
}

export const goOrder = ({ result }) => {
	if (result) {
		const { success, transactionId, orderId, details, solutions } = result
		if (success) {
			/*global siteType b:true */
			/*eslint no-undef: "error"*/
			if (siteType === 'new') {
				window.location.href = `${window.ctx || ''}/shoppingcart/order-confirm/credit-card?order_number=${transactionId}`
			} else {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			}
		} else {
			alert(details + '\n' + (solutions || ''))
			if (orderId) {
				window.location.href = `${window.ctx || ''}/checkout/${orderId}`
			}
		}
	}
}