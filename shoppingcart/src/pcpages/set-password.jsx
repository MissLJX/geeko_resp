import React from 'react'
import styled from 'styled-components'
import { changepassword } from '../api'
import {injectIntl} from 'react-intl'
import {__route_root__} from '../utils/utils.js'
import { Modal } from '../components/pc/modal.jsx'

import {Form, Input, Button} from '../components/pc/control.jsx'
import {required} from '../components/validator.jsx'
import {FormElement, ELEMENTS} from '../components/pc/styled-control.jsx'
import {BigButton} from '../components/msite/buttons.jsx'
import { Red } from '../components/text.jsx'

const PASSWORD_BODY = styled.div`
    padding: 40px;
    background-color: #fff;
    width: 400px;

  .__title{
    font-family: HelveticaNeue-Medium;
    font-size: 24px;
    color: #222;
  }
`

const SetPassword = class extends React.Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.state = {
      password: null,
      confirm: null,
      updating: false
    }
  }

  close (evt) {
    evt.preventDefault()
    this.props.history.goBack()
  }

  handleInputChange (event) {
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.form.validateAll()
    if (!this.passwordBtn.context._errors || !this.passwordBtn.context._errors.length) {
      changepassword(this.state.password).then(() => {
        window.location.href = `${window.ctx || ''}/me/m/order`
      })
    }
  }

  render () {
    const { intl } = this.props
    return <Modal onClose={this.close.bind(this)}>
      <PASSWORD_BODY>
        <div style={{paddingTop: 10}}>
          <div>
            <span>Your Account: </span>
            <Red>shaolei@163.com</Red>
          </div>
          <Form style={{marginTop: 10}} ref={ c => this.form = c } onSubmit={ this.handleSubmit.bind(this) }>
            <ELEMENTS>
              <FormElement label={`${intl.formatMessage({id: 'set_password'})}:`} className="__required">
                <Input
                  name='password'
                  type="password"
                  style= {{width: '100%', height: 40}}
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  validations={[required]}/>
              </FormElement>

              <FormElement>
                {
                  this.state.updating ? <BigButton className="__btn" height={40} bgColor="#999">
                    {intl.formatMessage({id: 'please_wait'})}...
                  </BigButton> : <Button className="__submitbtn" ref={c => this.passwordBtn = c} ingoredisable="true" style={{
                    display: 'block',
                    backgroundColor: '#e7004d',
                    borderRadius: 2,
                    color: '#fff',
                    height: 40,
                    lineHeight: '40px',
                    textAlign: 'center',
                    outline: 'none',
                    border: 'none',
                    width: '100%',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontSize: 16
                  }}>{intl.formatMessage({id: 'save'})}</Button>

                }
              </FormElement>
            </ELEMENTS>
          </Form>
        </div>
      </PASSWORD_BODY>
    </Modal>
  }
}

export default injectIntl(SetPassword)
