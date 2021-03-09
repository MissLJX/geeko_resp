import React from 'react'
import sytled from 'styled-components'

const SHIPPINGMETHODHEAD = sytled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    cursor: pointer;

    .__title{
        font-size: 15px;
    }

    .__time{
        font-size: 12px;
    }

    & > div{
        &:last-child{
            flex-shrink: 0;
            width: 136px;
            text-align: right;
        }
    }
`

const ShippingMethodHead = props => {
    const { shippingMethod } = props


    return <SHIPPINGMETHODHEAD {...props}>
        <div>
            <div><span className="__title">{shippingMethod.title}</span></div>
            <div style={{marginTop: 5}}><span className="__time">{shippingMethod.shippingTime}</span></div>
        </div>
        <div>
            <span><img style={{width:110}} src="https://dgzfssf1la12s.cloudfront.net/upgrade/20210304/shippingmethod.png"/></span>
            <span style={{marginLeft: 10}} className="iconfont">&#xe694;</span>
        </div>
    </SHIPPINGMETHODHEAD>
}

export default ShippingMethodHead