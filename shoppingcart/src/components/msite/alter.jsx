import React from 'react'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'

const ALTER_MASK = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .4);
    z-index: 10;
    top: 0;
    left: 0;
`

const ALTER_WINDOW = styled.div`
    background-color: #fff;
    padding: 22px 24px;
    max-width: 280px;
    border-radius: 12px;
    width: 90%;
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;

    .__content{
        font-size: 15px;
        line-height: 18px;
    }

    .__tools{
        display: flex;
        justify-content: space-between;
        margin-top: 18px;
    }

    .__btn{
        display: inline-block;
        border: solid 1px #e6e6e6;
        height: 28px;
        line-height: 26px;
        text-align: center;
        width: calc(50% - 8px);
        cursor: pointer;
        border-radius: 2px;
    }

    .__btn.black{
        border-color: #222;
        background-color: #222;
        color: #fff;
    }
`

export const ConfirmAlter = class extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const { content, yesLabel, noLabel, yesBack, noBack } = this.props
        return <React.Fragment>
            <ALTER_MASK/>
            <ALTER_WINDOW>
                <div className="__content">
                    { content }
                </div>
                <div className="__tools">
                    <span onClick={evt => {noBack()}} className="__btn">{noLabel || <FormattedMessage id="cancel"/>}</span>
                    <span onClick={evt => {yesBack()}} className="__btn black">{yesLabel || <FormattedMessage id="yes"/>}</span>
                </div>
                
            </ALTER_WINDOW>
        </React.Fragment>
    }
}