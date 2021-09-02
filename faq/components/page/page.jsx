import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

const style =  `
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_w8akz97a3dr.eot');
        src: url('//at.alicdn.com/t/font_384296_w8akz97a3dr.eot?#iefix') format('embedded-opentype'),
            url('//at.alicdn.com/t/font_384296_w8akz97a3dr.woff2') format('woff2'),
            url('//at.alicdn.com/t/font_384296_w8akz97a3dr.woff') format('woff'),
            url('//at.alicdn.com/t/font_384296_w8akz97a3dr.ttf') format('truetype'),
            url('//at.alicdn.com/t/font_384296_w8akz97a3dr.svg#iconfont') format('svg');
    }
`
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
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    left: 13px;
    color: #222;
    font-weight: 600;
`

const PageContanierDiv = styled.div`
    width: 100%;
    height: calc(100vh - 44px);
    background: #fff;
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid;
    margin-top: 44px;
    overflow: hidden;
    overflow-y: scroll;
`


const PageHeader = (props) => {
    console.log(props)
    return <PageHeaderDiv>
        <span>{props.props.label}</span>
  		 <IconStyle onClick={() => {
  		 	if (props.props.to) {
  		 		props.props.history.replace(props.props.to)
  		 	} else if (props.props.href) {
  		 		window.location.href = props.props.href
  		 	} else {
  		 		props.props.history.goBack()
  		 	}
  		 }}>&#xe78a;</IconStyle>
    </PageHeaderDiv>
}

const PageContanier = (props) => {
    console.log(props.props)
    return (
        <PageContanierDiv style={props.props?props.props.style?props.props.style:{border:'none'}:{border:'none'}}>
            {props.props.children}



        </PageContanierDiv>
    )
}

const Page1 = (props) => {
    return <div>
        <PageHeader props={props}/>
        <PageContanier1 props={props}></PageContanier1>
    </div>
}


export const PageHeader1 = withRouter(PageHeader);
export const PageContanier1 = PageContanier;
export const Page = Page1; 