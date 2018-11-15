import styled from 'styled-components'

export const StyledControl = styled.div`
	label{
		font-size: 12px;
		margin-bottom: 5px;
		display: block;
	}

	input, select{
		border: 1px solid #666;
		outline: none;
		-webkit-appearance: none;
    	outline: none;
    	box-shadow: none;
    	height: 35px;
    	width: 100%;
    	padding-left: 10px;
    	background-color: ${props => props.inputColor || 'transparent'};
	}


	& .error{
		p{
			font-size: 12px;
			margin-top: 5px;
			color: #E64545;
		}
		input, select{
			border: 1px solid #E64545;
    		box-shadow: inset 0 0 1px #E64545;
		}
	}
`

export const InlineStyledControl = styled.div`
	display: inline-block;
	label{
		font-size: 12px;
		margin-right: 10px;
	}

	input, select{
		border: 1px solid #666;
		outline: none;
		-webkit-appearance: none;
    	outline: none;
    	box-shadow: none;
    	height: 35px;
    	width: 100%;
    	padding-left: 10px;
    	background-color: ${props => props.inputColor || 'transparent'};
	}


	& .error{
		p{
			font-size: 12px;
			margin-top: 5px;
			color: #e5004f;
		}
		input, select{
			border: 1px solid #e5004f;
    		box-shadow: inset 0 0 1px #e5004f;
		}
	}
`
