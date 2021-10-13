import React, { createRef } from 'react'
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

const SubmitQuestionMask = styled.div`
  position: fixed;
  top: 0;
  z-index: 11;
  height: 100vh;
  width: 100%;
  background: rgba(0,0,0,0.6);
  display: ${props => props.show ? 'block':'none'};
`

const SubmitQuestionContent = styled.div`
  width: 100%;
  height: 484px;
  position: absolute;
  bottom: 0;
  background: #fff;
  // text-align: right;
`

const SubmitQuestionClose = styled.span`
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
  color:#666;
  line-height: 12px;
  font-size: 12px;
  display: inline-block;
  position: absolute;
  right: 8px;
  top: 6px;
`

const SubmitTips = styled.div`
  background-color: #e6e6e6;
  font-family: Roboto-Regular;
	font-size: 10px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #666666;
  padding: 8px 11px;
  text-align: left;
  // margin-top: 20px;
  &>span{
    transform:scale(0.83);
  }
`

const SubmitSelectReason = styled.div`
  width: 100%;
  min-height: 72px;
  padding: 6px 12px;
  border-bottom: 10px solid #f6f6f6;
`

const SelectReasonTitle = styled.div`
  font-family: Roboto-Medium;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color:#222;
  & > span{
    color: #e64545;
  }
`

const SelectReasonBox = styled.div`
  
`

const SelectReasonInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  cursor: pointer;

  & > span:first-child{
    font-family: Roboto-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
    margin-left: 10px;
  }

  & > .selectReasonIcon{
    @font-face {
      font-family: 'iconfont';  /* Project id 384296 */
      src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
          url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
          url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
    }
    font-family:"iconfont" !important;
    font-size:14px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #222222;
    font-weight: 600;
    transform: rotate(0deg);
    transition: transform 0.3s;
  }

  & > .selected{
    transform: rotate(180deg);
    transition: transform 0.3s;
  }
`

const SelectReasonItemBox = styled.div`
  // display: none;
  margin: 12px 0 16px;
`

const SelectReasonItem = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: flex-start;
  width: 96%;
  min-height: 36px;
  line-height: 36px;
  background-color: #f5f5f5;
  border-radius: 2px;
  padding-left: 10px;
  padding-bottom: ${props => props.showTextArea ? '17px':'0'};
  margin-left: 10px;
  margin-bottom: 2px;
  position: relative;

  &> div{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`

const ReasonItemIcon = styled.span`
  display: inline-block;
  border: 1px solid ${props => props.select?'#222':'#999'};
  width: 12px;
  height: 12px;
  border-radius: 50%;

  & > span{
    width: 6px;
    height: 6px;
    display: ${props => props.select?'block':'none'};
    border: 1px solid #222;
    background: #222;
    border-radius: 50%;
    margin: 2px;
  }
`

const ReasonItem = styled.div`
  margin-left: 10px;
  color: ${props => props.select?'#222':'#666'};
`

const ReasonTextArea = styled.textarea`
  // position:absolute;
  display: ${props => props.show ? 'block':'none'};
  width: 332px;
	height: 36px;
	background-color: #ffffff;
	border-radius: 2px;
	border: solid 1px #e6e6e6;
  width: 97%;
  resize: none;
  padding: 5px;
  // margin-bottom:17px;
`

const SubmitDescriptionBox = styled.div`
  width: 100%;
  min-height: 72px;
  padding: 6px 12px;
  border-bottom: 10px solid #f6f6f6;
`

const DescriptionTextArea = styled.textarea`
  width: 351px;
  height: 100px;
  background-color: #f5f5f5;
  border-radius: 2px;
  border: solid 1px #eeeeee;
  outline: none;
  resize: none;
  padding: 12px 10px;
  margin-top:12px;

  &::-webkit-input-placeholder{
    font-family: Roboto-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #bbbbbb;
  }
`

const TextAreaInputLength = styled.div`
  width: 100%;
  text-align: right;
  font-family: Roboto-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #999999;
  margin-top: 10px;
  margin-bottom: 16px;
`

