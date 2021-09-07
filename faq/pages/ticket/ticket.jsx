import React from 'react';
// import style from './ticket.module.css'
import {FormattedMessage, injectIntl} from 'react-intl';
// import PageContanier1 from '../../components/page-contanier/page-contanier';
// import PageHeader1 from '../../components/page-header/page-header';
import {list} from '../../api'
import {withScroll} from '../../HoCs/list'
import { Page } from '../../components/page/page';
import styled from 'styled-components';

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
    color: #f9a646;
    .statusCircle {
        background-color: #f9a646;
    }
`
const Resolved = styled.div`{
    color: #999;
    .statusCircle {
        background-color: #999;
    }
}`

const TicketListBox = styled.div`
    padding-bottom: 61px;
    background-color: #fff;
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
`
const TicketTime = styled.div`
    color: #999;
`
const TicketContent = styled.div`
    margin-bottom: 12px;
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
        // console.log(props);
    }

    render(){
        const {tickets} = this.state;
        const {intl} = this.props;
        const StatusBox = (status) => {
            switch(status){
                case 2:
                    return (<div>
                                <StatusCircle></StatusCircle>
                                <StatusTxt>{intl.formatMessage({id:'statusreplied'})}</StatusTxt>
                            </div>)
                case 1:
                    return (<Waiting>
                                <StatusCircle></StatusCircle>
                                <StatusTxt>{intl.formatMessage({id:'statuswating'})}</StatusTxt>
                            </Waiting>)
                case 0:
                    return (<Resolved>
                                <StatusCircle></StatusCircle>
                                <StatusTxt>{intl.formatMessage({id:'statusresolved'})}</StatusTxt>
                            </Resolved>)
                default:
                    return (<div>
                                <StatusCircle></StatusCircle>
                                <StatusTxt>{intl.formatMessage({id:'statusreplied'})}</StatusTxt>
                            </div>)
            }
        }

        const link = (item) => {
            window.location.href = `${(window.ctx || '')}/support/ticketadd?id=${item.id}`
        }

        return <TicketListBox>
            {
                this.props.tickets.map((item, index) => (
                    <TicketItemBox key={index} onClick={()=>link(item)}>
                        <TicketLineOne>
                            <div>
                                Ticket ID {item.operaId}
                            </div>
                            <TicketTime>
                                {new Date(item.openDate).toLocaleDateString()}
                            </TicketTime>
                        </TicketLineOne>
                        <TicketContent>
                            {item.ticketReplies.slice(-1)[item.ticketReplies.slice(-1).length - 1].message}
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
        src: url('//at.alicdn.com/t/font_384296_ea5pedcgl35.woff2?t=1629961872918') format('woff2'),
            url('//at.alicdn.com/t/font_384296_ea5pedcgl35.woff?t=1629961872918') format('woff'),
            url('//at.alicdn.com/t/font_384296_ea5pedcgl35.ttf?t=1629961872918') format('truetype');
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
        console.log(this.props)
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
                // console.log(err)
                if(err.code == 300){
                    // window.location.href = "/i/login"
                }
            })
        }
    }
  
    componentWillMount () {
        this.scrollHandler()
    }
    componentWillUpdate(){
        this.scrollHandler()
    }

    render(){
        const {intl} = this.props;
        const {tickets} = this.state;
        
        const ListWidthScroll = injectIntl(withScroll(TicketList))

        return (<div>
            {
                this.state.finished && this.state.skip === this.state.limit && false ? <Redirect to={`${(window.ctx || '')}/support/ticketadd`}/> :
                <div style={{position:'relative'}}>
                    <Page label={intl.formatMessage({id: 'Ticket'})} href={`${(window.ctx || '')}/support/contact-us`}>
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
                            <span onClick={()=>this.props.history.push({pathname:`${(window.ctx || '')}/support/order`})}>{intl.formatMessage({id: 'submit'})}</span>    
                        </SubmitBtn>
                    </Page>
                </div>
            }
        </div>
            
            
        )
    }
}

export default injectIntl(Ticket1)