import React from 'react'
import styled from 'styled-components'
import {FormattedMessage, injectIntl} from 'react-intl'
import {ColoredButton, PageHeader, PageContanier} from '../components/buttons.jsx'
import {get, sendRate} from '../api'

const TEXTAREA = styled.textarea`
  width: 100%;
  height: 180px;
  background-color: #f6f6f6;
  border: solid 1px #e6e6e6;
  padding: 10px;
`

const BTN = styled.div`
  display: inline-block;
  height: 36px;
  line-height: 34px;
  border-radius: 2px;
  border: solid 1px #eeeeee;
  padding-left: 25px;
  padding-right: 25px;
  color: #222;
  .__icon{
    font-family: iconfont;
    font-size: 18px;
    vertical-align: middle;
  }
  .__text{
    margin-left: 5px;
    vertical-align: middle;
  }

  &.selected{
    color: #fff;
    &.__good{
      background-color: #57b936;
      border-color: #57b936;
    }
    &.__bad{
      background-color: #f46e6d;
      border-color: #f46e6d;
    }
  }
`

const RATEBTN = styled.div`
  height: 46px;
  line-height: 46px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  color: #ffffff;
  background-color: #222;
`

const Rate = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ticket: null,
      rate: null
    }
  }

  handleRate () {
    sendRate(this.state.rate).then(() => {
      this.props.history.goBack()
    })
  }

  componentWillMount () {
    const { id } = this.props.match.params
    get(id).then(({result}) => {
      const {ticket} = result
      if (ticket) {
        this.setState({
          ticket,
          rate: ticket.ticketRateService ? {
            ...ticket.ticketRateService,
            id: ticket.id
          } : {
            message: '',
            rate: 5,
            id: ticket.id
          }
        })
      }
    })
  }

  render () {
    const { intl } = this.props

    const rateVO = this.state.rate

    return <div style={{backgroundColor: '#fff', minHeight: '100vh'}}>
      <PageHeader label={intl.formatMessage({id: 'rate'})}/>
      {
        rateVO && <PageContanier style={{padding: 12}}>
          <div>{intl.formatMessage({id: 'please_rate'})}</div>
          <div style={{marginTop: 10}}>
            <BTN className={`${rateVO.rate > 3 ? 'selected' : ''} __good`} onClick={ () => { this.setState({rate: {...this.state.rate, rate: 5}}) }}>
              <span className="__icon">&#xe756;</span>
              <span className="__text">{intl.formatMessage({id: 'satisfied'})}</span>
            </BTN>
            <BTN style={{marginLeft: 10}} className={`${rateVO.rate <= 3 ? 'selected' : ''} __bad`} onClick={ () => { this.setState({rate: {...this.state.rate, rate: 1}}) }}>
              <span className="__icon">&#xe757;</span>
              <span className="__text">{intl.formatMessage({id: 'unsatisfied'})}</span>
            </BTN>
          </div>

          <div style={{marginTop: 10}}>
            <TEXTAREA value={rateVO.message} placeholder={intl.formatMessage({id: 'you_can_rate'})} onChange={ (e) => { this.setState({rate: {...this.state.rate, message: e.target.value}}) } }/>
          </div>

          <div style={{position: 'fixed', bottom: 0, left: 0, width: '100%', padding: 12}}>
            <RATEBTN onClick={ this.handleRate.bind(this) }>Confirm</RATEBTN>
          </div>
        </PageContanier>
      }

    </div>
  }
}

export default injectIntl(Rate)
