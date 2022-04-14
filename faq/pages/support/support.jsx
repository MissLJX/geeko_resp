import React from 'react';
// import style from './support.module.css';
import {FormattedMessage, injectIntl} from 'react-intl';
// import EntryButton from '../../components/entry-button/entry-button';
import { Page } from '../../components/page/page';
import {EntryButton} from '../../components/newComponents/new-components'
import styled from 'styled-components';
import {list, getMe, getMessage} from '../../api'

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
    text-align: center;
    border-bottom: 1px solid #e6e6e6;
    padding: 8px 0 20px;
    & > span {
        margin: 0 3px;
        font-family: Roboto-Regular;
        text-decoration: underline;
        font-size: 12px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #222222;
        display: inline-block;

        &:active{
            color: #000;
            transform: scale(0.9);
            transition: all 0.3s;
        }
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
    display:flex;
    align-items: center;
    justify-content: center;
    height: 54px;
    text-align: center;
`

const ContactUs = styled.div`
    width: 140px;
    height: 32px;
    background-color: #222;
    border-radius: 2px;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Roboto-Regular;

    &:active{
        transform: scale(0.9);
        transition: all 0.3s;
    }

    & > span{
        margin-right: 8px;
        font-size:18px;
    }
`

const ContactUsStyle = {
    width: '140px',
    height: '32px',
    backgroundColor: '#222',
    borderRadius: '2px',
    color: '#fff',
    textAlign: 'center',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto-Regular'
}

const ContactIcon = styled.span`
    @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('https://at.alicdn.com/t/font_384296_i4gbs9w8xo.woff2?t=1630652306181') format('woff2'),
            url('https://at.alicdn.com/t/font_384296_i4gbs9w8xo.woff?t=1630652306181') format('woff'),
            url('https://at.alicdn.com/t/font_384296_i4gbs9w8xo.ttf?t=1630652306181') format('truetype');
    }
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

const TipText = styled.div`
    display: block;
    font-size: 12px;
    color: rgb(230,69,69);
    margin: 0px auto;
    text-align: center;
    margin-top: 20px;
`

