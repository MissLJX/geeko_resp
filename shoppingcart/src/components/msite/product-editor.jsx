import React from 'react'
import styled from 'styled-components'
import {product} from '../../api'
import Ellipsis from '../ellipsis.jsx'
import Money from '../money.jsx'
import {Grey, Red} from '../text.jsx'
import Icon from '../icon.jsx'
import SizeColorBlockers from './size-color-blockers.jsx'
import _ from 'lodash'
import Quantity from '../quantity.jsx'
import {BigButton} from './buttons.jsx'
import {injectIntl} from 'react-intl'


const Wrapper = styled.div`
	position: fixed;
	width: 100%;
	bottom: 0;
	background-color: #fff;
	z-index: 10;
`

const HD = styled.div`
	position: relative;
	height: 50px;
	border-bottom: 1px solid #e5e5e5;
	line-height: 50px;
	padding-left: 10px;
	padding-right: 10px;
	& > h1{
		font-size: 15px;
		font-weight: normal;
	}

	& > span{
		position: absolute;
		right: 10px;
		top: 0;
		font-size: 20px;
	}
`

const BD = styled.div`
	padding: 10px;
`

const INFO = styled.div`
	& > div{
		&:first-child{
			width: 115px;
		}
		vertical-align: top;
	}
`

const ImageWrapper = styled.div`
	width: 105px;
	height: 140px;
	overflow: hidden;
	background-color: #e5e5e5;
	line-height: 140px;
	& > img{
		width: 100%;
		display: inline-block;
	}
`

const Price = styled.div`
	margin-top: 10px;
	& > span{
		margin-left: 10px;
		&:first-child{
			margin-left: 0;
		}
	}
`

const OverSeas = styled.div`
	border-top: 1px solid #e5e5e5;
	padding: 5px 0;
	margin-top: 10px;
	& > * {
		vertical-align: middle;
		display: inline-block;
	}

	& > img{
		height: 25px;
	}

	& > span{
		margin-left: 10px;
	}
`

const SizeColorRow = styled.div`
	& > div{
		&:first-child{
			width: 70px;
		}
	}
`

const SizeColor = styled.div`
	border-top: 1px solid #e5e5e5;
	padding-top: 10px;
	& > div{
		margin-top: 20px;
	}
`

const higher = (variant) => {
	if (variant.msrp && variant.msrp.amount > 0) { return variant.msrp }
	if (variant.promotionPrice) { return variant.price }
	return null
}

const lower = (variant) => {
	if (variant.promotionPrice) { return variant.promotionPrice }
	return variant.price
}

const percent = (high, low) => {
	return ((high.amount - low.amount) / high.amount * 100).toFixed(2) + '%'
}

