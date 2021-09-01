import React from 'react';
import style from './support.module.css';
import {FormattedMessage, injectIntl} from 'react-intl';

import {SupportButton, PageHeader, PageContanier} from '../../components/buttons.jsx';
import PageHeader1 from '../../components/page-header/page-header';
import PageContanier1 from '../../components/page-contanier/page-contanier';
import EntryButton from '../../components/entry-button/entry-button';

class Support extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            buttonList:[
                {
                    imgUrl: "&#xe6ee;",
                    txt: "Order Processing",
                    to: "/support/faq"
                },
                {
                    imgUrl: "&#xe6f1;",
                    txt: "Logistics Tracking",
                    to: "/support/faq"
                },
                {
                    imgUrl: "&#xe6ed;",
                    txt: "Return & Refund",
                    to: "/support/faq"
                },
                {
                    imgUrl: "&#xe6ec;",
                    txt: "Product & Stock",
                    to: "/support/faq"
                },
                {
                    imgUrl: "&#xe6ef;",
                    txt: "Payment & Promos",
                    to: "/support/faq"
                },
                {
                    imgUrl: "&#xe6f2;",
                    txt: "Account Issues",
                    to: "/support/faq"
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
        console.log(this.props.location.params)
    }

    render(){
        const {intl} = this.props;
        const {buttonList} = this.state;
        console.log(buttonList)
        return(
            <div className={style.supportPage}>
                <PageHeader1 label={intl.formatMessage({id: 'support'})} href="/index"/>
                <PageContanier1>
                    <div className={style.entryButtonBox}>
                        {
                            buttonList.map((item, index)=>{
                                return <EntryButton key={index} imgUrl={item.imgUrl} to={item.to} txt={item.txt}/>
                            })
                        }
                    </div>
                    <div className={style.clickToFAQ}>
                        {"For all Q&As Please Click on our"}
                        <span onClick={()=>window.location.href="support/faq"}>FAQ</span> 
                        page 
                    </div>
                    <div className={style.findMore}>
                        Can't find the answer you are looking for?
                    </div>
                    <div className={style.contactUs} onClick={()=>window.location.href="support/contact-us"}>
                        <span className={style.iconfont}>&#xe6e9;</span>
                        Contact Us
                    </div>
                </PageContanier1>

            </div>
        )
    }
}


export default injectIntl(Support)
