import React from 'react';
import style from './contact-us.module.css'
import {FormattedMessage, injectIntl} from 'react-intl';
import PageContanier1 from '../../components/page-contanier/page-contanier';
import PageHeader1 from '../../components/page-header/page-header';
import { Page } from '../../components/page/page';

class ContactUs extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
        }
    }


    render(){
        const {intl} = this.props;
        const {intlPage} = this.state;
        return (
            <div className={style.contactPage}>
                <Page label={intl.formatMessage({id: 'contact'})} href="/supportnew/faq">
                    <div className={style.entryItem} onClick={()=> window.location.href = "/supportnew/ticket1"}>
                        <span className={`${style.iconfont} ${style.icon}`}>&#xe69c;</span>
                        <div className={style.entryInfoBox}>
                            <span className={style.entryItemTitle}>{intl.formatMessage({id: 'Ticket'})}</span>
                            <span className={style.supportTime}>{intl.formatMessage({id: 'within'})}</span>
                        </div>
                        <span className={`${style.iconfont} ${style.linkTo}`}>&#xe78a;</span>
                    </div>
                    <div className={style.entryItem} onClick={() => window.location.href="/f/mobile/contact_us"}>
                        <span className={`${style.iconfont} ${style.icon}`}>&#xe770;</span>
                        <div className={style.entryInfoBox}>
                            <span className={style.entryItemTitle}>{intl.formatMessage({id: 'online'})}</span>
                            <span className={style.supportTime}>{intl.formatMessage({id: 'within'})}</span>
                        </div>
                        <span className={`${style.iconfont} ${style.linkTo}`}>&#xe78a;</span>
                    </div>
                </Page>
                
            </div>
        )
    }
}

export default injectIntl(ContactUs)