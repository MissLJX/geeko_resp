import React from 'react';
import style from './ticket.module.css'
import {FormattedMessage, injectIntl} from 'react-intl';
import PageContanier1 from '../../components/page-contanier/page-contanier';
import PageHeader1 from '../../components/page-header/page-header';

class Ticket1 extends React.PureComponent{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            
        }

        // 
        this.paths = [
            {label: intl.formatMessage({id: 'order_status_all'}), value: 'all'},
            {label: intl.formatMessage({id: 'order_status_unpaid'}), value: 'unpaid'},
            {label: intl.formatMessage({id: 'order_status_processing'}), value: 'processing'},
            {label: intl.formatMessage({id: 'order_status_shipped'}), value: 'shipped'},
            {label: intl.formatMessage({id: 'order_status_confirmed'}), value: 'confirmed'},
            {label: intl.formatMessage({id: 'order_status_canceled'}), value: 'canceled'}
        ]
    }
    

    render(){
        const {intl} = this.props;

        const StatusBox = (status) => {
            switch(status){
                case 'replied':
                    return (<div className={style.ticketStatus}>
                                <span className={style.statusCircle}></span>
                                <span className={style.statusTxt}>Replied</span>
                            </div>)
                case 'waiting':
                    return (<div className={`${style.ticketStatus} ${style.waiting}`}>
                                <span className={style.statusCircle}></span>
                                <span className={style.statusTxt}>Waiting for Reply</span>
                            </div>)
                case 'resolved':
                    return (<div className={`${style.ticketStatus} ${style.resolved}`}>
                                <span className={style.statusCircle}></span>
                                <span className={style.statusTxt}>Resolved</span>
                            </div>)
                default:
                    return (<div className={style.ticketStatus}>
                                <span className={style.statusCircle}></span>
                                <span className={style.statusTxt}>Replied</span>
                            </div>)
            }
        }
        return (
            <div className={style.ticketPage}>
                <PageHeader1 label={intl.formatMessage({id: 'Ticket'})} href="/support/contact-us"/>
                <PageContanier1>
                    {/* 列表 */}
                    <div className={style.ticketListBox}>
                        <div className={style.ticketItemBox}>
                            <div className={style.ticketLineOne}>
                                <div className={style.ticketID}>
                                    Ticket ID 8900989321
                                </div>
                                <div className={style.ticketTime}>
                                    2021/7/21
                                </div>
                            </div>
                            <div className={style.ticketContent}>
                                Hi, shikai zhang Before we ship the package to…
                            </div>
                            {
                                StatusBox("replied")
                            }
                        </div>
                    </div>

                    {/* 没有数据 */}
                    {
                        false && 
                        <div className={style.noDataBox}>
                            <span className={`${style.noDataImg} ${style.iconfont}`}>&#xe6d8;</span>
                            <span className={style.noDataTxt}>No Ticket</span>
                        </div>
                    }
                    

                    {/* 提交按钮 */}
                    <div className={style.submitBtn}>
                        <span>submit</span>    
                    </div>
                </PageContanier1>
            </div>
        )
    }
}

export default injectIntl(Ticket1)