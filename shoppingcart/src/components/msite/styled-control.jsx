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
			color: #e5004f;
		}
		input, select{
			border: 1px solid #e5004f;
    		box-shadow: inset 0 0 1px #e5004f;
		}
	}
`
