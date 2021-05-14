import React from 'react'
import styled from 'styled-components'

const HEADER = styled.div`
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    text-align: center;
`

const BACK = styled.span`
    color: #222;
    font-size: 18px;
    cursor: pointer;
    position: absolute;
    top:0;
    left: 20px;
`

const TITLE = styled.span`
    font-family: SlatePro-Medium;
    font-size: 17px;
    line-height: 14px;
    color: #222222;
`

export default props => {
    return <HEADER>
        <BACK className="iconfont" onBack={props?.onBack}>&#xe78a;</BACK>
        <TITLE>{props.text}</TITLE>
    </HEADER>
}