const SubmitImageBox = styled.div`
  width: 100%;
  min-height: 72px;
  padding: 16px 12px;
`
const UploadTips = styled.div`
  font-family: Roboto-Regular;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #999999;
  margin-top: 8px;
`
const UploadBox = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 12px;
`
const UploadItem = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f5f5f5;
  border: solid 1px #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  position:relative;
  cursor: pointer;

  & > span{
    @font-face {
      font-family: 'iconfont';  /* Project id 384296 */
      src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
          url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
          url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
    }
    font-family:"iconfont" !important;
    font-size:14px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #bbb;
    font-size: 32px;
    line-height: 32px;
  }

  & > .deleteImg{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 18px;
    line-height: 16px;
    color: #fff;
    background: #222;
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
  }

  & > img {
    width: 80px;
    height: 80px;
    display: inline-block;
  }
`
const QuestionSubmitBtnBox = styled.div`
  width: 100%;
  height: 72px;
  background: #fff;
  // box-shadow:
  position: fixed;
  bottom: 0;
  z-index: 1;
  padding: 12px 0;
  box-shadow: 0px 2px 10px 0px rgb(0 0 0 / 50%);
`
const QuestionSubmitBtn = styled.div`
  width: 351px;
  height: 38px;
  background-color: #222222;
  border-radius: 2px;
  text-transform: uppercase;
  font-family: Roboto-Bold;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #ffffff;
  text-align: center;
  line-height: 38px;
  margin: 0 auto;
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
      showMsgTxt: '',

      isApp: "false",
      questionMaskShow:false,
      questionObject: {
        questionTypeList:[
          {id:0,title:'Size is small',isSelected:false},
          {id:1,title:'Size is large',isSelected:false},
          {id:2,title:'Others',isSelected:false},
        ],
        questionTypeInput: '',
        showSelectItem: false,
        descriptionInput: '',
        uploadImgList: [],
        uploadImgFileList: []
      },
      

    }
    this.questionRef = createRef();
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
      // console.log('data,',data) 
      // console.log('ticket,',this.state.ticket)
      // console.log(this.state)
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
    // 接受传值的参数
    const params = this.props.history.location.state
    let id;
    // 接受url传值的参数
    const urlParams = this.props.history.location.pathname ? this.props.history.location.pathname.split("/")[3] : '';
    console.log(this.props.location, urlParams)
    // 链接中有传值-ticket列表点击过来的
    if(params){
      id = params.id ? params.id : ''
      this.setState({
        isApp: params.isShowApp ? params.isShowApp : 'false'
      })
      window.isShowApp = params.isShowApp ? params.isShowApp : 'false'
    }
    // 如果链接中没有传值 而且本地没有数据 则会跳转到ticket列表
    if(!id && !localStorage.__order && !urlParams){
      this.props.history.push({pathname: `${window.ctx || ''}/support/ticket`})
    }
    // console.log(id)
    if(urlParams){
      localStorage.__order = ""
      this.getMsgByLinkId(id)
    } else if (id) {
      localStorage.__order = ""
      this.getMsgByUrlId(id)
    } else {
      // console.log(localStorage.__order)
      if (localStorage.__order) {
        this.getMsgByLocalData()
      } else {
        this.setState({
          isNew: true,
          loading: false,
          order: {}
        })
      }
    }
  }

  getMsgByLocalData(){
    getByOrderId(JSON.parse(localStorage.__order).id).then(({result}) => {
      const {ticket, order, cusomerName, headSculptureUrl} = result
      console.log(result)
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
  }

  // history传参里的id
  getMsgByUrlId(id){
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
  }

  // 获取链接里的id
  getMsgByLinkId(id){
    getByOrderId(id).then(({result}) => {
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
  }

  render () {
    const {intl, location} = this.props
    const {questionObject, questionMaskShow} = this.state

    const isFromNotification = location.search && location.search.indexOf('utm_source=pcnotification') >= 0
    const questions = [
      {label: "Cancel the order", value: '0', selected: false},
      {label: "Modify the order", value: '2', selected: false},
      {label: "Shipping status", value: '3', selected: false},
      {label: "Return the order", value: '4', selected: false},
      {label: "Others", value: '5', selected: false},
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
        {/* whiteSpace: 'pre-line', */}
        <div style={{ wordBreak: 'break-all', wordWrap: 'break-word'}} dangerouslySetInnerHTML={{__html: message}}></div>

      </ChatTip>
    }

    const QuestionTip = (props) => {
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
        
        <div style={{ wordBreak: 'break-all', wordWrap: 'break-word',minWidth: '205px'}} dangerouslySetInnerHTML={{__html: message}}></div>
        
        <div style={{display: 'flex', alignItems:'center',justifyContent:'flex-start'}}>
          {
            imageUrls && imageUrls.map(image => (
              <img key={image} style={{width:'60px',height: '60px',margin: '7px 12px 0 0'}} src={image} /> 
            ))
          }
        </div> 

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
              {
                reply.showType == 1 ?
                <QuestionTip reply={reply}></QuestionTip>:
                <ReplyTip reply={reply} />
              }
              
            </ChatRow>
          ))
        }
      </ChatRows>
    }

    const selectChange= (e) => {
        // console.log(e)
        this.setState({
          subject: e,
          questionMaskShow: true
        })
        console.log(this.questionRef)
        setTimeout(()=>{
          var top = document.getElementById("top")
          top.scrollIntoView()
          top = null
        })
          
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

    const questionTypeChange = (item) => {
      let copyList = questionObject.questionTypeList.slice(0);
      let selectItem = copyList.find(e => e.id == item.id);
      copyList.forEach(item => {
        item.isSelected = false;
      })
      selectItem.isSelected = true;
      this.setState({
        questionObject:{...questionObject, questionTypeList: copyList}
      })
    }

    const questionImgUpload = (e) => {
      let file = [...e.target.files]
      // 判断是否有重复项
      file.forEach((files, index) => {
        let sameFile = questionObject.uploadImgFileList.find(f => f.name === files.name);
        if(sameFile){
          file.splice(index, 1)
        }
      })
      if(file.length == 0){
        return
      }
      let fileList = [...questionObject.uploadImgFileList].concat(file)
      let imgSrcList = [];
      if(fileList.length > 3){
        fileList = fileList.splice(0,3);
      }
      
      console.log(fileList)
      fileList.forEach(item => {
        var src = typeof item == 'string' ?
                  item:
                  window.navigator.userAgent.indexOf("Chrome") >= 1 || 
                  window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(item) : window.URL.createObjectURL(item);
        imgSrcList.push(src);
      })
      this.setState({
        questionObject: {
          ...questionObject, 
          uploadImgFileList:fileList,
          uploadImgList:imgSrcList
        }
      })
    }

    const deleteImg = (index) => {
      let fileList = questionObject.uploadImgFileList.slice(0);
      let imgList = questionObject.uploadImgList.slice(0);
      fileList.splice(index,1);
      imgList.splice(index,1);
      this.setState({
        questionObject: {
          ...questionObject,
          uploadImgFileList: fileList,
          uploadImgList: imgList
        }
      })
    }

    const checkParams = (params) => {
      if(!params.descriptionInput){
        var des = document.getElementById("description")
        des.style.border = '1px solid red'
        des.scrollIntoView()
        return false
      }
      return true
    }

    const questionSubmit = () => {
      console.log('submit')
      console.log(this.state.subject)
      
      if(!checkParams(questionObject)) return
      let params = {};
      // 选了什么问题
      params.question = this.state.subject;
      // 选择的原因（有的问题没有）
      params.selectReason = questionObject.questionTypeList.find(i => i.isSelected == true);
      // 原因描述 仅限Others
      if(params.selectReason && params.selectReason.title == 'Others'){
        params.selectReasonInput = questionObject.questionTypeInput
      }
      // 描述
      params.descriptionInput = questionObject.descriptionInput
      // 上传的图片
      let imgFileList = questionObject.uploadImgFileList.map(img => {
        return new HtmlImageCompress(img, {quality: 0.7, imageType: img.type})
      })
      Promise.all(imgFileList).then(results => {
        console.log(results)
      })
      // 需要添加一条数据 传富文本
      let richTxt = `
        <div style="color:#222;font-size: 14px;border-bottom:2px solid #999;padding-bottom:5px;">
          ${params.selectReason && params.selectReason.title }
        </div>
        <div style="color:#222;font-size: 14px;border-bottom:2px solid #999;padding:5px 0;">
          ${questionObject.descriptionInput}
        </div> 
      ` 

      let ticket = this.state.ticket || {}
      let replies = (ticket.ticketReplies || []).concat([])
      replies.push({
        sender: 'buyers',
        message: richTxt,
        date: new Date().getTime(),
        imageUrls: questionObject.uploadImgList,
        showType: 1
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
      console.log(ticket)
      this.setState({
        ticket,
        showMsg: true,
        questionMaskShow: false,
        message: '',
        showMsgTxt: 'Submitted successfully!',
        questionObject: {
          questionTypeList:[
            {id:0,title:'Size is small',isSelected:false},
            {id:1,title:'Size is large',isSelected:false},
            {id:2,title:'Others',isSelected:false},
          ],
          questionTypeInput: '',
          showSelectItem: false,
          descriptionInput: '',
          uploadImgList: [],
          uploadImgFileList: []
        }
      })

      setTimeout(()=>{
        this.setState({
          showMsg: false,
          showMsgTxt: ''
        })
      },2000)
      
      // let imgFileList = questionObject.uploadImgFileList.length > 0 ?
      //                   questionObject.uploadImgFileList : '';
      // console.log(imgFileList)
      // if(imgFileList){
      //   imgFileList.then((res)=>{
      //     console.log(res)
          // params.uploadImg = imgFileList

          // // 请求接口上传文件
          // const {file, fileSize} = result

          // const formData = new FormData()
          // formData.append('operaId', this.state.order.id)
          // formData.append('subject', this.state.subject)
          // formData.append('message', this.state.message || '-')
          // formData.append('imageFiles', file)
        // })
      // }                  
    }

    return <div>
      {
        window.isShowApp !== 'true' ?
        (this.state.isApp == 'false' &&
        (this.state.isNew? 
        <PageHeader1 label={intl.formatMessage({id: 'Ticket'})}/> : 
        <PageHeader1 label={intl.formatMessage({id: 'Ticket'})}/> )):<span></span>
      }

      <PageContanier1 style={{background: '#f6f6f6'}} noHeader={this.state.isApp == 'false' ?false:true}>
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
                    <span>{this.state.ticket ? this.state.ticket.id ? this.state.ticket.id : this.state.order.id : this.state.order.id}</span>
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
            <Chat innerRef={(div) => { this.chatDiv = div }} style={{ height:'calc(100% - 230px)',overflow: 'hidden', overflowY: 'scroll', padding:'20px',WebkitOverflowScrolling:'touch'}}>
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
                false && this.state.ticket && this.state.ticket.canBeRated && <div style={{marginTop: 20, textAlign: 'center'}}>
                  <Link to={`/support/rate/${this.state.ticket.id}`} style={{color: '#3aa978', textDecoration: 'none'}}>
                    <RATE style={{verticalAlign: 'middle'}}>&#xe60d;</RATE>
                    <span style={{textDecoration: 'underline', verticalAlign: 'middle'}}>Rate My Service</span>
                  </Link>
                </div>
              }
            </Chat> 

            <MessageBox style={{display: this.state.showMsg ? '':'none'}}>
                {this.state.showMsgTxt}
            </MessageBox>
            

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

      {/* 选择问题类型后的弹窗*/}
      <SubmitQuestionMask show={questionMaskShow} >
          <SubmitQuestionContent>
            {/* 关闭按钮 */}
            <span style={{display:'block',width:'100%',textAlign:'right',backgroundColor:"#fff"}} onClick={()=>this.setState({questionMaskShow: false})}>
              <SubmitQuestionClose>&#xe69a;</SubmitQuestionClose>
            </span>

            <div style={{height: '464px',overflow:'auto',marginTop:'20px',paddingBottom:'102px'}} >
                {/* 提示语 */}
                <SubmitTips id="top">
                  <span>The reasons below are optional. You can click “X” if you don't want to choose any of them.</span> 
                </SubmitTips>

                {/* 原因选择 */}
                <SubmitSelectReason>
                    {/* 选择标题 */}
                    <SelectReasonTitle>
                      <span>*</span> Select a reason
                    </SelectReasonTitle>

                    {/* 选择下拉框 */}
                    <SelectReasonBox id="selectReason">
                      <SelectReasonInput onClick={()=>this.setState({questionObject:{...questionObject, showSelectItem:!questionObject.showSelectItem}})}>
                        <span>Select a reason</span>
                        <span className={`iconfont selectReasonIcon ${questionObject.showSelectItem?'selected':''}`}>&#xe692;</span>
                      </SelectReasonInput>
                      
                      {/* 选项框 */}
                      <SelectReasonItemBox>
                        {/* 选项 */}
                        {
                          questionObject.showSelectItem && 
                          (questionObject.questionTypeList.length > 0) &&
                          questionObject.questionTypeList.map((item, index)=>(
                            <SelectReasonItem key={index} showTextArea={item.title === 'Others' && item.isSelected} onClick={()=>questionTypeChange(item)}>
                              <div>
                                <ReasonItemIcon select={item.isSelected}>
                                  <span className="reasonItemIconSelected"></span>
                                </ReasonItemIcon>
                                <ReasonItem select={item.isSelected}>{item.title}</ReasonItem>
                              </div>
                                
                              <ReasonTextArea 
                                  show={item.title === 'Others' && item.isSelected} 
                                  onChange={(e)=>{
                                    this.setState({
                                      questionObject:{
                                        ...questionObject, 
                                        questionTypeInput: e.target.value
                                      }
                                    })
                                  }}>
                              </ReasonTextArea>
                            </SelectReasonItem>
                          ))
                        }
                      </SelectReasonItemBox>
                    </SelectReasonBox>
                </SubmitSelectReason>

                {/* 文字描述 */}
                <SubmitDescriptionBox id="description">
                    {/* 标题 */}
                    <SelectReasonTitle>
                      <span>*</span> Description
                    </SelectReasonTitle>

                    {/* 输入框 */}
                    <DescriptionTextArea 
                        placeholder="Please describe your problem as much as possible so that customer service can respond faster…"
                        value={questionObject.descriptionInput}
                        onChange={(e)=>{
                          this.setState({
                            questionObject: {...questionObject, descriptionInput: e.target.value}
                          })
                        }}
                        ></DescriptionTextArea>
                    <TextAreaInputLength>
                      { (questionObject.descriptionInput ? questionObject.descriptionInput.length : '0')+'/1000'}
                    </TextAreaInputLength>
                </SubmitDescriptionBox>

                {/* 图片上传 */}
                <SubmitImageBox id="imgUpload">
                  {/* 标题 */}
                  <SelectReasonTitle>
                    Upload image
                  </SelectReasonTitle>

                  {/* 上传提示 */}
                  <UploadTips>Maximum of 3 photos, only JPEG, GIF or PNG. </UploadTips>

                  {/* 上传盒子 */}
                  <UploadBox>
                    {
                      questionObject.uploadImgList.map((item,index) => (
                        <UploadItem key={index}>
                          <span className="deleteImg" onClick={()=>deleteImg(index)}>&times;</span>
                          <img src={item} alt="" />
                        </UploadItem>
                      ))
                    }
                    {
                      questionObject.uploadImgList.length < 3 &&
                      // <label htmlFor="imageFiles">
                        <UploadItem>
                          <span>&#xe6d3;</span>
                          <input style={{opacity:0,position:'absolute',width:'80px',height:'80px'}} 
                            type="file" 
                            id="imageFiles" 
                            multiple="multiple" 
                            onChange={(e)=>questionImgUpload(e)}
                            accept="image/jpg,image/jpeg,image/png,image/gif"></input>
                        </UploadItem>
                        
                      // </label>
                    }
                    
                    
                  </UploadBox>
                </SubmitImageBox>
            </div>

            {/* 提交按钮 */}
            <QuestionSubmitBtnBox>
              <QuestionSubmitBtn onClick={()=>questionSubmit()}>
                sumbit
              </QuestionSubmitBtn>
            </QuestionSubmitBtnBox>
            
            
          </SubmitQuestionContent>
      </SubmitQuestionMask>
    </div>
  }
}

export default injectIntl(TicketAdd)