let checkLogin = false;
class Support extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            me: '',
            // intl: this.props.intl.formatMessage({id:"version1"}).support,
            buttonList:[
                {
                    imgUrl: "&#xe6ee;",
                    txt: this.props.intl.formatMessage({id:"orderProcessing"}),
                    to: `${(window.ctx || '')}/support/faq`,
                    content:"order",
                    type:""
                },
                {
                    imgUrl: "&#xe6f1;",
                    txt: this.props.intl.formatMessage({id:"tracking"}),
                    to: `${(window.ctx || '')}/support/faq`,
                    content:"logistics",
                    type:""
                },
                {
                    imgUrl: "&#xe6ed;",
                    txt: this.props.intl.formatMessage({id:"return"}),
                    to:`${(window.ctx || '')}/support/faq`,
                    content:"refund",
                    type:""
                },
                {
                    imgUrl: "&#xe6ec;",
                    txt: this.props.intl.formatMessage({id:"product"}),
                    to: `${(window.ctx || '')}/support/faq`,
                    content:"payment",
                    type:""
                },
                {
                    imgUrl: "&#xe6ef;",
                    txt: this.props.intl.formatMessage({id:"payment"}),
                    to: `${(window.ctx || '')}/support/faq`,
                    content:"product",
                    type:""
                },
                {
                    imgUrl: "&#xe6f2;",
                    txt: this.props.intl.formatMessage({id:"account"}),
                    to: `${(window.ctx || '')}/support/faq`,
                    content:"account",
                    type:""
                },
            ],
            newsTip: 'To ensure the safety, the products will be throughly sterilized. Orders may experience delays for 2-3 days. We apologize for any inconvenience and appreciate your understanding.',
        }
    }

    componentWillMount(){
        document.title = this.props.intl.formatMessage({id: 'support'});
        if (window.zE) {
            zE('webWidget:on', 'open', function () {
              zE('webWidget', 'show')
            })
      
            zE('webWidget:on', 'close', function () {
              zE('webWidget', 'hide')
            })
      
            zE('webWidget', 'helpCenter:setSuggestions', { search: 'FAQ' })
        }
        getMe().then(res => {
            console.log(res)
            if(res && res.code == 200){
                this.setState({
                    me: res.result || ''
                })
            }
        }).catch(err=>{
            console.error(err)
        })
    }

    componentDidMount(){
        const { me } = this.state
        if(window.addFaceBookJs){
            console.log('...')
            window.FB = null
            window.fbAsyncInit.hasRun = false;
            window.addFaceBookJs(me.id)
        }
        getMessage('M1645').then(res => {
            console.log(res)
            if(res && res.code == 200 && res.result){
                this.setState({
                    newsTip: res.result.message
                })
            }
        })

    }

    componentWillUpdate(){
        console.log('update')
    }
 

    // contact us 
    contactRef(dom){
        if (dom && window.sourceObserver && !this.contactrf) {
			window.sourceObserver.observe(dom)
			this.contactrf = dom
		}
    }


    render(){
        console.log('render')
        const {intl} = this.props;
        const {buttonList, me} = this.state;
        

        const toContact = () => {
            console.log(checkLogin)
            if(!checkLogin){
                checkLogin = true
                list(0,20).then(({result: items}) => {
                    checkLogin = false
                    this.props.history.push({pathname: `${(window.ctx || '')}/support/contact-us`})
                }).catch((err)=>{
                    checkLogin = false
                    // console.log(err)
                    if(err.code == 300){
                        if(window.isShowApp=="true"){
                            window.location.href = "chic-me://chic.me/loginRoot"
                        } else {
                            window.location.href = `${(window.ctx || '')}/i/login?redirectUrl=${(window.ctx || '')}/support/contact-us`
                        }
                    }
                    
                })
            }
            
        }

        const outAppUrl = () => {
            if(window.isShowApp == 'true'){
                return "chic-me://chic.me/index";
            } else {
                return `${(window.ctx || '')}/index`;
            }
        }

        const linkTo = (url,title) => {
            this.props.history.push({pathname:url, params:{title: title}})
        }    

        return(
            <div>
                {/* outApp={outAppUrl()} */}
                <Page label={intl.formatMessage({id: 'support'})}>
                    <EntryButtonBox>
                        {
                            buttonList.map((item, index)=>{
                                return <EntryButton 
                                            key={index} 
                                            imgUrl={item.imgUrl} 
                                            to={item.to} 
                                            txt={item.txt} 
                                            data-title={'support'}
                                            data-content={item.content}
                                            data-type={'supportClick'}
                                            linkTo={(url,title)=>linkTo(url,title)}
                                            />
                            })
                        }
                    </EntryButtonBox>
                    
                    <ClickToFAQ>
                        {intl.formatMessage({id:"click"})}
                        <span onClick={()=>this.props.history.push({pathname: `${(window.ctx || '')}/support/faq`})}>{intl.formatMessage({id:"faq"})}</span> 
                        {intl.formatMessage({id:"page"})} 
                    </ClickToFAQ>
                    
                    <FindMore>
                        {intl.formatMessage({id:"findNothing"})}
                    </FindMore>
                    
                    <ContactUs
                        innerRef={this.contactRef.bind(this)}
                        onClick={()=>toContact()}
                        data-title={'ContactUs'}
                        data-content={'contactUs'}
                        data-type={'contactUsClick'}
                        data-source
                        data-source-click
                        >
                        <ContactIcon>&#xe6e9;</ContactIcon>
                        {intl.formatMessage({id:"contact"})}
                    </ContactUs>

                    {
                        this.state.newsTip &&
                        <TipText>
                            {this.state.newsTip}
                        </TipText>
                    }
                    

                    {
                        !me.subscribeToFacebookMessage && 
                        <div style={{ textAlign: 'center', position: 'relative', top: 30 }}>
                            <div id="fmsg" style={{ display: 'none', fontSize: 12, color: this.state.newsTip?'#222':'rgb(230,69,69)', width: '80%',margin: '0 auto',}}>{intl.formatMessage({ id: 'facebook_check' })}</div>
                            <div className="fb-messenger-checkbox"
                                target="_top"
                                origin={window.__FB_Origin}
                                page_id={window.__FB_Page_ID}
                                messenger_app_id={window.__FB_Messenger_App_ID}
                                user_ref={window.__FB_User_Ref}
                                size="small"
                                skin="light"
                                center_align="true"
                                >
                            </div>

                        </div>
                    }
                    
                </Page>

            </div>
        )
    }
}


export default injectIntl(Support)
