import React from 'react'
import {Link} from 'react-router-dom'
import {get, getByOrderId, sendImage, sendTicket} from '../../api'
import styled from 'styled-components'
import _ from 'lodash'
import {FormattedMessage, injectIntl} from 'react-intl'
import HtmlImageCompress from 'html-image-compress'
// import style from './ticket-add.module.css';
import {gloabvars} from '../../commons/instance.js'

import {PageHeader1, PageContanier1} from '../../components/page/page';

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
import {SelectType} from '../../components/newComponents/new-components'

const ChatInputBox = styled.div`
      width: 100%;
      /* border: 1px solid; */
      height: 64px;
      display: flex;
      align-items: center;
      background: #fff;
      position: fixed;
      bottom: 0;
      box-shadow: 0px 2px 20px 0px 
      rgba(204, 204, 204, 0.5);
  
      padding-left: 4%;
    `
  const ChatInput = styled.div`
      background: #fff;
      flex: 1;
  `
  const UploadBtn = styled.div`
      font-size: 22px;
      color: #999;
      margin-right: 30px;
      margin-left: 15px;
  `
  const Upload = styled.span`
      @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
            url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
            url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
      }
      font-family:"iconfont" !important;
      font-size:16px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-size: 18px;
  `
  const SendBtn = styled.div`
      color: #999;
      margin-right: 20px;
  `
  const Send = styled.span`
      @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
            url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
            url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
      }
      font-family:"iconfont" !important;
      font-size:16px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-size: 18px;
  `
  const Invalid = styled.textarea`
      box-shadow: inset 0 0 1px red !important;
      border-color: red !important;
  `
  
  const TextInput = styled.textarea`
      width: 100%;
      height: 40px;
      line-height: 20px;
      overflow-y: visible;
      padding-top: 10px;
      border: none;
      resize: none;
      &::-webkit-scrollbar{
          display: none;
      }
  `
  
  const SelectedOrderBox = styled.div`
      width: 92%;
      margin: 0 auto;
      background: #fff;
      height: 75px;
      overflow: hidden;
      /* line-height: 37.5px; */
      position: relative;
      padding-left: 12px;
      /* margin-top: 12px; */
      margin-bottom: 20px;
  `
  const OrderNo = styled.div`
      margin-top: 14px;
      margin-bottom: 12px;
      font-family: Roboto-Regular;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #999999;
      span{
          color: #222;
          margin-left: 12px;
      }
  `
  const OrderCreateTime = styled.div`
      font-family: Roboto-Regular;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #999999;
      span{
          color: #222;
          margin-left: 12px;
      }
  `
  const ChangeOrder = styled.span`
      @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
            url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
            url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
      }
      font-family:"iconfont" !important;
      font-size:16px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      position: absolute;
      right: 16px;
      top: calc(50% - 7px);
      font-size: 12px;
      color: #666;
  `
  
  const HelpTxt = styled.div`
      font-family: Roboto-Medium;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
      width: 100%;
      text-align: center;
      // font-weight: 600;
      margin-top: 5px;
      margin-bottom: 12px;
  `
  
  const ResponseTip = styled.div`
      font-family: Roboto-Regular;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #999999;
      text-align: center;
      margin-top: 7px;
  `
  const MessageBox = styled.div`
      position:fixed;
      left: calc(50% - 100px);
      bottom: 116px;
      width: 200px;
      height: 32px;
      background-color: rgba(34, 34, 34, 0.6);
	    border-radius: 2px;
      text-align: center;
      line-height: 32px;
      color: #fff;
    `
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
      showMsg: false,
      showMsgTxt: ''
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
        let ticket = this.state.ticket || {}
        let replies = []
        replies = (ticket.ticketReplies || []).concat([])

        replies.push({
          sender: 'buyers',
          message: this.state.message,
          imageUrls: [src],
          date: new Date().getTime()
        })
        ticket.ticketReplies = replies

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
          ticket,
          message: '',
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
      console.log('data,',data)
      console.log('ticket,',this.state.ticket)
      console.log(this.state)
      let ticket = this.state.ticket || {}
      let replies = (ticket.ticketReplies || []).concat([])
      replies.push({
        sender: 'buyers',
        message: this.state.message,
        date: new Date().getTime()
      })

      
      ticket.ticketReplies = replies

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
        ticket,
        message: '',
        // showMsg: true,
        // showMsgTxt: 'Submitted successfully!'
      })

      // setTimeout(()=>{
      //   this.setState({
      //     showMsg: false,
      //     showMsgTxt: ''
      //   })
      // },2000)



      this.initScroll()
    })
  }

  initScroll () {
    setTimeout(() => {
      this.chatDiv.scrollTop = this.chatDiv.scrollHeight
    }, 200)
  }
  
  componentWillMount () {
    console.log('pageIn')
    const id = this.props.location.search.split('=')[1]
    if(!id && !localStorage.__order){
      window.location.href = `${window.ctx || ''}/support/ticket`
    }
    console.log(id)
    if (id) {
      localStorage.__order = ""
      get(id).then(({result}) => {
        // console.log(result)
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
      // console.log(localStorage.__order)
      if (localStorage.__order) {
        
        getByOrderId(JSON.parse(localStorage.__order).id).then(({result}) => {
          const {ticket, order, cusomerName, headSculptureUrl} = result
          // console.log(result)
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
          alert(data)
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

  // componentWillUnmount(){
  //   localStorage.__order = ''
  // }

  

  render () {
    const {intl, location} = this.props

    const isFromNotification = location.search && location.search.indexOf('utm_source=pcnotification') >= 0
    console.log(this.state.subject)

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
      // console.log(replies)
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
        // console.log(e)
        this.setState({subject: e})
    }

    const textareaChange = (evt) => {
      if(!this.state.subject){
        alert(intl.formatMessage({id:"selectTip"}));
      } else {
        if(typeof(this.state.subject)!=='number'){
          this.setState({
            message: evt.currentTarget.value, 
            messageInvalid: false
          })
        }
      }
    }

    return <div>

      {
         this.state.isNew? 
        <PageHeader1 href={`${window.ctx || ''}/support/order`} label={intl.formatMessage({id: 'Ticket'})}/> : 
        <PageHeader1 href={`${window.ctx || ''}/support/ticket`} label={intl.formatMessage({id: 'Ticket'})}/>
      }

      <PageContanier1 style={{background: '#f6f6f6'}}>
        { this.state.loading ? (
          <div style={{height: '50px', lineHeight: '50px', fontSize: '12px', textAlign: 'center', color: '#666'}}>
            <FormattedMessage id="loading"/>
          </div>

        ) : (

          <ChatContainer className="x-flex __column" style={{height:"100%", paddingTop:"12px"}}>
            {/* 当前订单 */}
            <SelectedOrderBox onClick={()=>this.props.history.push({pathname: `${(window.ctx || '')}/support/order`,state:{from:'ticketadd'}})}>
                <OrderNo>
                    {intl.formatMessage({id:"orderno"})}
                    <span>{this.state.ticket ? this.state.ticket.operaId ? this.state.ticket.operaId : this.state.order.id : this.state.order.id}</span>
                </OrderNo>
                <OrderCreateTime>
                    {intl.formatMessage({id:"paymenttime"})}
                    <span>{
                      this.state.ticket ?
                      this.state.ticket.openDate ? 
                        (new Date(this.state.ticket.openDate).toLocaleDateString() + " " + new Date(this.state.ticket.openDate).toTimeString().substr(0, 5)) : 
                        "-":
                      "-"
                      }</span>
                </OrderCreateTime>
                <ChangeOrder>&#xe66b;</ChangeOrder>
            </SelectedOrderBox>

            {/* 选择帮助项 */}
            <div>
                <HelpTxt><FormattedMessage id="helpyou"/></HelpTxt>
                <SelectType itemList={questions} selectChange={(e)=>selectChange(e)} type={"chat"} value={this.state.subject}/>
            </div>
            
            {/* 对话 */}
            <Chat innerRef={(div) => { this.chatDiv = div }} style={{ height:'calc(100% - 230px)',overflow: 'hidden', overflowY: 'scroll', padding:'20px'}}>
              {this.state.ticket && this.state.ticket.ticketReplies && _.map(groupReplies(this.state.ticket.ticketReplies), (group, index) => (
                <div key={index}>
                  <div style={{textAlign: 'center', color: '#999', fontSize: '12px', height: '40px', lineHeight: '40px'}}>{index}</div>
                  <GroupReplyHtmls headSculptureUrl={this.state.headSculptureUrl} replies={group}/>
                </div>
              ))}
              {/* 提示 */}
              {
                this.state.ticket && this.state.ticket.ticketReplies && this.state.showTip && (
                  <ResponseTip>
                    {intl.formatMessage({id:"responseTime"})}
                  </ResponseTip>
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

            {/* <MessageBox style={{display: this.state.showMsg ? '':'none'}}>
                {this.state.showMsgTxt}
            </MessageBox> */}
            

            {/* 输入提交 */}
            <ChatInputBox>
                <ChatInput>
                    <TextInput style={{boxShadow: this.state.messageInvalid&&'inset 0 0 1px red !important',borderColor: this.state.messageInvalid&&'red !important'}}
                              placeholder={intl.formatMessage({id:"textareaPlaceHolder"})}
                              onChange={(evt) => {textareaChange(evt) }} 
                              value={this.state.message} 
                              >
                    </TextInput>
                </ChatInput>
                <UploadBtn>
                    <label htmlFor="imageFiles">
                        <Upload>&#xe788;</Upload>
                    </label>
                    <input style={{display:'none'}} id="imageFiles" name="imageFiles"
                          multiple="multiple" type="file"
                          accept="image/jpg,image/jpeg,image/png,image/gif"
                          onChange={this.handleImage}/>
                </UploadBtn>
                <SendBtn onClick={this.handleTicket}>
                    <Send>&#xe789;</Send>
                </SendBtn>
            </ChatInputBox>
          </ChatContainer>

        ) }
      </PageContanier1>
    </div>
  }
}

export default injectIntl(TicketAdd)
