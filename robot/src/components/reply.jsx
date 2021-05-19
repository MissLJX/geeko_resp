import React from 'react'
import styled from 'styled-components'



const ROBOTREPLY = styled.div`
    display: flex;
    padding-left: 12px;
    padding-right: 52px;

    img{
        max-width: 100%;
    }

    .__reply_bd{
        background-color: #fff;
	    border-radius: 4px;
        position: relative;
        padding: 18px 12px;
        display: inline-block;
        &::after{
            width: 10px;
            height: 10px;
            position: absolute;
            left: -5px;
            top: 17px;
            content: '';
            display: inline-block;
            background-color: #fff;
            transform: rotate(45deg);
        }
    }
`

const ROBOTICON = styled.span`
    width: 40px;
    height: 40px;
    background-color: #000000;
    color: #fff;
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 26px;
    flex-shrink: 0;
`

const USERICON = styled.span`
    width: 40px;
    height: 40px;
    background-color: pink;
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 26px;
    flex-shrink: 0;
    background-size: cover;
`


const USERREPLY = styled.div`
    display: flex;
    padding-right: 12px;
    padding-left: 52px;
    flex-direction: row-reverse;

    .__reply_bd{
        background-color: #dddddd;
	    border-radius: 4px;
        position: relative;
        padding: 18px 12px;
        display: inline-block;
        &::after{
            width: 10px;
            height: 10px;
            position: absolute;
            right: -5px;
            top: 17px;
            content: '';
            display: inline-block;
            background-color: #dddddd;
            transform: rotate(45deg);
        }
    }
`

export const RobotReply = props => {
    return <ROBOTREPLY>
        <ROBOTICON className="iconfont">&#xe644;</ROBOTICON>
        <div style={{marginLeft: 15}}>
            <div className="__reply_bd">
                {props.children}
            </div>
        </div>
    </ROBOTREPLY>
}

export const UserReply = props => {
    const {user} = props
    return <USERREPLY>
        
        <USERICON style={{backgroundImage:`url(https://image.geeko.ltd/icon/${user?.id})`}}/>
        <div style={{marginRight: 15}}>
            <div className="__reply_bd">
                {props.children}
            </div>
        </div>
    </USERREPLY>
}

