import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

const PageHeaderDiv = styled.div`
    width: 100%;
    height: 44px;
    background: #fff;
    color: #222;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: Roboto-Bold;
    font-size: 16px;
    line-height: 44px;
    font-weight: 600;
    font-stretch: normal;
    letter-spacing: 0px;
    max-width: 500px;
    margin: 0 auto;
    position: fixed;
    top: 0;
    z-index: 10;
`

const IconStyle = styled.i`
    @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('https://at.alicdn.com/t/font_384296_i4gbs9w8xo.woff2?t=1630652306181') format('woff2'),
            url('https://at.alicdn.com/t/font_384296_i4gbs9w8xo.woff?t=1630652306181') format('woff'),
            url('https://at.alicdn.com/t/font_384296_i4gbs9w8xo.ttf?t=1630652306181') format('truetype');
    }
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    left: 13px;
    color: #222;
    font-weight: 500;
`

const PageContanierDiv = styled.div`
    width: 100%;
    height: calc(100vh - 44px);
    background: #fff;
    max-width: 500px;
    margin: 0 auto;
    // border: 1px solid;
    margin-top: 44px;
    overflow: hidden;
    overflow-y: scroll;
`


const PageHeader = (props) => {
    // console.log(props)
    const p = props.props ? props.props : props;
    return <PageHeaderDiv >
        <span>{p.label}</span>
  		 <IconStyle onClick={() => {
  		 	if (p.to) {
  		 		props.history.replace(p.to)
  		 	} else if (p.href) {
  		 		// window.location.href = props.props.href
                props.history.push({pathname:p.href})
  		 	} else if(p.outApp){
                window.location.href = p.outApp;
            } else {
                   console.log('go back')
  		 		props.history.goBack()
  		 	}
  		 }}>&#xe7c7;</IconStyle>
    </PageHeaderDiv>
}

const PageContanier = (props) => {
    // console.log(props)
    const p = props.props ? props.props : props;
    // const bodyDom = useRef();
    console.log(p.style)

    let style = p.style ?  {
        width: '100%',
        height: 'calc(100vh - 44px)',
        background: '#fff',
        maxWidth: '500px',
        margin:'0 auto',
        // border: 1px solid;
        marginTop: '44px',
        overflow: 'hidden',
        overflowY: 'scroll',
        ...p.style
    } : {
        width: '100%',
        height: 'calc(100vh - 44px)',
        background: '#fff',
        maxWidth: '500px',
        margin:'0 auto',
        // border: 1px solid;
        marginTop: '44px',
        overflow: 'hidden',
        overflowY: 'scroll',
    }
    
    if(window.isApp == 'true'){
        style = {...style, height:'100vh', marginTop:'0px'}
    } else {
        style = {...style, height:'calc(100vh - 44px)', marginTop:'44px'}
    }

    return (
        <div style={style} id="pageScroll">
            {p.children}

        </div>
    )
}

export const PageHeader1 = withRouter(PageHeader);

const Page1 = (props) => {
    console.log(window.isApp)
    // console.log(props)
    return <div>
        {
            window.isApp !== 'true' &&
            <PageHeader1 props={props}/>
        }
        <PageContanier1 props={props}></PageContanier1>
    </div>
}

export const PageContanier1 = PageContanier;
export const Page = Page1; 