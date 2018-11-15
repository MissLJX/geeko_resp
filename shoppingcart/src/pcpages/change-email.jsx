import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Modal } from '../components/pc/modal.jsx'
import {injectIntl} from 'react-intl'
import {__route_root__} from '../utils/utils.js'
import {BigButton} from '../components/msite/buttons.jsx'

import {Form, Input, Button} from '../components/pc/control.jsx'
import {required, email} from '../components/validator.jsx'
import {FormElement, ELEMENTS} from '../components/pc/styled-control.jsx'

import {changeCommunicationEmail} from '../api'
import { fetchMe } from '../store/actions.js'

const PHONEBODY = styled.div`
  padding: 40px;
  background-color: #fff;
  width: 400px;

  .__title{
    font-family: HelveticaNeue-Medium;
    font-size: 20px;
    color: #222;
  }
`

const mapStateToProps = (state) => {
  return {
    me: state.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    REFRESHME: () => {
      dispatch(fetchMe())
    }
  }
}

const ChagePhone = class extends React.Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      email: '',
      updating: false
    }
  }

  componentWillMount () {
    const {me} = this.props
    if (me) {
      this.setState({
        email: me.communicationEmail
      })
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
    const { me } = this.props
    this.form.validateAll()
    if (!this.btn.context._errors || !this.btn.context._errors.length) {
    	this.setState({
    		updating: true
    	})
      changeCommunicationEmail(me.id, this.state.email).then(() => {
      	this.setState({
      		updating: false
      	})
      	this.props.history.goBack()
      	this.props.REFRESHME()
      }).catch(({result}) => {
      	alert(result)
      	this.setState({
      		updating: false
      	})
      })
    }
  }

  render () {
    const { me, intl } = this.props

    return <Modal onClose={this.close.bind(this)}>
      {
        me && <PHONEBODY>
          <div className="__title">Change Phone Number</div>
          <Form style={{marginTop: 15}} ref={ c => this.form = c } onSubmit={ this.handleSubmit.bind(this) }>

            <ELEMENTS>
              <FormElement className="__required">
                <Input
                  name='email'
                  divStyle={{width: '100%', display: 'inline-block', verticalAlign: 'middle'}}
                  style= {{width: '100%', height: 40}}
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  validations={[required, email]}/>
              </FormElement>
              <FormElement>
                {
                  this.state.updating ? <BigButton className="__btn" height={40} bgColor="#999">
                    {intl.formatMessage({id: 'please_wait'})}...
                  </BigButton> : <Button className="__submitbtn" ref={c => this.btn = c} ingoredisable="true" style={{
                    display: 'block',
                    backgroundColor: '#e64545',
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
                  }}>{intl.formatMessage({id: 'confirm'})}</Button>

                }
              </FormElement>
            </ELEMENTS>
          </Form>
        </PHONEBODY>
      }

    </Modal>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ChagePhone))
