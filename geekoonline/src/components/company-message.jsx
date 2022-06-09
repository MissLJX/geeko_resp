import React from "react";
import Styled from "styled-components";

const LABELVALUE = Styled.div`
  .__label{
    font-size: 12px;
	  font-weight: bold;
	  color: #000000;
  }
  .__value{
    font-size: 12px;
	  color: #000000;
  }
`

const LABEVALUES = Styled.div`
  & > div{
    margin-top: 13px;
    &:first-child{
      margin-top:0;
    }
  }
  margin-top: 25px;
`

export default class extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <React.Fragment>
            <LABEVALUES>
                <LABELVALUE>
                <span className="__label">上海地址：</span>
                <span className="__value">上海市浦东新区锦绣东路2777弄36号10楼</span>
                </LABELVALUE>
                <LABELVALUE>
                <span className="__label">电话：</span>
                <span className="__value">021 61762186</span>
                </LABELVALUE>
                <LABELVALUE>
                <span className="__label">E-mail：</span>
                <span className="__value">hr@geeko.online</span>
                </LABELVALUE>
            </LABEVALUES>
        </React.Fragment>
    }
}