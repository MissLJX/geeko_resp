import React from 'react'

import '../css/share.css'
import { toShareEmail } from '../api/index.js'
import { injectIntl, FormattedMessage } from 'react-intl'

import FullFixed from '../components/msite/full-fixed.jsx'
// import { __route_root__ } from '../utils/utils.js'



const FriendEmail = props => <div style={{marginTop:'20px',marginBottom:'20px'}}>
    <label className="share-form-label">Friend's Email</label>
    <input {...props}/>
</div>

const SendEmail = class extends React.Component{
    constructor(props){
        super(props)

        const {intl} = props
        const value = intl.formatMessage({ id: 'the_site_has_so_many' })
        const value2 = intl.formatMessage({ id: 'send_you_up' })
        this.state = {
            emails: [],
            subject: value2,
            note: value
        }

        this.inputChange = this.inputChange.bind(this)
        this.emailChange = this.emailChange.bind(this)
        this.createAEmail = this.createAEmail.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.emailId = 1
        this.returnTop = this.returnTop.bind(this);
        this.close = this.close.bind(this);
    }


    componentDidMount(){
        this.setState({
            emails: [
                this.createAEmail(),
                this.createAEmail()
            ]
        })
    }

    createAEmail(){
        return {
            id: this.emailId++,
            value: ''
        }
    }

    returnTop(){
        this.props.history.goBack();
    }

    inputChange(evt){
        const {name, value} = evt.target
        this.setState({
            [name]: value
        })
    }

    emailChange(evt, id){
        const {value} = evt.target

        const newEmails = this.state.emails.map(email => {
            if(email.id === id){
                return {...email, value}
            }
            return email
        })

        this.setState({
            emails: newEmails
        })
    }

    addEmail(evt){
        evt.preventDefault()
        this.setState({
            emails: [...this.state.emails, this.createAEmail()]
        })
    }

    submitEmail(e){
        e.preventDefault();
        const { emails,subject,note } = this.state;
        var arr = [];
        for(let i =0;i<emails.length;i++){
            if(emails[i].value){
                arr[i] = emails[i].value;
            }else{
                return arr;
            }
        }

        console.log("arr",arr.join(','));

        var paylod = {
			emails: arr.join(','),
			subject: subject || 'Sending you up to 50% OFF at Chicme',
			content: note || 'Chicme has so many must-haves. Check out their new arrivals and get up to 50% OFF for your first order!! You’re welcome'
        }
        

        toShareEmail(paylod).then(data => {
            alert("Success!");
            this.props.history.goBack();
        }).catch(data => {
            if(data && data.result){
                alert(data.result);
            }
        })

    }

    close(evt) {
		evt.preventDefault()
		this.props.history.goBack();
	}

    render(){
        const {subject, note, emails, intl} = this.state
        return (
            <FullFixed onClose={this.close} title={<FormattedMessage id="share_via_email" />}>
            <div id="shareemail">
                    {/* <div className="share-head">
                        <span className="iconfont close-page share-back" onClick={this.returnTop}>&#xe693;</span>
                        <span>Share via Email</span>
                    </div>   */}
                    <div style={{paddingLeft:'10px',paddingRight:'10px'}}>
                    <div style={{marginTop:'15px',fontSize:'16px'}}><FormattedMessage id="to" />:</div>
                        <form>
                            {
                                emails && emails.length > 0 && emails.map( email => <FriendEmail className="share-form-input" value={email.value} key={email.id} onChange={(evt) => this.emailChange(evt, email.id)}/> )
                            }

                            <button onClick={this.addEmail.bind(this)} className="invite-btn" style={{cursor:'pointer'}}><FormattedMessage id="invite_more" /></button>

                            

                            <div>
                                <div className="share-form-label" style={{color:'black',fontWeight:'bold',marginTop:'15px',fontSize:'13px'}}><FormattedMessage id="subject" /></div>
                                <input className="share-form-input" name="subject" value={subject} onChange={this.inputChange}/>
                            </div>
                            <div>
                                <div className="share-form-label" style={{color:'black',fontWeight:'bold',marginTop:'15px',fontSize:'13px'}}><FormattedMessage id="note" /></div>
                                <textarea id="note" style={{height: '75px'}} className="share-form-input" name="note" value={note} onChange={this.inputChange}/>
                            </div>

                            <div style={{marginBottom:'30px'}}>
                                <button className="share-btn" type="submit" onClick={this.submitEmail}><FormattedMessage id="send_email" /></button>
                            </div>
                        </form>
                </div>

            </div>
        </FullFixed>)
    }
}

export default injectIntl(SendEmail);