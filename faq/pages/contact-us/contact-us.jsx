import React from 'react';
// import style from './contact-us.module.css'
import {FormattedMessage, injectIntl} from 'react-intl';
import { Page } from '../../components/page/page';
import styled from 'styled-components';

const ContactPage = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f6f6f6;
`
const EntryItem = styled.div`
    display: flex;
    background: #fff;
    height: 67px;
    align-items: center;
    margin-bottom: 10px;
`

const Icon = styled.span`
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
    margin-left: 23px;
    margin-right: 13px;
    margin-top: -20px;
    font-size: 19px;
`

const EntryInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Roboto-Bold;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    text-shadow: 0 0 #222;
    flex: 1;
`
const SupportTime = styled.span`
    font-family: Roboto-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
    text-shadow: none;
    margin-top: 7px;
`
const LinkTo = styled.span`
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
    // transform: rotate(180deg);
    margin-right: 13px;
    margin-left: 10px;
`


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
            <ContactPage>
                <Page label={intl.formatMessage({id: 'contact'})} style={{background:"#f6f6f6",border:'none',}} href={`${(window.ctx || '')}/support/faq`}>
                    <EntryItem onClick={()=> this.props.history.push({pathname:`${(window.ctx || '')}/support/ticket`})}>
                        <Icon>&#xe69c;</Icon>
                        <EntryInfoBox>
                            <span>{intl.formatMessage({id: 'Ticket'})}</span>
                            <SupportTime>{intl.formatMessage({id: 'within'})}</SupportTime>
                        </EntryInfoBox>
                        <LinkTo>&#xe690;</LinkTo>
                    </EntryItem>
                    <EntryItem onClick={() => window.location.href=`${(window.ctx || '')}/support/contact_us`}>
                        <Icon>&#xe770;</Icon>
                        <EntryInfoBox>
                            <span>{intl.formatMessage({id: 'online'})}</span>
                            <SupportTime>{intl.formatMessage({id: 'within'})}</SupportTime>
                        </EntryInfoBox>
                        <LinkTo>&#xe690;</LinkTo>
                    </EntryItem>
                </Page>
                
            </ContactPage>
        )
    }
}

export default injectIntl(ContactUs)