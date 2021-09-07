import React from 'react';
import style from './support.module.css';
import {FormattedMessage, injectIntl} from 'react-intl';
// import EntryButton from '../../components/entry-button/entry-button';
import { Page } from '../../components/page/page';
import {EntryButton} from '../../components/newComponents/new-components'
import styled from 'styled-components';

const EntryButtonBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    padding: 8px 0 0 0;
`

const ClickToFAQ = styled.div`
    font-family: Roboto-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 14px;
    letter-spacing: 0px;
    color: #666666;
    width: 100%;
    /* line-height: 54px; */
    min-height: 54px;
    text-align: center;
    border-bottom: 1px solid #e6e6e6;
    /* border: 1px solid; */
    padding: 20px 0;
    & > span {
        margin: 0 3px;
        font-family: Roboto-Regular;
        text-decoration: underline;
        font-size: 12px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #222222;
    }
`

const FindMore = styled.div`
    font-family: Roboto-Medium;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 14px;
    letter-spacing: 0px;
    color: #222222;
    width: 100%;
    text-align: center;
    line-height: 54px;
    height: 54px;
    text-shadow: 0 0 #222;
    text-align: center;
`

const ContactUs = styled.div`
    width: 140px;
    height: 32px;
    background-color: #222;
    border-radius: 2px;
    color: #fff;
    line-height: 32px;
    text-align: center;
    margin: 0 auto;
    & > span{
        margin-right: 8px;
    }
`

const ContactIcon = styled.span`
    @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_j1fq1nejzkl.woff2?t=1630049678280') format('woff2'),
            url('//at.alicdn.com/t/font_384296_j1fq1nejzkl.woff?t=1630049678280') format('woff'),
            url('//at.alicdn.com/t/font_384296_j1fq1nejzkl.ttf?t=1630049678280') format('truetype');
    }
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

class Support extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            // intl: this.props.intl.formatMessage({id:"version1"}).support,
            buttonList:[
                {
                    imgUrl: "&#xe6ee;",
                    txt: this.props.intl.formatMessage({id:"orderProcessing"}),
                    to: `${(window.ctx || '')}/support/faq`
                },
                {
                    imgUrl: "&#xe6f1;",
                    txt: this.props.intl.formatMessage({id:"tracking"}),
                    to: `${(window.ctx || '')}/support/faq`
                },
                {
                    imgUrl: "&#xe6ed;",
                    txt: this.props.intl.formatMessage({id:"return"}),
                    to:`${(window.ctx || '')}/support/faq`
                },
                {
                    imgUrl: "&#xe6ec;",
                    txt: this.props.intl.formatMessage({id:"product"}),
                    to: `${(window.ctx || '')}/support/faq`
                },
                {
                    imgUrl: "&#xe6ef;",
                    txt: this.props.intl.formatMessage({id:"payment"}),
                    to: `${(window.ctx || '')}/support/faq`
                },
                {
                    imgUrl: "&#xe6f2;",
                    txt: this.props.intl.formatMessage({id:"account"}),
                    to: `${(window.ctx || '')}/support/faq`
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
            <div>
                <Page label={intl.formatMessage({id: 'support'})} href={ `${(window.ctx || '')}/index`}>
                    <EntryButtonBox>
                        {
                            buttonList.map((item, index)=>{
                                return <EntryButton key={index} imgUrl={item.imgUrl} to={item.to} txt={item.txt}/>
                            })
                        }
                    </EntryButtonBox>
                    <ClickToFAQ>
                        {intl.formatMessage({id:"click"})}
                        <span onClick={()=>this.props.history.push({pathname:  `${(window.ctx || '')}/support/faq`})}>{intl.formatMessage({id:"faq"})}</span> 
                        {intl.formatMessage({id:"page"})} 
                    </ClickToFAQ>
                    <FindMore>
                        {intl.formatMessage({id:"findNothing"})}
                    </FindMore>
                    <ContactUs onClick={()=>this.props.history.push({pathname:  `${(window.ctx || '')}/support/contact-us`})}>
                        <ContactIcon>&#xe6e9;</ContactIcon>
                        {intl.formatMessage({id:"contact"})}
                    </ContactUs>
                </Page>

            </div>
        )
    }
}


export default injectIntl(Support)
