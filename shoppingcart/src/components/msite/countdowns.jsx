import React from 'react'
import styled from 'styled-components'

const __dayoffset = 1000 * 60 * 60 * 24, __houroffset = 1000 * 60 * 60, __minuteoffset = 1000 * 60
const getFullNumber = (number) => number >= 10 ? number : ('0' + number)

export const CountDown = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lefting: 0
    }
  }

  getStructeDate (lefting) {
    const day = Math.floor(lefting / __dayoffset)
    const _leftday = lefting % __dayoffset
    const hour = Math.floor(_leftday / __houroffset)
    const _lefthour = lefting % __houroffset
    const minute = Math.floor(_lefthour / __minuteoffset)
    const second = Math.floor((lefting % __minuteoffset) / 1000)

    return {
      day: getFullNumber(day),
      hour: getFullNumber(hour),
      minute: getFullNumber(minute),
      second: getFullNumber(second)
    }
  }

  componentDidMount () {
    const { offset } = this.props
    this.setState({
      lefting: offset
    })
    this.timerID = setInterval(() => {
      this.setState({
        lefting: this.state.lefting - 1000
      })
    }, 1000)
  }

  componentWillUnMount () {
    clearInterval(this.timerID)
  }

  render () {
    const {day, hour, minute, second} = this.getStructeDate(this.state.lefting)
    const {showDay, showHour} = this.props
    return <span {...this.props}>
      {showDay && <React.Fragment><span>{day}</span><i>:</i></React.Fragment>}
      {showHour && <React.Fragment><span>{hour}</span><i>:</i></React.Fragment>}
      <span>{minute}</span><i>:</i>
      <span>{second}</span>
    </span>
  }
}

const StyledCountDown = styled.span`
  & > span{
      &>span{
        background-color: #222;
        width: 30px;
        height: 30px;
        text-align: center;
        color: #fff;
        border-radius: 2px;
        display: inline-block;
        line-height: 30px;
        font-size: 16px;
      }
      &>i{
        font-size:18px;
        color: #222;
        font-style: normal;
      }
  } 
`

export const CountDownBlock = (props) => <StyledCountDown>
  <CountDown {...props}/>
</StyledCountDown>
