import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import deeplink from '../../utils/deeplink'

const COUPONWRAPPER = styled.div`
    padding: 0 12px;
    padding-bottom: 46px;
`

const MESSAGE = styled.div`
    background-color: rgba(255, 241, 241, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
   
    .__text{
        color: rgba(233, 96, 96, 1);
    }

    .__add{
        color: rgba(233, 96, 96, 1);
        text-decoration: none;
    }
    
`

const NODE = styled.span`
    display: inline-block;
    background-color: rgba(251, 223, 223, 1);
    height: 4px;
    position: relative;
    &.__use::after{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgba(251, 223, 223, 1);
        content: '';
        display: inline-block;
        position: absolute;
        right: -5px;
        top: -3px;
        z-index: 2;
    }

    

    .__line{
        display: inline-block;
        position: absolute;
        height: 4px;
        top:0;
        left: 0;
        z-index: 1;
        background-color: rgba(233, 96, 96, 1);
    }

    .__tip{
        position: absolute;
        top: 0;
        z-index: 1;
        right: 0;
        font-family: AcuminPro-Bold;
        font-size: 12px;
        color: rgba(233, 96, 96, 1);
        transform: translateX(50%);
        top: -31px;
        background: url(https://image.geeko.ltd/upgrade/20210715/coupon-u.png) no-repeat center/100%;
        width: 66px;
        height: 20px;
        padding-left: 5px;
        line-height: 20px;
        text-transform: uppercase;
        display: inline-block;
    }

    &.active{
        background-color: rgba(233, 96, 96, 1);
        &::after{
            background-color: rgba(233, 96, 96, 1);
        }
        .__tip{
            background: url(https://image.geeko.ltd/upgrade/20210715/coupon-a.png) no-repeat center/100%;
        }
    }

    .__alert{
        position: absolute;
        top: 16px;
        z-index: 1;
        background-color: rgba(233, 96, 96, 1);
	    border-radius: 3px;
        color: #fff;
        font-family: AcuminPro-Bold;
	    font-size: 12px;
        padding: 4px 12px;
        white-space: nowrap;
        &::after{
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            background-color: rgba(233, 96, 96, 1);
            top: -2px;
            right: 8px;
            position: absolute;
            transform: rotate(-45deg);
        }
    }

    .__condition{
        position: absolute;
        z-index: 1;
        right: 0;
        top: 10px;
        transform: translateX(50%);
        font-family: SlatePro-Medium;
        color: rgba(233, 96, 96, 1);
        font-size: 12px;
    }
`

const NODES = styled.div`
    padding-top: 42px;
    display: flex;
`

const getWidth = (index, size) => {
    if (size === 2) {
        if (index === 1) {
            return '50%'
        }
        return '25%'
    }
    return `${100 / (size + 1)}%`
}


const Nodes = props => {

    const { nodes, value, msg } = props

    const unReached = nodes.map((n, index) => ({ index, node: n })).find(n => !n.node.usable)

    let pre, prevValue = 0, percent = 0
    if (unReached) {
        pre = nodes[unReached.index - 1]
        prevValue = pre ? pre.conditionValue : 0
        percent = (value - prevValue) * 100 / (unReached.node.conditionValue - prevValue)
    }


    return <div>
        <NODES>
            {
                nodes.map((node, index) => <NODE className={`__use ${node.usable ? 'active' : ''}`} style={{ width: getWidth(index, nodes.length) }} key={index}>
                    {
                        unReached && unReached.index === index && <span className="__line" style={{ width: `${percent}%`, display: 'inline-block' }}></span>
                    }

                    {
                        unReached && unReached.index === index && msg && <span style={{ right: `${100 - percent}%` }} className={`__alert`}>{msg}</span>
                    }

                    {
                        !node.usable && <span className="__condition">{node.condition}</span>
                    }

                    <span className="__tip">
                        {
                            node.couponName
                        }
                    </span>
                </NODE>)
            }


            <NODE className={!unReached ? 'active' : ''} style={{ width: getWidth(0, nodes.length) }}>
                {!unReached && <span style={{ right: 'calc(100% - 12px)' }} className="__alert">{msg}</span>}
            </NODE>
        </NODES>
    </div>
}

export default props => {
    const { couponMsg, couponLink, couponProgress, onBuy } = props

    let nodes

    if (couponProgress && couponProgress.nodes) {
        nodes = couponProgress.nodes
    }


    return <COUPONWRAPPER>
        {
            couponMsg && <div style={{ paddingTop: 14 }}>
                <MESSAGE>
                    <span className="__text" dangerouslySetInnerHTML={{ __html: couponMsg }} />
                    <a style={{fontSize: 12, fontFamily: 'SlatePro-Medium'}} onClick={onBuy} className="__add"><FormattedMessage id="shopnow" /> {'>'}</a>
                </MESSAGE>
            </div>
        }


        <div>
            {
                nodes && nodes.length && <Nodes nodes={nodes} value={couponProgress.value} msg={couponProgress.msg} />
            }
        </div>
    </COUPONWRAPPER>
}