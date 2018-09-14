import React from 'react'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'

const CONFIRM = styled.div`
	background-color: #fff;
	width: 696px;
	padding-top: 85px;
	padding: 77px 82px;

	.__message{
		line-height: 20px;
		font-size: 18px;
	}

	


	.__btn{
		width: 240px;
		height: 40px;
		border-radius: 2px;
		font-family: HelveticaNeue-Medium;
		font-size: 16px;
		color: #fff;
		display: inline-block;
		cursor: pointer;
		text-align: center;
		line-height: 40px;
	}

	.__yes{
		background-color: #e7004d;
	}

	.__no{
		background-color: #cacaca;
	}

	.__btns{
		margin-top: 45px;
		& > .__btn{
			margin-left: 20px;
			&:first-child{
				margin-left: 0;
			}
		}
	}
`

export default (props) => {
  return <CONFIRM>
    <div className="__message">
      {props.children}
    </div>
    <div className="__btns">
      <div className="__btn __no" onClick={ props.no }><FormattedMessage id="no"/></div>
      <div className="__btn __yes" onClick={ props.yes }><FormattedMessage id="yes"/></div>
    </div>
  </CONFIRM>
}