const ProductEditor = class extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			initId: null,
			selectedId: null,
			productVO: null,
			quantity: 1,
			sizes: null,
			colors: null,
			selectedSize: null,
			selectedColor: null
		}

		this.sizeClickHandle = this.sizeClickHandle.bind(this)
		this.colorClickHandle = this.colorClickHandle.bind(this)
		this.confirmHandle = this.confirmHandle.bind(this)
	}

	componentWillMount () {
		const {item} = this.props
		product(item.productId).then(({result}) => {
			const {sizes, colors} = this.generateSizeColors(result, item.variantId)
			this.setState({
				initId: item.variantId,
				productVO: result,
				selectedId: item.variantId,
				quantity: item.quantity,
				selectedSize: item.size,
				selectedColor: item.color,
				sizes,
				colors
			})
		})
	}

	generateSizeColors (productVO, selectedId) {
		const {product} = productVO
		const {variants} = product
		let sizeColors

		if (variants) {
			sizeColors = _.reduce(variants, (result, variant) => {
				if (result['sizes'].indexOf(variant.size) < 0) result['sizes'].push(variant.size)
				if (result['colors'].indexOf(variant.color) < 0) result['colors'].push(variant.color)
				return result
			}, {sizes: [], colors: []})
		}

		return sizeColors
	}

	getVariantIdBySizeColor (productVO, size, color) {
		const {product} = productVO
		const {variants} = product
		let selectedVariant
		if (variants) {
			selectedVariant = variants.find(v => v.size === size && v.color === color)
		}
		return selectedVariant ? selectedVariant.id : null
	}

	sizeClickHandle (size) {
		this.setState({
			selectedSize: size,
			selectedId: this.getVariantIdBySizeColor(this.state.productVO, size, this.state.selectedColor)
		})
	}

	colorClickHandle (color) {
		this.setState({
			selectedColor: color,
			selectedId: this.getVariantIdBySizeColor(this.state.productVO, this.state.selectedSize, color)
		})
	}

	getSelectedVariant (product, vid) {
		let svariant
		if (product && product.variants && product.variants.length) {
			svariant = product.variants.find(v => v.id === vid) || product.variants[0]
		}
		return svariant
	}

	confirmHandle () {
		const {product} = this.state.productVO
		const variant = this.getSelectedVariant(product, this.state.selectedId)

		if (variant && variant.status == 1) {
			this.props.itemConfirmHandle(this.state.initId, this.state.selectedId, this.state.quantity)
		} else {
			alert('sold out')
		}
	}

	render () {
		const {intl} = this.props
		const {product} = this.state.productVO || {}

		console.log(product)


		const selectedVariant = this.getSelectedVariant(product, this.state.selectedId)
		const high = selectedVariant ? higher(selectedVariant) : null
		const low = selectedVariant ? lower(selectedVariant) : null

		const enabledColors = (product && product.variants ? product.variants.filter(v => v.size === this.state.selectedSize) : []).map(v => v.color)
		const enabledSizes = (product && product.variants ? product.variants.filter(v => v.color === this.state.selectedColor) : []).map(v => v.size)

		const isDisabledColor = (color) => enabledColors.indexOf(color) < 0
		const isDisabledSize = (size) => enabledSizes.indexOf(size) < 0

		const colorStyle = this.state.colors && this.state.colors.length === 1 && !this.state.colors[0] ? {display: 'none'} : {}

		return product ? (
			<Wrapper>
				<HD>
					<h1>{intl.formatMessage({id: 'product_options'})}</h1>
					<Icon onClick={this.props.onClose}>&#xe69a;</Icon>
				</HD>
				<BD>
					<INFO className="x-table __fixed x-fw">
						<div className="x-cell">
							<ImageWrapper>
								<img src={`https://image.geeko.ltd/small/${selectedVariant.image}`}/>
							</ImageWrapper>

						</div>
						<div className="x-cell">
							<Ellipsis>{product.name}</Ellipsis>
							<Price>
								<Red><Money style={{fontSize: 17}} money={low} /></Red>
								{
									high && (
										<React.Fragment>
											<Grey><del><Money money={high} /></del></Grey>
											<Red>{percent(high, low)} OFF</Red>
										</React.Fragment>
									)
								}

							</Price>
						</div>
					</INFO>

					<SizeColor style={{borderTop: 'none'}}>

						{this.state.sizes && (
							<SizeColorRow className="x-table">
								<div className="x-cell">
									<span>{intl.formatMessage({id: 'size'})}</span>
								</div>
								<div className="x-cell">
									<SizeColorBlockers isDisabled={isDisabledSize} selectedItem={this.state.selectedSize} items={this.state.sizes} onClick={this.sizeClickHandle}/>
								</div>
							</SizeColorRow>

						)}

						{this.state.colors && (
							<SizeColorRow className="x-table" style={colorStyle}>
								<div className="x-cell">
									<span>{intl.formatMessage({id: 'color'})}</span>
								</div>
								<div className="x-cell">
									<SizeColorBlockers isDisabled={isDisabledColor} selectedItem={this.state.selectedColor} items={this.state.colors} onClick={this.colorClickHandle}/>
								</div>
							</SizeColorRow>

						)}
						<SizeColorRow className="x-table">
							<div className="x-cell">
								<span>{intl.formatMessage({id: 'quantity'})}</span>
							</div>
							<div className="x-cell">
								<Quantity onChange={(quantity) => { this.setState({quantity}) }} quantity={this.state.quantity}/>
							</div>
						</SizeColorRow>
					</SizeColor>

					<div style={{paddingTop: 20}}>
						<BigButton onClick={this.confirmHandle}>{intl.formatMessage({id: 'confirm'})}</BigButton>
					</div>

				</BD>

			</Wrapper>
		) : <div>Loading</div>
	}
}

export default injectIntl(ProductEditor)
