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

    return <FullFixed onClose={this.close} title={`Change Email`}>

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
