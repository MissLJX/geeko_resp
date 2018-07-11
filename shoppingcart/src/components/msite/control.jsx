import React from 'react'
import { form, control, button } from 'react-validation'

const _form = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => ( // destruct non-valid props
  <form {...props}>{children}</form>
)

const _input = ({ error, isChanged, isUsed, ...props }) => (
  <div className={isChanged && isUsed && error ? 'error' : ''}>
    <input {...props} />
    <p>{isChanged && isUsed && error}</p>
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
    <p>{isChanged && isUsed && error}</p>
  </div>
)

export const Form = form(_form)
export const Input = control(_input)
export const Select = control(_select)
export const Button = button(_button)
