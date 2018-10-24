import React from 'react'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'

const CONFIRM = styled.div`
	background-color: #fff;
	width: 484px;
  padding-top: 83px;
  padding: 40px 62px;

	.__message{
		line-height: 20px;
		font-size: 14px;
	}

	


	.__btn{
		width: 170px;
		height: 32px;
		border-radius: 2px;
		font-family: HelveticaNeue-Medium;
		font-size: 14px;
		color: #fff;
		display: inline-block;
		cursor: pointer;
		text-align: center;
		line-height: 32px;
	}

	.__yes{
		background-color: #222;
	}

	.__no{
		background-color: #cacaca;
	}

	.__btns{
		margin-top: 25px;
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
