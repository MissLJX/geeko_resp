import React from 'react'
import validator from 'validator'

export const __reg_phone__ = /^\d{1,20}$/


export const required = (value) => {
	if (!value || !value.toString().trim().length) {
		return '此项为必填'
	}
}

export const number = (value) => {
	if (value && !validator.isInt(value, {min: 0, max: 99})) {
		return `必须为0到99的数字`
	}
}

export const email = (value) => {
	if (!validator.isEmail(value)) {
		return `${value} 不是个正确的电子邮件地址`
	}
}

export const phone = (value) => {
  if(!__reg_phone__.test(value)){
    return '请填写正确的电话号码'
  }
}
