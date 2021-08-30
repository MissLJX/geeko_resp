import React from 'react';
import style from './contact-us.module.css'
import {FormattedMessage, injectIntl} from 'react-intl';
import PageContanier1 from '../../components/page-contanier/page-contanier';
import PageHeader1 from '../../components/page-header/page-header';

class ContactUs extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render(){
        const {intl} = this.props;
        return (
            <div className={style.contactPage}>
                <PageHeader1 label={intl.formatMessage({id: 'Contact Us'})} href="/supportnew"/>
                <div className={style.entryItem} onClick={()=> window.location.href = "/support/ticket1"}>
                    <span className={`${style.iconfont} ${style.icon}`}>&#xe69c;</span>
                    <div className={style.entryInfoBox}>
                        <span className={style.entryItemTitle}>Ticket</span>
                        <span className={style.supportTime}>Within 24H</span>
                    </div>
                    <span className={`${style.iconfont} ${style.linkTo}`}>&#xe78a;</span>
                </div>
                <div className={style.entryItem} onClick={() => console.log("online")}>
                    <span className={`${style.iconfont} ${style.icon}`}>&#xe770;</span>
                    <div className={style.entryInfoBox}>
                        <span className={style.entryItemTitle}>Online Help</span>
                        <span className={style.supportTime}>Within 24H</span>
                    </div>
                    <span className={`${style.iconfont} ${style.linkTo}`}>&#xe78a;</span>
                </div>
            </div>
        )
    }
}

export default injectIntl(ContactUs)