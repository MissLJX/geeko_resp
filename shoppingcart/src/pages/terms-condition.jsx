import React from 'react'

import '../css/share.css'

import FullFixed from '../components/msite/full-fixed.jsx'

const TermsConditions = class extends React.Component{


    close(evt) {
		evt.preventDefault()
		this.props.history.goBack();
	}
    render(){
        return (
            <FullFixed onClose={this.close.bind(this)} title={'Terms & Conditions'}>
                <div>
                    {/* <div className="share-head">
                        <span className="iconfont close-page share-back" onClick={this.goBack.bind(this)}>&#xe693;</span>
                        <span></span>
                    </div> */}
                    
                    <div style={{fontSize: '14px',padding: '15px 10px',color: '#666'}}>
                        <p style={{lineHeight: '20px'}}>*Up to 50% OFF is valid only for new customers</p>
                        <p style={{lineHeight: '20px',marginTop:'10px'}}>If customers want to use the discount of up to  50% off, the referred person must (i) be a new customer, (ii) use a referral link to obtain the discount and (iii) make a purchase on  https://www.chicme.com specified in the referral offer prior to the discount's expiration. Referring customers will also receive a $10 coupon in their  https://www.chicme.com account after the referred person pay for the order.  And $10 coupon can be used when the order amount is more than $59. Customers may not refer anyone who has an existing  https://www.chicme.com account under an alternate email address. The discount is only valid for one month and the referred person can only use the discount once.</p>
                        <p style={{lineHeight: '20px',marginTop:'10px'}}>Any abuse of this offer, as determined by us in our sole discretion, may result in the rescission of the referring customer's referral discount and the referred person's discount as well as both parties' inability to participate in this or future promotions. Discount cannot be applied to previous purchases, and is not redeemable for cash. This referral program is subject to modification or termination at any time without notice in our sole discretion.</p>
                    </div>
                </div>
            </FullFixed>
        )
    }
}

export default TermsConditions;