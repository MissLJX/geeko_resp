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
			window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
		} else {
			alert(details + '\n' + (solutions || ''))
			if (orderId) {
				window.location.href = `${window.ctx || ''}/checkout/${orderId}`
			}
		}
	}
}

export const payHandler = ( result ) => {
	if(result){
		const { success, transactionId, orderId, details, solutions } = result
		if(success){
			window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
		}else{
			alert(`${details}\n${solutions?solutions:''}`)
			if (orderId) {
				this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
			}
		}
	}
	this.setState({
		checking: false
	})
}


