import styled from 'styled-components'


export default styled.div`
  position: relative;
  overflow: hidden;
  background-color: #e6e6e6;
  &::after{
    content: '';
    margin-top: 125%;
    display: block;
  }
  img{
    display: block;
    width: 100%;
    position: absolute;
    top:0;
    left:0;
  }
`