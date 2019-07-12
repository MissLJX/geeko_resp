import React from 'react'
import Styled from 'styled-components'
import { form, control, button } from 'react-validation'

const INPUT = Styled.input`
  height: 36px;
  background-color: #ffffff;
  border: solid 1px #ebebeb;
  outline: none;
  box-shadow: none;
  width: 100%;
  padding-left: 10px;
`

const TEXTAREA = Styled.textarea`
  height: 150px;
  background-color: #ffffff;
  border: solid 1px #ebebeb;
  outline: none;
  box-shadow: none;
  width: 100%;
  padding-left: 10px;
`

const SELECT = Styled.select`
  height: 36px;
  background-color: #ffffff;
  border: solid 1px #ebebeb;
  outline: none;
  box-shadow: none;
  width: 100%;
  padding-left: 10px;
`
const FILE = Styled.div`
    width: 185px;
    height: 40px;
    background-color: #f9fafa;
    border: solid 1px #cccccc;
    line-height: 38px;
    position: relative;
    cursor: pointer;
    text-align: center;
    & > input{
      width: 100%;
      height: 100%;
      opacity: 0;
      filter: Alpha(opacity=0);
      -webkit-appearance: none;
      outline: none;
      box-shadow: none;
      position: absolute;
      top:0;
      left: 0;
      
    }



`


const _form = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => ( // destruct non-valid props
  <form {...props}>{children}</form>
)

const _input = ({ error, isChanged, isUsed, divStyle, ...props }) => (
  <div style={divStyle} className={isChanged && isUsed && error ? 'error' : ''}>
    <INPUT {...props}/>
    <div className="__errortext">{isChanged && isUsed && error}</div>
  </div>
)

const _textarea = ({ error, isChanged, isUsed, divStyle, ...props }) => (
  <div style={divStyle} className={isChanged && isUsed && error ? 'error' : ''}>
    <TEXTAREA {...props}/>
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
    <SELECT {...props} />
    <div className="__errortext">{isChanged && isUsed && error}</div>
  </div>
)

const _fileinput = ({ error, isChanged, isUsed, divStyle, ...props }) => (
  <div style={divStyle} className={isChanged && isUsed && error ? 'error' : ''}>
    <FILE>
     <INPUT  {...props}/>
     <span className="__text">{props.text}</span>
    </FILE>
    <div className="__errortext">{isChanged && isUsed && error}</div>
  </div>
)

export const Form = form(_form)
export const Input = control(_input)
export const TextArea = control(_textarea)
export const Select = control(_select)
export const Button = button(_button)
export const File = control(_fileinput)
