import React from 'react'
import {Link} from 'react-router-dom'
import {get, getByOrderId, sendImage, sendTicket} from '../api'
import styled from 'styled-components'
import {GeekoSelect, ColoredButton, PageHeader, PageContanier} from '../components/buttons.jsx'
import _ from 'lodash'
import {gloabvars} from '../commons/instance.js'
import {FormattedMessage, injectIntl} from 'react-intl'

import {
  OrderSelector,
  LabelValueContainer,
  OrderInfoContainer,
  ChatTip,
  ChatRow,
  ChatRows,
  Chat,
  ChatContainer,
  ChatSendor,
  ImageLoader
} from '../components/styled-ticket.jsx'

const Ticket = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    	ticket: null,
    	order: null,
    	cusomerName: null,
    	headSculptureUrl: null,
    	loading: true,
    	isNew: false,
    	// controlled
      subject: 0,
      message: '',
      image: null,

      orderInvalid: false,
      messageInvalid: false
    }
    this.handleImage = this.handleImage.bind(this)
    this.handleTicket = this.handleTicket.bind(this)
  }

  handleImage (evt) {
  	evt.preventDefault()
    if (!this.validate(true)) {
      return false
    }

  	const files = evt.currentTarget.files
    const maxSize = 2097152

    if (files[0].size < maxSize) {
    	const formData = new FormData(this.refs.imageForm)
	  	formData.append('operaId', this.state.order.id)
	    formData.append('subject', this.state.subject)
	    formData.append('message', this.state.message || '-')
	    sendImage(formData).then(({result}) => {
	    	const file = files[0]
        	const src = window.navigator.userAgent.indexOf('Chrome') >= 1 || window.navigator.userAgent.indexOf('Safari') >= 1 ? window.webkitURL.createObjectURL(file) : window.URL.createObjectURL(file)
	    	let ticket = this.state.ticket
	  		let replies = (ticket.ticketReplies || []).concat([])
	  		replies.push({
	  			sender: 'buyers',
	  			message: this.state.message,
	  			imageUrls: [src],
	  			date: new Date().getTime()
	  		})

	  		ticket.ticketReplies = replies

	  		this.setState({
	  			ticket,
          message: ''
	  		})

	  		this.initScroll()
	    })
    } else {
      	alert('A single image should not exceed 2M')
    }
  }

  validate (ignoreMessage) {
    this.setState({
      orderInvalid: !this.state.order,
      messageInvalid: !this.state.message && !ignoreMessage
    })
    return this.state.order && (this.state.message || ignoreMessage)
  }

  handleTicket (evt) {
    if (!this.validate()) {
      return false
    }

  	sendTicket({
  		operaId: this.state.order.id,
  		subject: this.state.subject,
  		message: this.state.message
  	}).then((data) => {
  		let ticket = this.state.ticket || {}
  		let replies = (ticket.ticketReplies || []).concat([])
  		replies.push({
  			sender: 'buyers',
  			message: this.state.message,
  			date: new Date().getTime()
  		})

  		ticket.ticketReplies = replies

  		this.setState({
  			ticket,
  			message: ''
  		})

  		this.initScroll()
  	})
  }

  initScroll () {
  	setTimeout(() => {
  			this.chatDiv.scrollTop = this.chatDiv.scrollHeight
  		}, 200)
  }

  componentWillMount () {
  	const {id} = this.props.match.params

  	if (id) {
  		get(id).then(({result}) => {
	  		const {ticket, order, cusomerName, headSculptureUrl} = result
	  		this.setState({
	  			ticket,
	  			order,
	  			cusomerName,
	  			headSculptureUrl,
	  			loading: false,
	  			subject: ticket.subject

	  		})

	  		this.initScroll()
  		})
  	} else {
      if (gloabvars.selectedOrder) {
        getByOrderId(gloabvars.selectedOrder.id).then(({result}) => {
          const {ticket, order, cusomerName, headSculptureUrl} = result
          this.setState({
            isNew: true,
            ticket,
            order,
            cusomerName,
            headSculptureUrl,
            loading: false,
            subject: ticket ? ticket.subject : 0
          })
          this.initScroll()
        })
      } else {
        this.setState({
          isNew: true,
          loading: false,
          order: gloabvars.selectedOrder
        })
      }
  	}
  }

  render () {
    const {intl} = this.props

    //   subjectsizecolor: '尺码相关',
    // subjectaddress: '更改收货地址',
    // subjectshipping: '物流以及预计到达日期',
    // subjectwrong: '物品收错',
    // subjectshippingmethod: '更改物流方式',
    // subjectreturn: '退货或调换',
    // subjectrefund: '退款 / 取消订单',
    // subjectother: '其他'

  	const questions = [
      {label: intl.formatMessage({id: 'subjectsizecolor'}), value: '0', selected: false},
      {label: intl.formatMessage({id: 'subjectaddress'}), value: '2', selected: false},
      {label: intl.formatMessage({id: 'subjectshipping'}), value: '3', selected: false},
      {label: intl.formatMessage({id: 'subjectwrong'}), value: '4', selected: false},
      {label: intl.formatMessage({id: 'subjectshippingmethod'}), value: '5', selected: false},
      {label: intl.formatMessage({id: 'subjectreturn'}), value: '6', selected: false},
      {label: intl.formatMessage({id: 'subjectrefund'}), value: '8', selected: false},
      {label: intl.formatMessage({id: 'subjectother'}), value: '7', selected: false}
    ]

  	const LabelValue = (props) => {
  		return <div>
  			<label style={{marginRight: '5px', color: '#999'}}>{props.label}</label>
  			<span style={{color: '#222'}}>{props.value}</span>
  		</div>
  	}

  	const paymentTime = (time) => {
  		return time ? new Date(time).toLocaleDateString() : '-'
  	}

  	const ticketOrder = this.state.order ? (
  			<LabelValueContainer>
  				<LabelValue label={intl.formatMessage({id: 'orderno'})} value={this.state.order.id}/>
  				<LabelValue label={intl.formatMessage({id: 'paymenttime'})} value={paymentTime(this.state.order.paymentTime)}/>
        {this.state.isNew && <Link to="/support/orders" className="iconfont">&#xe66b;</Link>}

  			</LabelValueContainer>
  		) : (
      		<OrderSelector className={this.state.orderInvalid ? 'invalid' : ''}>
	      		<Link to="/support/orders">
	      			<FormattedMessage id="selectorder"/>
	      			<i className="iconfont">&#xe694;</i>
	      		</Link>
	      	</OrderSelector>
  		)

  	const groupReplies = (replies) => {
  		var groups = _.groupBy(replies, function (obj) {
	                    return new Date(obj.date).toLocaleDateString()
	                })
  		return groups
  	}

  	const getImageUrl = (url) => {
  		if (url.indexOf('blob') >= 0 || url.indexOf('http') >= 0) {
  			return url
  		}
  		return `https://dgzfssf1la12s.cloudfront.net/ticket/${url}`
  	}

  	const ReplyTip = (props) => {
  		const imageUrls = props.reply.imageUrls
  		const message = props.reply.message === '-' ? '' : props.reply.message

  		return <ChatTip className={props.reply.sender === 'buyers' ? 'buyer' : 'seller'}>
		  			{
		  				imageUrls && imageUrls.map(image => (
		  					<img key={image} src={getImageUrl(image)} />
		  				))

		  			}
		  			<p>{message}</p>
  				</ChatTip>
  	}

  	const HeaderImage = ({image, sender}) => {
  		return <div style={{
  			backgroundImage: sender === 'buyers' ? `url(https://dgzfssf1la12s.cloudfront.net/icon/${image}) ,url(https://dgzfssf1la12s.cloudfront.net/site/pc/icon35.png)` : 'url(https://dgzfssf1la12s.cloudfront.net/icon/support.jpg)',
  			backgroundSize: 'cover',
  			display: 'inline-block',
  			width: '50px',
  			height: '50px',
  			borderRadius: '50%'
  		}}></div>
  	}

  	const GroupReplyHtmls = (props) => {
  		const replies = props.replies

  		return <ChatRows>
  				{
		  			replies.map((reply, index) => (
			  			<ChatRow className={reply.sender === 'buyers' ? 'buyer' : 'seller'} key={index}>
			  				<HeaderImage image={props.headSculptureUrl} sender={reply.sender} />
			  				<ReplyTip reply={reply} />
			  			</ChatRow>
		  			))
	  			}
  			</ChatRows>
  	}

    return <div>
      <PageHeader label={intl.formatMessage({id: 'submitticket'})}/>
      <PageContanier>
        { this.state.loading ? (
      	<div style={{height: '50px', lineHeight: '50px', fontSize: '12px', textAlign: 'center', color: '#666'}}>
      		<FormattedMessage id="loading"/>
      	</div>

        ) : (

      	<ChatContainer className="x-flex __column">
      		<OrderInfoContainer>
      			{ticketOrder}
      			<div style={{borderTop: '1px solid #cacaca', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '15px'}}>
      				<h1 style={{fontSize: '18px', fontWeight: '400', textAlign: 'center'}}><FormattedMessage id="helpyou"/></h1>
      				<div>
      					<GeekoSelect value={this.state.subject} onChange={(evt) => { this.setState({subject: evt.currentTarget.value}) }} style={{width: '100%', height: '40px', marginTop: '10px'}}>
      						{questions.map(q => (
      							<option key={q.value} value={q.value}>{q.label}</option>
      						))}
      					</GeekoSelect>
      				</div>
      				<div style={{fontSize: '13px', textAlign: 'center', color: '#999', marginTop: '10px'}}><FormattedMessage id="responetime"/></div>
      			</div>
      		</OrderInfoContainer>

      		<Chat innerRef={(div) => { this.chatDiv = div }}>
      			{this.state.ticket && this.state.ticket.ticketReplies && _.map(groupReplies(this.state.ticket.ticketReplies), (group, index) => (
      				<div key={index}>
      					<div style={{textAlign: 'center', color: '#999', fontSize: '12px', height: '40px', lineHeight: '40px'}}>{index}</div>
      					<GroupReplyHtmls headSculptureUrl={this.state.headSculptureUrl} replies={group}/>
      				</div>
      			))}
      		</Chat>
      		<ChatSendor>
      			<textarea className={this.state.messageInvalid ? 'invalid' : ''} onChange={(evt) => { this.setState({message: evt.currentTarget.value, messageInvalid: false}) }} value={this.state.message} style={{border: '1px solid #666', width: '100%', height: '80px'}}></textarea>
      			<div style={{marginTop: '5px'}}>
	      				<div className="x-fw x-table __vm">
	      					<div className="x-cell">
	      						<form ref="imageForm">
		      						<ImageLoader>
					                    <input id="imageFiles" name="imageFiles"
					                      multiple="multiple" type="file"
					                      accept="image/jpg,image/jpeg,image/png,image/gif"
					                      onChange={this.handleImage}/>
		      						</ImageLoader>
	      						</form>
	      					</div>

	      					<div className="x-cell" style={{textAlign: 'right'}}>
	      						<ColoredButton onClick={this.handleTicket} style={{fontSize: '14px', fontWeight: '400', height: '30px', width: '70px'}} btnColor="#000"><FormattedMessage id="send"/></ColoredButton>
	      					</div>
	      				</div>
      			</div>
      		</ChatSendor>
      	</ChatContainer>

        ) }
      </PageContanier>
    </div>
  }
}

export default injectIntl(Ticket)