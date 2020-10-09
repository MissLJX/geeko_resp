import React from 'react'

import '../css/share.css'
import { toShareEmail } from '../api/index.js'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Modal } from '../components/pc/modal.jsx'
import styled from 'styled-components'

const ADDRESSBODY = styled.div`
  padding: 56px;
  background-color: #fff;
  width: 696px;
`

const ADDRESSTITLE = styled.div`
  font-family: HelveticaNeue-Medium;
  font-size: 24px;
  color: #222;
`

const FriendEmail = props => <div style={{marginTop:'20px',marginBottom:'20px'}}>
    <label className="share-form-label"><FormattedMessage id="friend_email" /></label>
    <input {...props}/>
</div>

const SendEmailPC = class extends React.Component{
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
        });
    }

    close(evt) {
		evt.preventDefault()
		this.props.history.goBack();
	}

    render(){
        const {subject, note, emails} = this.state
        return (
            <Modal onClose={this.close.bind(this)}>


            <ADDRESSBODY>
				<ADDRESSTITLE>
                    <FormattedMessage id="email" />
				</ADDRESSTITLE>
				<div id="shareemail">
                    <div style={{paddingLeft:'10px',paddingRight:'10px'}}>
                    <div style={{marginTop:'15px',fontSize:'16px'}}>To:</div>
                        <form>
                            {
                                emails && emails.length > 0 && emails.map( email => <FriendEmail className="share-form-input" value={email.value} key={email.id} onChange={(evt) => this.emailChange(evt, email.id)}/> )
                            }

                            <button onClick={this.addEmail.bind(this)} className="invite-btn" style={{cursor:'pointer'}}>+INVITE MORE</button>

                            

                            <div>
                                <div className="share-form-label" style={{color:'black',fontWeight:'bold',marginTop:'15px',fontSize:'13px'}}>Subject</div>
                                <input className="share-form-input" name="subject" value={subject} onChange={this.inputChange}/>
                            </div>
                            <div>
                                <div className="share-form-label" style={{color:'black',fontWeight:'bold',marginTop:'15px',fontSize:'13px'}}>Note</div>
                                <textarea id="note" style={{height: '75px'}} className="share-form-input" name="note" value={note} onChange={this.inputChange}/>
                            </div>

                            <div style={{marginBottom:'30px'}}>
                                <button className="share-btn" type="submit" onClick={this.submitEmail}>Send Email</button>
                            </div>
                        </form>
                </div>

            </div>

			</ADDRESSBODY>

            
            </Modal>)
    }
}

export default injectIntl(SendEmailPC);