import styled from 'styled-components'

export const SearchInput = styled.input`
  		border: none;
  		-webkit-appearance: none;
  		box-shadow: none;
  		outline: none;
  		background: transparent;
  		height: 100%;
  		width: calc(100% - 25px);
  	`

export const SearchButton = styled.i`
  		font-family: iconfont;
  		font-style: normal;
  		font-size: 22px;
  	`

export const SearchInputContainer = styled.div`
  		height: ${props => '42px'};
  		border-radius: ${props => '21px'};
  		background-color: #fff;
  		padding-left: 20px;
  		padding-right: 20px;
  		line-height: ${props => '42px'};
  	`
export const Wrapper = styled.div`
      position: relative;
    `
