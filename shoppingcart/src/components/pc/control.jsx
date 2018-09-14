import React from 'react'
import { form, control, button } from 'react-validation'

const _form = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => ( // destruct non-valid props
  <form {...props}>{children}</form>
)

const _input = ({ error, isChanged, isUsed, divStyle, ...props }) => (
  <div style={divStyle} className={isChanged && isUsed && error ? 'error' : ''}>
    <input {...props} className="x-default-input"/>
    <div className="__errortext">{isChanged && isUsed && error}</div>
  </div>
)

const _button = ({ hasErrors, ...props }) => {
  return (
    <button {...props} disabled={hasErrors && !props.ingoredisable}/>
  )
}

const _select = ({ error, isChanged, isUsed, ...props }) => (
  <div className={isChanged && isUsed && error ? 'error' : ''}>
    <select {...props} />
    <div className="__errortext">{isChanged && isUsed && error}</div>
  </div>
)

export const Form = form(_form)
export const Input = control(_input)
export const Select = control(_select)
export const Button = button(_button)
