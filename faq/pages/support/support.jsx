import React from 'react';
import style from './support.module.css';
import {FormattedMessage, injectIntl} from 'react-intl';

import {SupportButton, PageHeader, PageContanier} from '../../components/buttons.jsx';
import PageHeader1 from '../../components/page-header/page-header';
import PageContanier1 from '../../components/page-contanier/page-contanier';
import EntryButton from '../../components/entry-button/entry-button';
import { Page } from '../../components/page/page';

class Support extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            // intl: this.props.intl.formatMessage({id:"version1"}).support,
            buttonList:[
                {
                    imgUrl: "&#xe6ee;",
                    txt: this.props.intl.formatMessage({id:"orderProcessing"}),
                    to: "/supportnew/faq"
                },
                {
                    imgUrl: "&#xe6f1;",
                    txt: this.props.intl.formatMessage({id:"tracking"}),
                    to: "/supportnew/faq"
                },
                {
                    imgUrl: "&#xe6ed;",
                    txt: this.props.intl.formatMessage({id:"return"}),
                    to: "/supportnew/faq"
                },
                {
                    imgUrl: "&#xe6ec;",
                    txt: this.props.intl.formatMessage({id:"product"}),
                    to: "/supportnew/faq"
                },
                {
                    imgUrl: "&#xe6ef;",
                    txt: this.props.intl.formatMessage({id:"payment"}),
                    to: "/supportnew/faq"
                },
                {
                    imgUrl: "&#xe6f2;",
                    txt: this.props.intl.formatMessage({id:"account"}),
                    to: "/supportnew/faq"
                },
            ]
        }
    }

    componentWillMount(){
        if (window.zE) {
            zE('webWidget:on', 'open', function () {
              zE('webWidget', 'show')
            })
      
            zE('webWidget:on', 'close', function () {
              zE('webWidget', 'hide')
            })
      
            zE('webWidget', 'helpCenter:setSuggestions', { search: 'FAQ' })
        }
    }

    render(){
        const {intl} = this.props;
        const {buttonList} = this.state;

        return(
            <div className={style.supportPage}>
                <Page label={intl.formatMessage({id: 'support'})} href="/index">
                    <div className={style.entryButtonBox}>
                        {
                            buttonList.map((item, index)=>{
                                return <EntryButton key={index} imgUrl={item.imgUrl} to={item.to} txt={item.txt}/>
                            })
                        }
                    </div>
                    <div className={style.clickToFAQ}>
                        {intl.formatMessage({id:"click"})}
                        <span onClick={()=>window.location.href="supportnew/faq"}>{intl.formatMessage({id:"faq"})}</span> 
                        {intl.formatMessage({id:"page"})} 
                    </div>
                    <div className={style.findMore}>
                        {intl.formatMessage({id:"findNothing"})}
                    </div>
                    <div className={style.contactUs} onClick={()=>window.location.href="supportnew/contact-us"}>
                        <span className={style.iconfont}>&#xe6e9;</span>
                        {intl.formatMessage({id:"contact"})}
                    </div>
                </Page>

            </div>
        )
    }
}


export default injectIntl(Support)
