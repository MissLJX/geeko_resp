import React from 'react';
import style from './ticket.module.css'
import {FormattedMessage, injectIntl} from 'react-intl';
import PageContanier1 from '../../components/page-contanier/page-contanier';
import PageHeader1 from '../../components/page-header/page-header';
import {list} from '../../api'
import {withScroll} from '../../HoCs/list'
import { Page } from '../../components/page/page';

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
                    return (<div className={style.ticketStatus}>
                                <span className={style.statusCircle}></span>
                                <span className={`${style.statusTxt}`}>{intl.formatMessage({id:'statusreplied'})}</span>
                            </div>)
                case 1:
                    return (<div className={`${style.ticketStatus} ${style.waiting}`}>
                                <span className={style.statusCircle}></span>
                                <span className={`${style.statusTxt} ${style.waiting}`}>{intl.formatMessage({id:'statuswating'})}</span>
                            </div>)
                case 0:
                    return (<div className={`${style.ticketStatus} ${style.resolved}`}>
                                <span className={style.statusCircle}></span>
                                <span className={`${style.statusTxt} ${style.resolved}`}>{intl.formatMessage({id:'statusresolved'})}</span>
                            </div>)
                default:
                    return (<div className={style.ticketStatus}>
                                <span className={style.statusCircle}></span>
                                <span className={style.statusTxt}>{intl.formatMessage({id:'statusreplied'})}</span>
                            </div>)
            }
        }

        const link = (item) => {
            // console.log(item)
            // localStorage.__order = JSON.stringify(item)
            // /supportnew/ticketadd
            window.location.href = "/supportnew/ticketadd?id="+item.id
        }

        return <div className={style.ticketListBox}>
            {
                this.props.tickets.map((item, index) => (
                    <div className={style.ticketItemBox} key={index} onClick={()=>link(item)}>
                        <div className={style.ticketLineOne}>
                            <div className={style.ticketID}>
                                Ticket ID {item.operaId}
                            </div>
                            <div className={style.ticketTime}>
                                {new Date(item.openDate).toLocaleDateString()}
                            </div>
                        </div>
                        <div className={style.ticketContent}>
                            {item.ticketReplies.slice(-1)[item.ticketReplies.slice(-1).length - 1].message}
                        </div>
                        {
                            StatusBox(item.state)
                        }
                    </div>
                ))
            }
            
        </div>
    }
}

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
                // console.log(err)
                if(err.code == 300){
                    window.location.href = "/i/login"
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
        console.log(tickets)
        
        const ListWidthScroll = injectIntl(withScroll(TicketList))

        return (<div>
            {
                this.state.finished && this.state.skip === this.state.limit ? <Redirect to="/supportnew/ticketadd"/> :
                <div className={style.ticketPage}>
                    <Page label={intl.formatMessage({id: 'Ticket'})} href="/supportnew/contact-us">
                        {/* 列表 */}
                        {
                            tickets.length > 0 &&
                            <ListWidthScroll scrollHandler={this.scrollHandler} tickets={tickets}></ListWidthScroll>
                        }
                        
                        

                        {/* 没有数据 */}
                        {
                            tickets.length == 0 && 
                            <div className={style.noDataBox}>
                                <span className={`${style.noDataImg} ${style.iconfont}`}>&#xe7c6;</span>
                                <span className={style.noDataTxt}>{intl.formatMessage({id: 'noTicket'})}</span>
                            </div>
                        }
                        

                        {/* 提交按钮 */}
                        <div className={style.submitBtn} >
                            <span onClick={()=>window.location.href="order"}>{intl.formatMessage({id: 'submit'})}</span>    
                        </div>
                    </Page>
                </div>
            }
        </div>
            
            
        )
    }
}

export default injectIntl(Ticket1)