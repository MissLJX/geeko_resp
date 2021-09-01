import React from 'react';
import style from './ticket.module.css'
import {FormattedMessage, injectIntl} from 'react-intl';
import PageContanier1 from '../../components/page-contanier/page-contanier';
import PageHeader1 from '../../components/page-header/page-header';
import {list} from '../../api'
import {withScroll} from '../../HoCs/list'

class TicketList extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            tickets:[],
            scrollRef: React.createRef()
        }
        console.log(props);
    }

    componentWillMount(){
        console.log(this.state.scrollRef)
        document.addEventListener("scroll",console.log("scroll"))
    }

    render(){
        const {tickets} = this.state;
        const StatusBox = (status) => {
            switch(status){
                case 2:
                    return (<div className={style.ticketStatus}>
                                <span className={style.statusCircle}></span>
                                <span className={`${style.statusTxt}`}>Replied</span>
                            </div>)
                case 1:
                    return (<div className={`${style.ticketStatus} ${style.waiting}`}>
                                <span className={style.statusCircle}></span>
                                <span className={`${style.statusTxt} ${style.waiting}`}>Waiting for Reply</span>
                            </div>)
                case 0:
                    return (<div className={`${style.ticketStatus} ${style.resolved}`}>
                                <span className={style.statusCircle}></span>
                                <span className={`${style.statusTxt} ${style.resolved}`}>Resolved</span>
                            </div>)
                default:
                    return (<div className={style.ticketStatus}>
                                <span className={style.statusCircle}></span>
                                <span className={style.statusTxt}>Replied</span>
                            </div>)
            }
        }

        const link = (item) => {
            console.log(item)
            // localStorage.__order = JSON.stringify(item)
            // /support/ticketadd
            window.location.href = "/support/ticketadd?id="+item.id
        }

        return <div className={style.ticketListBox}>
            {
                this.props.tickets.map((item, index) => (
                    <div className={style.ticketItemBox} key={index} onClick={()=>link(item)}>
                        <div className={style.ticketLineOne}>
                            <div className={style.ticketID}>
                                Ticket ID {item.id}
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
        console.log('loading')
        if (!isLoading) {
            isLoading = true;
            list(this.state.skip, this.state.limit).then(({result: items}) => {
                console.log(items)
                this.setState({
                    tickets: this.state.tickets.concat(items),
                    loading: false,
                    skip: this.state.skip + this.state.limit,
                    finished: !items || !items.length
                })
                isLoading = false
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
        

        

        // const ticketList = (tickets) => {
        //     return  
        // }
        const ListWidthScroll = injectIntl(withScroll(TicketList))

        return (<div>
            {
                this.state.finished && this.state.skip === this.state.limit ? <Redirect to="/support/ticket/add"/> :
                <div className={style.ticketPage}>
                    {/* <PageHeader1 label={intl.formatMessage({id: 'Ticket'})} href="/support/contact-us"/> */}
                    <div className={style.header}>
                        <span>{intl.formatMessage({id: 'Ticket'})}</span>
                        <i className={style.iconfont} onClick={() => {window.location.href = "/support/contact-us"}}>&#xe78a;</i>
                    </div>
                    <PageContanier1>
                        {/* <div className={style.ticketListBox}> */}
                             {/* 列表 */}
                            <ListWidthScroll scrollHandler={this.scrollHandler} tickets={tickets}></ListWidthScroll>
                        {/* </div> */}
                       

                        {/* 没有数据 */}
                        {
                            false && 
                            <div className={style.noDataBox}>
                                <span className={`${style.noDataImg} ${style.iconfont}`}>&#xe6d8;</span>
                                <span className={style.noDataTxt}>No Ticket</span>
                            </div>
                        }
                        

                        {/* 提交按钮 */}
                        <div className={style.submitBtn} >
                            <span onClick={()=>window.location.href="order"}>submit</span>    
                        </div>
                    </PageContanier1>
                </div>
            }
        </div>
            
            
        )
    }
}

export default injectIntl(Ticket1)