import React from 'react'
import styled from 'styled-components'

const Summaries = styled.ul`

`

const Summary = styled.li`
	font[size="16"]{
    font-size: 18px;
  }
  margin-top: 10px;
  &:first-child{
    margin-top: 0;
  }
`

export default ({orderSummary, style}) => {
  const {display} = orderSummary

  return <Summaries style={style}>

    {
      display.map(d => <Summary className="x-table x-fw" key={ d.label }>

        {
          d.label && <div className="x-cell">
            <span dangerouslySetInnerHTML={{__html: d.label}}/>
          </div>
        }

        <div className="x-cell __right">
          <span dangerouslySetInnerHTML={{__html: d.value}}/>
        </div>
      </Summary>)
    }

  </Summaries>
}
