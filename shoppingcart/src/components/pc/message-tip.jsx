import styled from 'styled-components'

export default styled.div`
	background-color: #fff9fc;
	border: solid 1px #f3a6c0;
	padding: 10px;
	position: relative;
	&::before{
		width: 10px;
		height: 10px;
		border-left: solid 1px #f3a6c0;
		border-top: solid 1px #f3a6c0;
		background-color: #fff9fc;
		position: absolute;
		left: 50px;
		top: -6px;
		content: '';
		display: inline-block;
		transform: rotate(45deg);
	}
`
