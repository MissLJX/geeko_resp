import Styled from 'styled-components'

export const CONTAINER = Styled.div`
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1200px) {
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
  }
`

export const CONTAINERGREY = Styled.div`
  background-color: #f2f2f2;
`

export const RES1 = Styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > *:nth-child(1){
    width: ${props => props.width1}px;
  }
  & > *:nth-child(2){
    width: ${props => props.width2}px;
  }

  & > *:nth-child(3){
    width: ${props => props.width3}px;
  }

  @media (max-width: 1200px) {
    & > *:nth-child(1){
      width: 100%;
    }
    & > *:nth-child(2){
      width: 100%;
    }
    & > *:nth-child(3){
      width: 100%;
    }
  }

`