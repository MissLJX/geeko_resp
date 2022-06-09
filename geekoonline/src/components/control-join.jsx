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

  &::placeholder{
    color:#666666;
  }
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
    width: 100% ;
    height: 36px;
    background-color: #ffffff;
    // border: solid 1px #cccccc;
    line-height: 38px;
    position: relative;
    cursor: pointer;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

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
      border:none;
    }
`;

const ERRORCONTAINER = Styled.div`
    &.error{
      & > input{
        &::placeholder{
          color:#e64545;
          font-weight:bold;
        }
      }

      & > textarea{
        &::placeholder{
          color:#e64545;
          font-weight:bold;
        }
      }
    }
    
    &.__error{
      & > input{
        color:#e64545;
      }
    }
`;


const _form = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => ( // destruct non-valid props
  <form {...props}>{children}</form>
)

const _input = ({ error, isChanged, isUsed, divStyle, ...props }) => (
  
  <ERRORCONTAINER style={divStyle} className={isChanged && isUsed && error ? 'error __error' : ''}>
    <INPUT {...props} placeholder={isChanged && isUsed && error || props.placeholder} />
    <div className="__errortext"></div>
  </ERRORCONTAINER>
)

const _textarea = ({ error, isChanged, isUsed, divStyle, ...props }) => (
  <ERRORCONTAINER style={divStyle} className={isChanged && isUsed && error ? 'error' : ''}>
    <TEXTAREA {...props} placeholder={isChanged && isUsed && error || props.placeholder} />
    <div className="__errortext"></div>
  </ERRORCONTAINER>
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
     <span className="__text">{props.fileName || props.text}</span>
    </FILE>

    <div className={isChanged&&isUsed&& error?"__errortext":""} style={{lineHeight: '20px',fontWeight: 'bold'}}>{props.description}</div>
  </div>
)

export const Form = form(_form)
export const Input = control(_input)
export const TextArea = control(_textarea)
export const Select = control(_select)
export const Button = button(_button)
export const File = control(_fileinput)
