import React from 'react'
import styled from 'styled-components'
import Turn from './turn.jsx'

const TurnWrapper = styled.div`
	height: 50px;
	width: 100%;
`

export default (props) => (
  <TurnWrapper className="x-table __vm">
    <div className="x-cell">
      {props.children}
    </div>
    <div className="x-cell __right">
      <Turn turnAcitve={props.turnAcitve}/>
    </div>
  </TurnWrapper>
)
