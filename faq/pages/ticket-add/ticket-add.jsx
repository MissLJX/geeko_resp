import React from 'react'
import {Link} from 'react-router-dom'
import {get, getByOrderId, sendImage, sendTicket} from '../../api'
import styled from 'styled-components'
import {GeekoSelect, ColoredButton, PageHeader, PageContanier} from '../../components/buttons.jsx'
import _ from 'lodash'
import {gloabvars} from '../../commons/instance.js'
import {FormattedMessage, injectIntl} from 'react-intl'
import HtmlImageCompress from 'html-image-compress'
import style from './ticket-add.module.css';

import PageHeader1 from '../../components/page-header/page-header';
import PageContanier1 from '../../components/page-contanier/page-contanier';

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
} from '../../components/styled-ticket.jsx'
import SelectType from '../../components/select-type/select-type'

const RATE = styled.span`
	font-family: iconfont;
	font-size: 30px;
`
class TicketAdd extends React.Component {
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
      messageInvalid: false,

      showTip: false, // 最后一条聊天记录是不是用户的 是的话提示客服会在24h内回复
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

    const htmlImageCompress = new HtmlImageCompress(files[0], {quality: 0.7, imageType: files[0].type})
    htmlImageCompress.then((result) => {
      const {file, fileSize} = result

      const formData = new FormData()
      formData.append('operaId', this.state.order.id)
      formData.append('subject', this.state.subject)
      formData.append('message', this.state.message || '-')
      formData.append('imageFiles', file)
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
    })
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
    const id = this.props.location.search.split('=')[1]
    console.log(id)
    if (id) {
      localStorage.__order = ""
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
      }).catch((data) => {
        alert(data.result)
        if (data.code === 401) {
          window.location.href = `${window.ctx || ''}/me/m`
        }
      })
    } else {
      console.log(localStorage.__order)
      if (localStorage.__order) {
        
        getByOrderId(JSON.parse(localStorage.__order).id).then(({result}) => {
          const {ticket, order, cusomerName, headSculptureUrl} = result
          // console.log(ticket.ticketReplies.slice(-1)[ticket.ticketReplies.slice(-1).length - 1]['sender'])
          if(ticket){
            if(ticket.ticketReplies.slice(-1)[ticket.ticketReplies.slice(-1).length - 1]['sender'] == "buyers"){
              this.setState({
                showTip:true
              })
            } else {
              this.setState({
                showTip: false
              })
            }
          }
          
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
        }).catch((data) => {
          alert(data.result)
          if (data.code === 401) {
            window.location.href = `${window.ctx || ''}/me/m`
          }
        })
      } else {
        this.setState({
          isNew: true,
          loading: false,
          order: {}
        })
      }
    }
  }

  componentWillUnmount(){
    localStorage.__order = ''
  }

  render () {
    const {intl, location} = this.props

    const isFromNotification = location.search && location.search.indexOf('utm_source=pcnotification') >= 0

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
        {this.state.isNew && <Link to={`${window.ctx||''}/support/orders`} className="iconfont">&#xe66b;</Link>}

      </LabelValueContainer>
    ) : (
      <OrderSelector className={this.state.orderInvalid ? 'invalid' : ''}>
        <Link to={`${window.ctx||''}/support/orders`}>
          <FormattedMessage id="selectorder"/>
          <i className="iconfont">&#xe694;</i>
        </Link>
      </OrderSelector>
    )

    const groupReplies = (replies) => {
      var groups = _.groupBy(replies, function (obj) {
        return new Date(obj.date).toLocaleDateString() + " " + new Date(obj.date).toTimeString().substr(0, 5);
      })
      return groups
    }

    const getImageUrl = (url) => {
      if (url.indexOf('blob') >= 0 || url.indexOf('http') >= 0) {
        return url
      }
      return `https://image.geeko.ltd/ticket/${url}`
    }

    const ReplyTip = (props) => {
      const imageUrls = props.reply.imageUrls
      let message = props.reply.message === '-' ? '' : props.reply.message

      let messages = (message || '').split(/[\s|\n]/)

      message = messages.map(m => {
        if (m.indexOf('https://') === 0 || m.indexOf('http://') === 0) {
          return `<a style="text-decoration:underline;" href="${m}">${m}</a>`
        }
        return m
      }).join(' ')

      return <ChatTip className={props.reply.sender === 'buyers' ? 'buyer' : 'seller'}>
        {
          imageUrls && imageUrls.map(image => (
            <img key={image} src={getImageUrl(image)} />
          ))

        }
        <p style={{whiteSpace: 'pre-line', wordBreak: 'break-all', wordWrap: 'break-word'}} dangerouslySetInnerHTML={{__html: message}}/>

      </ChatTip>
    }

    const HeaderImage = ({image, sender}) => {
      return <div style={{
        backgroundImage: sender === 'buyers' ? `url(https://image.geeko.ltd/icon/${image}) ,url(https://image.geeko.ltd/site/pc/icon35.png)` : 'url(https://image.geeko.ltd/icon/support.jpg)',
        backgroundSize: 'cover',
        display: 'inline-block',
        width: '50px',
        height: '50px',
        borderRadius: '50%'
      }}></div>
    }

    const GroupReplyHtmls = (props) => {
      const replies = props.replies
      console.log(replies)
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

    const selectChange= (e) => {
        console.log(e)
    }

    return <div>

      {isFromNotification ? <PageHeader1 href={'/'} label={intl.formatMessage({id: 'Ticket'})}/> : <PageHeader1 label={intl.formatMessage({id: 'Ticket'})}/>}

      <PageContanier1 style={{background: '#f6f6f6'}}>
        { this.state.loading ? (
          <div style={{height: '50px', lineHeight: '50px', fontSize: '12px', textAlign: 'center', color: '#666'}}>
            <FormattedMessage id="loading"/>
          </div>

        ) : (

          <ChatContainer className="x-flex __column" style={{height:"100%", paddingTop:"12px"}}>
            {/* 当前订单 */}
            <div className={style.selectedOrderBox} onClick={()=>window.location.href="/support/order"}>
                <div className={style.orderNo}>
                    Order No 
                    <span>01006099388</span>
                </div>
                <div className={style.orderCreateTime}>
                    Time of Payment
                    <span>2021/8/06 14:30</span>
                </div>
                <span className={`${style.iconfont} ${style.changeOrder}`}>&#xe66b;</span>
            </div>

            {/* 选择帮助项 */}
            <div className={style.chooseHelpBox}>
                <div className={style.helpTxt}><FormattedMessage id="helpyou"/></div>
                <SelectType itemList={questions} selectChange={(e)=>selectChange(e)} type={"chat"}/>
            </div>
            
            {/* 对话 */}
            <Chat innerRef={(div) => { this.chatDiv = div }} style={{ height:'calc(100% - 230px)',overflow: 'hidden', overflowY: 'scroll', padding:'20px 0'}}>
              {this.state.ticket && this.state.ticket.ticketReplies && _.map(groupReplies(this.state.ticket.ticketReplies), (group, index) => (
                <div key={index}>
                  <div style={{textAlign: 'center', color: '#999', fontSize: '12px', height: '40px', lineHeight: '40px'}}>{index}</div>
                  <GroupReplyHtmls headSculptureUrl={this.state.headSculptureUrl} replies={group}/>
                </div>
              ))}
              {/* 提示 */}
              {
                this.state.ticket && this.state.ticket.ticketReplies && this.state.showTip && (
                  <div className={style.responseTip}>
                    {"Expected response time：Within 24h"}
                  </div>
                )
              }
              
              {
                this.state.ticket && this.state.ticket.canBeRated && <div style={{marginTop: 20, textAlign: 'center'}}>
                  <Link to={`/support/rate/${this.state.ticket.id}`} style={{color: '#3aa978', textDecoration: 'none'}}>
                    <RATE style={{verticalAlign: 'middle'}}>&#xe60d;</RATE>
                    <span style={{textDecoration: 'underline', verticalAlign: 'middle'}}>Rate My Service</span>
                  </Link>
                </div>
              }
            </Chat> 
            

            {/* 输入提交 */}
            <div className={style.chatInputBox}>
                <div className={style.chatInput}>
                    <textarea className={`${this.state.messageInvalid ? style.invalid : ''} ${style.textInput}`} 
                              placeholder={"Type a message here..."}
                              onChange={(evt) => { this.setState({message: evt.currentTarget.value, messageInvalid: false}) }} 
                              value={this.state.message} 
                              >
                    </textarea>
                </div>
                <div className={style.uploadBtn}>
                    <label htmlFor="imageFiles">
                        <span className={`${style.iconfont} ${style.upload}`}>&#xe788;</span>
                    </label>
                    <input style={{display:'none'}} id="imageFiles" name="imageFiles"
                          multiple="multiple" type="file"
                          accept="image/jpg,image/jpeg,image/png,image/gif"
                          onChange={this.handleImage}/>
                </div>
                <div className={style.sendBtn} onClick={this.handleTicket}>
                    <span className={`${style.iconfont} ${style.send}`}>&#xe789;</span>
                </div>
            </div>
          </ChatContainer>

        ) }
      </PageContanier1>
    </div>
  }
}

export default injectIntl(TicketAdd)
