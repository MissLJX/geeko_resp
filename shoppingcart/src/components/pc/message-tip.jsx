import styled from 'styled-components'

export default styled.div`
	background-color:#fef8f8;
  border: 1px solid #fd8585;
	padding: 10px;
	position: relative;
	&::before{
		width: 10px;
		height: 10px;
		border-left: solid 1px #fd8585;
		border-top: solid 1px #fd8585;
		background-color: #fef8f8;
		position: absolute;
		left: 50px;
		top: -6px;
		content: '';
		display: inline-block;
		transform: rotate(45deg);
	}
`
