import Styled from 'styled-components'

export const TITLE1 = Styled.span`
  font-size: 4.4rem;
  letter-spacing: 0px;
  color: #000000;
  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }
`

export const CONTENT1 = Styled.p`
  font-size: 1.8rem;
  line-height: 4.3rem;
  letter-spacing: .1rem;
  color: #000000;
  @media (max-width: 1200px) {
    font-size: 1.6rem;
    line-height: 2.6rem;
    letter-spacing: .1rem;
  }
`

export const CONTENT1S = Styled.div`
  & > p{
    margin-top: 12px;
    &:first-child{
      margin-top: 0;
    }
  }
 
 
`