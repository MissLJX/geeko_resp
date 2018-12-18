import React from 'react'
import styled from 'styled-components'
import FullFixed from '../components/msite/full-fixed.jsx'
import {injectIntl} from 'react-intl'
import { connect } from 'react-redux'
import {BigButton} from '../components/msite/buttons.jsx'
import {Form, Input, Button} from '../components/msite/control.jsx'
import {FormLayout} from '../components/msite/layout.jsx'
import {required, email} from '../components/validator.jsx'
import {StyledControl} from '../components/msite/styled-control.jsx'
import {changeCommunicationEmail} from '../api'
import { fetchMe } from '../store/actions.js'

const mapStateToProps = (state) => {
  return {
    me: state.me,
    transaction: state.transaction
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    REFRESHME: (me) => {
      dispatch(fetchMe(me))
    }
  }
}

const Modal = class extends React.Component {
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

  close () {
    this.props.history.replace(`${window.ctx || ''}/order-confirm/${this.props.transaction.transactionId}`)
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
    const { me, transaction } = this.props
    this.form.validateAll()
    if (!this.btn.context._errors || !this.btn.context._errors.length) {
    	this.setState({
    		updating: true
    	})
      changeCommunicationEmail(transaction.transactionId, this.state.email).then(() => {
      	this.setState({
      		updating: false
      	})
      	this.close()
      	if (window.__is_login__) {
          this.props.REFRESHME()
        } else {
          this.props.REFRESHME({...me, communicationEmail: this.state.email})
        }
      }).catch((err) => {
        if (err.result) {
          alert(err.result)
        } else {
          alert(err)
        }

      	this.setState({
      		updating: false
      	})
      })
    }
  }

  render () {
    const { me, intl } = this.props

    return <FullFixed onClose={this.close} title={intl.formatMessage({id: 'change_email'})}>

    	{
    		me && <Form style={{padding: 20}} ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>

    			 <FormLayout>
    			 	<StyledControl>

              <div>
                <Input
                  name='email'
                  divStyle={{width: '100%', display: 'inline-block', verticalAlign: 'middle'}}
                  value={this.state.email}
                  type="email"
                  onChange={this.handleInputChange}
                  validations={[required, email]}/>
              </div>

	          </StyledControl>

	          <div style={{marginTop: 20}}>
		          <Button className="__submitbtn" ref={c => this.btn = c} ingoredisable="true" style={{
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
    			 </FormLayout>
    		</Form>
    	}

    </FullFixed>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Modal))
