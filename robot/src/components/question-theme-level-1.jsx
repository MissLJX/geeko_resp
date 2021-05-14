import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'

const ICON = styled.span`
    font-size: 30px;
    color: #666;
`

const TEXT = styled.span`
    color: #666;
    font-size: 14px;
    line-height: 16px;
`

const QUESTION = styled.div`
    background-color: #fff;
    border-radius: 4px;
    width: 100px;
	height: 100px;
    text-align: center;
    padding-top: 17px;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
`


export const Theme = props => {
    const {theme} = props
    return <QUESTION {...props}>
        <div>
            <ICON className="iconfont" dangerouslySetInnerHTML={{__html: theme.icon}}/>
        </div>
        <div style={{marginTop: 6}}>
            <TEXT>
                {theme.name}
            </TEXT>
        </div>
    </QUESTION>
}

export const Themes = props => {

    const { themes } = props

    const initialOpts = {
        slidesPerView: 'auto',
        spaceBetween: 8
    }

    return <Swiper {...initialOpts}>
    {
        themes?.map(theme => <SwiperSlide style={{width: 'auto'}} key={theme.id}>
            <Theme theme={theme} onClick={() => props.onTheme?.(theme)}/>
        </SwiperSlide>)
    }
</Swiper>
}


