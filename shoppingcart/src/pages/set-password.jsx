import React from 'react'
import styled from 'styled-components'
import FullFixed from '../components/msite/full-fixed.jsx'
import { changepassword } from '../api'
import {injectIntl} from 'react-intl'
import {__route_root__} from '../utils/utils.js'
import {BigButton} from '../components/msite/buttons.jsx'
import {Form, Input, Button} from '../components/msite/control.jsx'

import {required, email, zip, phone} from '../components/validator.jsx'
import {StyledControl} from '../components/msite/styled-control.jsx'

const Modal = class extends React.Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.state = {
      password: null
    }
  }

  close () {
    this.props.history.goBack()
  }

  handlePassword (evt) {
    this.setState({
      password: evt.target.value
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

    return <FullFixed onClose={this.close} title={intl.formatMessage({id: 'set_password'})}>
      <Form style={{padding: 10}} ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <StyledControl>
            <label>
              {`Set your new password`}*
            </label>
            <Input
              name='password'
              type="password"
              maxLength={20}
              value={this.state.password}
              onChange={this.handlePassword.bind(this)}
              validations={[required]}/>
          </StyledControl>

        </div>

        <div style={{marginTop: 20}}>
          <Button className="__submitbtn" ref={c => this.passwordBtn = c} ingoredisable="true" style={{
            display: 'block',
            backgroundColor: '#222',
            color: '#fff',
            height: 40,
            lineHeight: '40px',
            textAlign: 'center',
            outline: 'none',
            border: 'none',
            width: '100%'
          }}>{intl.formatMessage({id: 'submit'})}</Button>
        </div>
      </Form>

    </FullFixed>
  }
}

export default injectIntl(Modal)
