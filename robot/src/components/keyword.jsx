import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'

const KEYWORD = styled.span`
    height: 28px;
    background-color: #ffffff;
    border: solid 1px #eeeeee;
    padding-left: 10px;
    padding-right: 10px;
    color: #666666;
    font-size: 12px;
    display: inline-block;
    line-height: 26px;
`

const KeyWord = props => {
    const { keyword } = props
    return <KEYWORD onClick={props.onKeyWord?.(keyword)}>
        {keyword.name}
    </KEYWORD>
}

export const KeyWords = props => {
    const { keywords } = props

    const initialOpts = {
        slidesPerView: 'auto',
        spaceBetween: 10
    }

    return <Swiper {...initialOpts}>
    {
        keywords?.map(keyword => <SwiperSlide style={{width: 'auto'}} key={keyword.id}>
            <KeyWord keyword={keyword}/>
        </SwiperSlide>)
    }
    </Swiper>
}