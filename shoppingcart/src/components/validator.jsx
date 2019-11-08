import React from 'react'
import validator from 'validator'

export const __reg_zip_us__ = /^(([0-9]{5})|([0-9]{5}-[0-9]{4}))$/
export const __reg_zip_uk__ = /^([a-z]|[A-Z]){1,2}\w{1,2}\s{0,1}[0-9]{1}([a-z]|[A-Z]){2}$/
export const __reg_zip_br__ = /^[0-9]{5}-[0-9]{3}$/

export const __reg_phone_normal__ = /^\d{1,20}$/
export const __reg_phone_br__ = /^\d{8,9}$/
export const __reg_phone_ae_ = /^(50|52|54|55|56|58|2|3|4|6|7|9){1,2}\d{7}$/
export const __reg_phone_sa_ = /^(50|53|55|51|58|59|54|56|57|11|12|13|14|16|17|811){1,3}\d{7}$/

// Argentina DNI or CUIT between 7 to 9, or 11 digits
export const __reg_document_ar__ = /^(\d{7,9}|\d{11})$/

// Chile CI/RUT between 8 to 9 digits
export const __reg_document_cl__ = /^\d{8,9}$/

// Colombia CC between 6 to 10 digits
export const __reg_document_co__ = /^\d{6,10}$/

// Uruguay CI between 6 to 8 digits
export const __reg_document_ur__ = /^\d{6,8}$/

// Mexico CURP between 10 to 18 digits
export const __reg_document_mx__ = /^\d{10,18}$/

// Peru DNI between 8 to 9 digits
export const __reg_document_pe__ = /^\d{8,9}$/

export const cpfcheck = (value) => {
	var result = true 

	value = value.replace('-', '')
	value = value.replace(/\./g, '')

	// this is mostly not needed
	var invalidos = [ '11111111111', '22222222222', '33333333333',
		'44444444444', '55555555555', '66666666666',
		'77777777777', '88888888888', '99999999999',
		'00000000000' ]

	for (let i = 0; i < invalidos.length; i++) {
		if (invalidos[i] == value) {
			result = false
		}
	}

	if (value.length > 11) {
		result = false
	}

	// validando primeiro digito
	let add = 0
	for (let i = 0; i < 9; i++) {
		add += parseInt(value.charAt(i), 10) * (10 - i)
	}
	let rev = 11 - (add % 11)
	if (rev == 10 || rev == 11) {
		rev = 0
	}
	if (rev != parseInt(value.charAt(9), 10)) {
		result = false
	}

	// validando segundo digito
	add = 0
	for (let i = 0; i < 10; i++) {
		add += parseInt(value.charAt(i), 10) * (11 - i)
	}
	rev = 11 - (add % 11)
	if (rev == 10 || rev == 11) {
		rev = 0
	}
	if (rev != parseInt(value.charAt(10), 10)) {
		result = false
	}

	return result
}

export const required = (value) => {
	if (!value || !value.toString().trim().length) {
		return 'required'
	}
}

export const number = (value) => {
	if (value && !validator.isInt(value, {min: 0, max: 99})) {
		return <p></p>
	}
}

export const email = (value) => {
	const trimedEmail = value ? value.trim(): value
	if (!validator.isEmail(trimedEmail)) {
		return <p>{value} is not a valid email</p>
	}
}

export const cpf = (value) => {
	if (!cpfcheck(value)) { return <p>{value} is not a valid cpf</p> }
}

export const zip = (value, props, components) => {
	const country = components['country'][0].value
	let reg, error
	switch (country) {
	case 'US':
		reg = __reg_zip_us__
		error = 'Please enter 5 digits or 5 digits with a 4-digits number (E.g. 20001 or 20001-0000)'
		break
	case 'GB':
		reg = __reg_zip_uk__
		error = 'Wrong ZIP CODE! Please offer us one or two-letter and one-two figures with a space end with one figure and two letters. (e.g. TN37 7HL,CW8 3AD)'
		break
	case 'BR':
		reg = __reg_zip_br__
		error = 'O formato do endereço está incorreto, preencha o formulário de [01310-000]'
		break
	default:
		break
	}

	if (reg && !reg.test(value)) {
		return error
	}
}

export const phone = (value, props, components) => {
	const country = components['country'][0].value
	let reg, error
	switch (country) {
	case 'BR':
		reg = __reg_phone_br__
		error = 'Insira pelo menos 8-9 números.'
		break
	case 'AE':
		reg = __reg_phone_ae_
		error = 'Phone numbers should start with 50/52/54/55/56/58/2/3/4/6/7/9, followed by any 7 digits.'
		break
	case 'SA':
		reg = __reg_phone_sa_
		error = 'Phone numbers should start with 50/53/55/51/58/59/54/56/57/11/12/13/14/16/17/811, followed by any 7 digits.'
		break
	default:
		reg = __reg_phone_normal__
		error = 'Incorrect phone number format (numbers only, no formatting)'
		break
	}
	if (reg && !reg.test(value)) {
		return error
	}
}

export const dni = (country) => {
	let reg, error
	switch (country) {
	case 'AR':
		reg = __reg_document_ar__
		error = 'DNI debe estar entre 7 a 9, u 11 dígitos'
		break
	case 'CL':
		reg = __reg_document_cl__
		error = 'CI/RUT debe tener entre 8 y 9 dígitos'
		break
	case 'CO':
		reg = __reg_document_co__
		error = 'Cédula de ciudadanía debe tener entre 6 y 10 dígitos'
		break
	case 'UY':
		reg = __reg_document_ur__
		error = 'Cédula de identidad debe tener entre 6 y 8 dígitos'
		break
	case 'MX':
		reg = __reg_document_mx__
		error = 'Cédula de identidad debe tener entre 10 y 18 dígitos'
		break
	case 'PE':
		reg = __reg_document_pe__
		error = 'Cédula de identidad debe tener entre 8 y 9 dígitos'
		break
	default:
		reg = /\d/
		error = 'Incorrect document'
		break
	}
 
	return (value) => {
		if (reg && !reg.test(value)) {
			return error
		}
	}
}

export const getDNI = (payMethod) => {
	switch (payMethod) {
	case '26':
	case '27':
	case '28':
		return dni('AR')
	case '30':
	case '31':
	case '32':
		return dni('CO')
	case '33':
	case '34':
	case '35':
		return dni('CL')
	case '36':
	case '37':
		return dni('UY')
	case '39':
	case '40':
	case '41':
		return dni('MX')
	case '42':
	case '43':
	case '44':
		return dni('PE')
	default:
		return dni('US')
	}
}
