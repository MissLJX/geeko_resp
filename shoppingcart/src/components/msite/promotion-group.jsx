import React from 'react'
import styled from 'styled-components'
import Items from './items.jsx'
import CheckBox from '../checkbox.jsx'
import { GiftIcon } from '../promotion-icons.jsx'
import { FormattedMessage } from 'react-intl'
import Icon from '../icon.jsx'
import OverSeasHouseHead from './overseas-house-head.jsx'
import { getLink } from '../../utils/utils.js'
import Ask from '../../components/ask.jsx'
import FixedMessage from '../../components/msite/fixed-message.jsx'
import Mask from '../../components/mask.jsx'

const Tip = styled.div`
	background-color: #fef8f8;
	padding: 10px;
	line-height: 18px;
	font-size: 12px;
`

const PROMOTIONHEAD = styled.div`
	height: 45px;
	padding-left: 10px;
	
	border-top: 1px solid #e6e6e6;
	& > .__hd{
		height:100%;
		width:100%;
		border-bottom: 1px solid #e6e6e6;
		padding-right: 10px;
	}

	.__href{
		text-decoration: none;
		color: #222;
		& > *{
			vertical-align: middle;
		}
	}
`

const PromotionHead = ({promotion, selected, selectHandle}) => <PROMOTIONHEAD>
	<div className="x-table __hd __vm">
		<div className="x-cell">
			<CheckBox onClick={ () => { selectHandle(!selected) } } className={selected ? 'selected' : ''}/>
		</div>
		<div className="x-cell">
			<GiftIcon label={promotion.title}/>
		</div>
		<div className="x-cell __right">
			<a className="__href" href={getLink(promotion.deepLink)}>
				<FormattedMessage id="add"/>
				<Icon style={{fontSize: 16, marginLeft: 5}}>&#xe694;</Icon>
			</a>
		</div>
	</div>
</PROMOTIONHEAD>


const BirdHead = ({promotion, selected, selectHandle, askClick}) => <PROMOTIONHEAD style={{height:'auto'}}>
	<div className="x-table __hd __vm" style={{paddingTop:10, borderBottom:'none'}}>
		<div className="x-cell" style={{width:30}}>
			<CheckBox onClick={ () => { selectHandle(!selected) } } className={selected ? 'selected' : ''}/>
		</div>
		<div className="x-cell">
			<div>{promotion.title} <Ask style={{ marginLeft: 4 }} onClick={ evt => { askClick(promotion.description) } }/></div>
		</div>
	</div>
</PROMOTIONHEAD>

const Promotion = class extends React.Component {
	constructor (props) {
		super(props)
		this.groupClick = this.groupClick.bind(this)
		this.state = {
			showAsk: false,
			askMessage: ''
		}
	}

	askClick(description){
		this.setState({
			showAsk: true,
			askMessage: description
		})
	}

	groupClick (selected) {
		const {delivery} = this.props

		const items = delivery.shoppingCartProducts || []

		const variantIds = items.map(item => item.variantId)
		this.props.groupClick(variantIds, selected)
	}

	selected () {
		const { delivery } = this.props
		let _selected = true
		let items = delivery.shoppingCartProducts
		for (let j = 0, jen = items.length; j < jen; j++) {
			if (!items[j].selected) {
				_selected = false
				break
			}
		}

		return _selected
	}

	disabledFunc (item) {
		return false
	}

	render () {
		const {delivery} = this.props

		let count = 0

		// items.forEach(i => {
		//   count += i.quantity
		// })



		const getPromotionHead = ( promotion ) => {
			if(promotion){
				switch(promotion.style){
				case 2:
					return BirdHead
				default:
					return PromotionHead
				}
			}
			return null
		}


		const PHead = getPromotionHead(delivery.combinatorialPromotion)


		return <div>
			{ PHead && <PHead askClick={this.askClick.bind(this)} selectHandle={ this.groupClick } selected={this.selected()} promotion={delivery.combinatorialPromotion}/> }
			<Items serverTime={this.props.serverTime}
				disabledFunc={this.disabledFunc}
				quantityChange={this.props.quantityChange}
				itemEdit={this.props.itemEdit}
				itemDelete={this.props.itemDelete}
				itemSelect={(variantId, selected) => { this.props.itemSelect(variantId, selected) }}
				combinatorialPromotionTitle = {delivery.combinatorialPromotion ? delivery.combinatorialPromotion.title : null}
				items={delivery.shoppingCartProducts}/>


			{
				this.state.showAsk && this.state.askMessage && (
					<React.Fragment>
						<Mask />
						<FixedMessage onClose={() => { this.setState({ showAsk: false, askMessage: null }) }}>
							<p dangerouslySetInnerHTML={{ __html: this.state.askMessage }} />
						</FixedMessage>
					</React.Fragment>
				)
			}
		</div>
	}
}

export default class extends React.Component {
	constructor (props) {
		super(props)
		this.groupClick = this.groupClick.bind(this)
	}

	groupClick (selected) {
		const variantIds = []
		const { group } = this.props
		const deliveryItems = group.deliveryItems
		deliveryItems.forEach(delivery => {
			let items = delivery.shoppingCartProducts
			if (items && items.length) {
				items.forEach(item => {
					variantIds.push(item.variantId)
				})
			}
		})

		this.props.groupClick(variantIds, selected)
	}

	selected () {
		// return !this.props.items.find(item => !item.selected)
		const { group } = this.props
		const deliveryItems = group.deliveryItems
		let _selected = true

		let items
		outer:
		for (let i = 0, len = deliveryItems.length; i < len; i++) {
			items = deliveryItems[i].shoppingCartProducts
			if (!items) continue outer
			for (let j = 0, jen = items.length; j < jen; j++) {
				if (!items[j].selected) {
					_selected = false
					break outer
				}
			}
		}

		return _selected
	}

	render () {
		const {shippingMethod, group, selected, itemSelect, shippingMsg, isShippingHead} = this.props

		let count = 0

		// items.forEach(i => {
		//   count += i.quantity
		// })

		const { deliveryItems, shippingPrice } = group

		const hideHead = deliveryItems && deliveryItems.length === 1 && deliveryItems[0].combinatorialPromotion && !isShippingHead

		return <div>


			{!hideHead && <OverSeasHouseHead count={count} groupClick={this.groupClick} shippingMethod={shippingMethod} isShippingHead={isShippingHead} selected={this.selected()}/>}

			
			{
				shippingMsg && <Tip>
					<span dangerouslySetInnerHTML={{__html: shippingMsg}}/>

				</Tip>
			}

			{
				deliveryItems.map((delivery, i) => <div key={i}>
					<Promotion serverTime={this.props.serverTime}
						quantityChange={this.props.quantityChange}
						itemEdit={this.props.itemEdit}
						itemDelete={this.props.itemDelete}
						itemSelect={(variantId, selected) => { this.props.itemSelect(variantId, selected) }}
						delivery={delivery}
						groupClick={this.props.groupClick}/>
				</div>)
			}

		</div>
	}
}
