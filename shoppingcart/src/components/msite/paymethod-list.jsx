import React from 'react'
import styled from 'styled-components'
import CheckBox from '../checkbox.jsx'
import {Grey} from '../text.jsx'
import Ask from '../ask.jsx'

import {Form, Input, Button} from './control.jsx'
import {required, email, cpf} from '../validator.jsx'
import {StyledControl} from './styled-control.jsx'

const METHODBD = styled.div`
  background-color: #e5e5e5;
  position: relative;
  padding: 20px 10px;
  &::before{
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    transform: rotate(-45deg);
    background-color: #e5e5e5;
    top: -7px;
    left: 12px;
    position: absolute;
  }
`

const MethodInputLine = styled.div`
  & > div{
    &:first-child{
      width: 70px;
    }
  }
`

const Boleto = class extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSubmit () {

  }

  render () {
    return <METHODBD>
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <MethodInputLine className="x-table x-fw __vm __fixed">
          <div className="x-cell">
            <label>CPF<Ask style={{marginLeft: 4}} onClick={this.props.cpfClickHandle.bind(this)}/></label>
          </div>
          <div className="x-cell">
            <StyledControl inputColor="#fff">
              <Input
                name='cpf'
                value={this.props.cpf}
                onChange={this.props.handleInputChange}
                validations={[required, cpf]}/>
            </StyledControl>
          </div>
        </MethodInputLine>

        <MethodInputLine style={{marginTop: 10}} className="x-table x-fw __vm __fixed">
          <div className="x-cell">
            <label>EMAIL*</label>
          </div>

          <div className="x-cell">
            <StyledControl inputColor="#fff">
              <Input
                name='email'
                value={this.props.email}
                onChange={this.props.handleInputChange}
                validations={[required, email]}/>
            </StyledControl>
          </div>
        </MethodInputLine>
        <Button style={{display: 'none'}} ref={this.props.boleto}></Button>
      </Form>
    </METHODBD>
  }
}

const StyledMethod = styled.div`
	
`
const BD = styled.div`
`

const HD = styled.div`
	height: 50px;

	img{
		height: 22px;
		display: inline-block;
		margin-right: 10px;
	}
`

const Method = class extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {payMethod, children, selectPayHandle, selected} = this.props
    return <StyledMethod onClick={() => { selectPayHandle(payMethod) }}>
      <HD>
        <div className="x-table x-fw x-fh __fixed __vm">
          <div className="x-cell">
            <img style={{verticalAlign: 'middle'}} src={payMethod.icon}/>
            <Grey style={{verticalAlign: 'middle'}} style={{fontSize: 15}}>{payMethod.name}</Grey>
          </div>
          <div className="x-cell __right" style={{width: 50}}>
            <CheckBox className={selected ? 'selected' : ''}/>
          </div>
        </div>
      </HD>

      {children && selected && <BD>
        {children}
      </BD>}
    </StyledMethod>
  }
}

const MethodUL = styled.ul`
  & > li{
    border-top: 1px solid #e5e5e5;
    &:first-child{
      border-top: none;
    }
  }
`

const getMethodBody = (id, {cpf, email, handleInputChange, boleto, cpfClickHandle}) => {
  switch (id) {
    case '16':
      return <Boleto boleto={boleto} cpf={cpf} email={email} cpfClickHandle={cpfClickHandle} handleInputChange={handleInputChange}/>
    default:
      return null
  }
}

const PayMethodList = class extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {methods, selectPayHandle, selectedPayId} = this.props
    return <MethodUL>
      {
        methods && methods.map(payMethod => (
          <li key={payMethod.id}>
            <Method selected={payMethod.id === selectedPayId} selectPayHandle={selectPayHandle} payMethod={payMethod}>
              {getMethodBody(payMethod.id, this.props)}
            </Method>
          </li>
        ))
      }
    </MethodUL>
  }
}

export default PayMethodList
