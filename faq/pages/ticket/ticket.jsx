import React from 'react';
// import style from './ticket.module.css'
import {FormattedMessage, injectIntl} from 'react-intl';
// import PageContanier1 from '../../components/page-contanier/page-contanier';
// import PageHeader1 from '../../components/page-header/page-header';
import {list} from '../../api'
import {withScroll} from '../../HoCs/list'
import { Page } from '../../components/page/page';
import styled from 'styled-components';
import { withRouter } from 'react-router';

const StatusCircle = styled.span`
    width: 8px;
    height: 8px;
    background-color: #57b936;
    display: inline-block;
    border-radius: 50%;
    margin-right: 3px;
`
const StatusTxt = styled.span`
    font-family: Roboto-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #57b936;
`
const Waiting = styled.div`
    color: #f9a646 !important;
    div:nth-child(1) {
        background-color: #f9a646 !important;
    }
`
const Resolved = styled.div`{
    color: #999 !important;
    div:nth-child(1) {
        background-color: #999 !important;
    }
}`

const TicketListBox = styled.div`
    padding-bottom: 93px;
    // background-color: #fff;
`
const TicketItemBox = styled.div`
    width: 100%;
    height: 119px;
    padding: 0 4%;
    border-bottom: 10px solid #f6f6f6;
    font-family: Roboto-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    background: #fff;
`
const TicketLineOne = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    margin-bottom: 13px;
    font-family: Roboto-Regular;
    font-size: 14px;
    line-height: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    white-space: nowrap;
`
const TicketTime = styled.div`
    color: #999;
`
const TicketContent = styled.div`
    margin-bottom: 16px;
    font-family: Roboto-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #999999;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    height: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

class TicketList extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            tickets:[],
        }
        // console.log('ppp',this.props);
    }

    render(){
        const {tickets} = this.state;
        const {intl} = this.props;
        const StatusBox = (status) => {
            // 加 已评价状态为 灰色
            // 加 等待评价为 黄色
            switch(status){
                case 2:
                    return (<div>
                                <StatusCircle></StatusCircle>
                                <StatusTxt>{intl.formatMessage({id:'statusreplied'})}</StatusTxt>
                            </div>)
                case 1:
                    return (<Waiting>
                                <StatusCircle style={{backgroundColor:'#f9a646'}}></StatusCircle>
                                <StatusTxt style={{color:'#f9a646'}}>{intl.formatMessage({id:'statuswating'})}</StatusTxt>
                            </Waiting>)
                default:
                    // case 0:
                    return (<Resolved>
                                <StatusCircle style={{backgroundColor:'#999'}}></StatusCircle>
                                <StatusTxt style={{color:'#999'}}>{intl.formatMessage({id:'statusresolved'})}</StatusTxt>
                            </Resolved>)
            }
        }

        const link = (item) => {
            this.props.history.push({pathname:`${(window.ctx || '')}/me/m/faq/support-ticket`,state:{id:item.id, isShowApp: window.isShowApp}})
        }

        return <TicketListBox>
            {
                this.props.tickets.map((item, index) => (
                    
                    <TicketItemBox key={index} onClick={()=>link(item)}>
                        <TicketLineOne>
                            <div style={{display:'flex'}}>
                                {intl.formatMessage({id:'ticketid'})} 
                            </div>
                            <span style={{display:'inline-block',flex:1,overflow:'hidden',marginLeft:'8px',textOverflow:'ellipsis'}}>{item.id}</span>
                            <TicketTime>
                                {new Date(item.openDate).toLocaleDateString()}
                            </TicketTime>
                        </TicketLineOne>
                        <TicketContent>
                            {
                                item.ticketReplies.slice(-1)[item.ticketReplies.slice(-1).length - 1].message ? 
                                item.ticketReplies.slice(-1)[item.ticketReplies.slice(-1).length - 1].message : '-'
                            }
                        </TicketContent>
                        {
                            StatusBox(item.state)
                        }
                    </TicketItemBox>
                ))
            }
            
        </TicketListBox>
    }
}

const NoDataBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(75vh);
    justify-content: center;
    color: #999;
`
const NoDataImg = styled.span`
    @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('https://at.alicdn.com/t/font_384296_i4gbs9w8xo.woff2?t=1630652306181') format('woff2'),
            url('https://at.alicdn.com/t/font_384296_i4gbs9w8xo.woff?t=1630652306181') format('woff'),
            url('https://at.alicdn.com/t/font_384296_i4gbs9w8xo.ttf?t=1630652306181') format('truetype');
    }
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 82px;
    color: #999;
    position: relative;
    top: 0;
    left: 0;
    font-weight: normal;
`
const NoDataTxt = styled.span`
    margin-top: 40px;
    color: #999;
    font-family: Roboto-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
`
const SubmitBtn = styled.div`
    font-family: Roboto-Bold;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 61px;
    border-top: 1px solid #e6e6e6;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    span{
        width: 92%;
        height: 38px;
        line-height: 38px;
        background-color: #000;
        color: #fff;
        text-transform: uppercase;
        text-align: center;
    }
`
let isLoading = false;
class Ticket1 extends React.PureComponent{
    constructor(props){
        super(props);
        // console.log(this.props)
        this.state = {
            loading: false,
            skip: 0,
            limit: 20,
            tickets: [],
            finished: false
        }
        this.scrollHandler = this.scrollHandler.bind(this)
    }

    scrollHandler () {
        // console.log('loading')
        if (!isLoading) {
            isLoading = true;
            list(this.state.skip, this.state.limit).then(({result: items}) => {
                // console.log(items)
                this.setState({
                    tickets: this.state.tickets.concat(items),
                    loading: false,
                    skip: this.state.skip + this.state.limit,
                    finished: !items || !items.length
                })
                isLoading = false
            }).catch((err)=>{
                if(err.code == 300){
                    if(window.isShowApp=="true"){
                        window.location.href = "chic-me://chic.me/loginRoot"
                     } else {
                        window.location.href = `${(window.ctx || '')}/i/login?redirectUrl=${(window.ctx || '')}/support`
                    }
                }
            })
        }
    }
  
    componentWillMount () {
        this.scrollHandler()
        // document.body.scrollIntoView({
        //     top: 0,
        // })
        document.title = this.props.intl.formatMessage({id: 'Ticket'});
        
        document.documentElement.scrollTop = document.body.scrollTop = 0
    }
    componentWillUpdate(){
        this.scrollHandler()
    }

    render(){
        const {intl} = this.props;
        const {tickets} = this.state;
        
        const ListWidthScroll = injectIntl(withScroll(withRouter(TicketList)))

        return (<div>
            {
                false && this.state.finished && this.state.skip === this.state.limit && false ? <Redirect to={`${(window.ctx || '')}/me/m/faq/support-ticket`}/> :
                <div style={{position:'relative'}}>
                    <Page label={intl.formatMessage({id: 'Ticket'})} style={{backgroundColor:'#f6f6f6'}}>
                        
                        {/* 列表 */}
                        {
                            tickets.length > 0 &&
                            <ListWidthScroll scrollHandler={this.scrollHandler} tickets={tickets}></ListWidthScroll>
                        }

                        {/* 没有数据 */}
                        {
                            tickets.length == 0 && 
                            <NoDataBox>
                                <NoDataImg>&#xe7c6;</NoDataImg>
                                <NoDataTxt>{intl.formatMessage({id: 'noTicket'})}</NoDataTxt>
                            </NoDataBox>
                        }

                        {/* 提交按钮 */}
                        <SubmitBtn>
                            <span onClick={()=>this.props.history.push({pathname:`${(window.ctx || '')}/support/order`,state:{from:'ticket'}})}>{intl.formatMessage({id: 'submit'})}</span>    
                        </SubmitBtn>
                    </Page>
                </div>
            }
        </div>
            
            
        )
    }
}

export default injectIntl(Ticket1)