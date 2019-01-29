import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import FullFixed from '../components/msite/full-fixed.jsx'
import { getCreditCards, toggleCreditStatus } from '../store/actions.js'
import { __route_root__ } from '../utils/utils.js'
import { deletecreditcard } from '../api'
import Refreshing from '../components/msite/refreshing.jsx'

const StyledFrame = styled.div`
	height: calc(100vh - 50px);
	overflow: scroll;
  -webkit-overflow-scrolling: touch;
	iframe{
		width: 100%;
		height: calc(100% - 130px);
		border: none;
	}
`

const mapStateToProps = (state) => {
	return {
		...state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		GETCREDITCARDS: (payMethod) => {
			return dispatch(getCreditCards(payMethod))
		},
		TOGGLECREDITSTATUS: (status) => {
			dispatch(toggleCreditStatus(status))
		}
	}
}
const Cards = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`

const HD = styled.h1`
  height: 50px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #e5e5e5;
  line-height: 50px;

`
const CardUL = styled.ul`
  & > li{
    border-top: 1px solid #e5e5e5;
    &:first-child{
      border-top: none;
    }
  }
`

const StyledCard = styled.div`
  height: 50px;
  cursor: pointer;
`

const DeleteIcon = styled.span`
  width: 22px;
  height: 22px;
  background-color: #999;
  border-radius: 50%;
  font-size: 14px;
  display: inline-block;
  cursor: pointer;
  color: #fff;
  text-align: center;
  line-height: 22px;
`

const CardBinding = class extends React.Component {
	constructor(props) {
		super(props)
		this.close = this.close.bind(this)
		this.deleteCardHandle = this.deleteCardHandle.bind(this)
		this.state = {
			frameUrl: `${window.ctx || ''}/w-site/anon/oceanpay?payMethod=${props.payMethod}`,
			frameLoading: true
		}
	}

	componentDidMount() {
		window.bindSuccess = () => {
			this.props.GETCREDITCARDS(this.props.payMethod).then(() => {
				this.props.TOGGLECREDITSTATUS(0)
				this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
			})
		}

		window.triggerFalse = (errcode) => {
			this.setState({
				frameUrl: this.state.frameUrl + '&_=' + new Date().getTime()
			})
		}

		if (!this.props.creditcards && this.props.payMethod) {
			this.props.GETCREDITCARDS(this.props.payMethod)
		}

		setTimeout(() => {
			this.setState({
				frameLoading: false
			})
		}, 5000)
	}

	deleteCardHandle(evt, cardId) {
		evt.preventDefault()
		if (confirm('Are you sure to delete this card?')) {
			deletecreditcard(cardId).then(() => {
				this.props.GETCREDITCARDS(this.props.payMethod)
			})
		}
	}

	frameLoadHandle() {
		this.setState({
			frameLoading: false
		})
	}

	close(evt) {
		evt.stopPropagation()
		this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
	}

	render() {
		const { creditcards } = this.props
		return <FullFixed onClose={this.close} title="Credit Card">
			<StyledFrame>
				{this.state.frameLoading && <Refreshing />}
				<iframe onLoad={this.frameLoadHandle.bind(this)} seamless src={this.state.frameUrl}></iframe>
				{
					creditcards && <Cards>
						<HD>Cards</HD>
						<CardUL>
							{
								creditcards.map(card => <li key={card.quickpayRecord.id}>
									<StyledCard>
										<div className="x-table __fixed x-fw x-fh __vm">
											<div className="x-cell">
												{card.quickpayRecord.cardNumber}
											</div>
											<div className="x-cell __right">
												<DeleteIcon onClick={(evt) => { this.deleteCardHandle(evt, card.quickpayRecord.id) }} className="iconfont">&#xe731;</DeleteIcon>
											</div>
										</div>
									</StyledCard>

								</li>)
							}
						</CardUL>
					</Cards>
				}
				<div style={{ height: 100 }}></div>
			</StyledFrame>

		</FullFixed>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CardBinding)
