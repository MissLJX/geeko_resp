import React from 'react'
import styled from 'styled-components'
import {product2} from '../../api'
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
	left: 0;
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
	height: 131px;
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
	max-height: 300px;
	overflow: auto;
	& > div{
		margin-top: 20px;
	}
`

const TIP = styled.span`
	background-color: #f5f5f5;
	border-radius: 2px;
	font-family: HelveticaNeue;
	font-size: 12px;
	color: #666666;
	padding: 4px 10px;
	line-height: 18px;
	display: inline-block;
`

const BLOCKS = styled.div`
	&>.__block{
		display: inline-block;
		margin-right: 10px;
		margin-bottom: 10px;
	}
`

const SIZE = styled.span`
	display: inline-block;
	padding: 6px 11px;
	border: solid 1px #cacaca;
	cursor: pointer;
	&.__selected{
		border: solid 1px #222222;
	}
`

const COLOR = styled.span`
	display: inline-block;
	cursor: pointer;
	width: 40px;
	height: 50px;
	overflow: hidden;
	&.__selected{
		border: solid 1px #222222;
	}
	img{
		width: 100%;
		display: block;
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
			selectedProduct: null,
			selectedVariant: null,
			selectedQuantity: 1,
			products: null
		}
	}

	existVariant (product, variantId) {
		return product.variants && product.variants.find(v => v.id === variantId)
	}

	componentWillMount () {
		const { item } = this.props

		// 预处理
		product2(item.productId).then(({result}) => {
			const { products, selectedProductId } = result
			const productId = selectedProductId, variantId = item.variantId
			let selectedProduct = products.find(p => p.id === productId && this.existVariant(p, variantId)), selectedVariant
			// 如果productId已经下架  不存在products中
			if (!selectedProduct) {
				selectedProduct = products[0]
			}

			// 如果选中产品中已经没有此子产品  则取第一个
			selectedVariant = selectedProduct.variants.find(v => v.id === variantId) || selectedProduct.variants[0]

			this.setState({
				selectedVariant: selectedVariant,
				selectedProduct: selectedProduct,
				selectedQuantity: item.quantity,
				products: products
			})
		})
	}

	setProductHandle (product) {
		this.setState({
			selectedProduct: product,
			selectedVariant: product.variants[0]
		})
	}

	editHandle () {
		const newVaraintId = this.state.selectedVariant.id
		const newQuantity = this.state.selectedQuantity

		this.props.itemConfirmHandle(this.props.item.variantId, newVaraintId, newQuantity)
	}

	changeQuantity (op) {
		if (op === '+') {
			this.setState({
				selectedQuantity: this.state.selectedQuantity + 1
			})
		} else {
			if (this.state.selectedQuantity > 1) {
				this.setState({
					selectedQuantity: this.state.selectedQuantity - 1
				})
			}
		}
	}

	render () {
		const {intl} = this.props

		const { products, selectedVariant, selectedProduct, selectedQuantity} = this.state
		const high = selectedVariant ? higher(selectedVariant) : null
		const low = selectedVariant ? lower(selectedVariant) : null


		return products ? (
			<Wrapper>
				<HD>
					<h1>{intl.formatMessage({id: 'product_options'})}</h1>
					<Icon onClick={this.props.onClose}>&#xe69a;</Icon>
				</HD>
				<BD>
					<INFO className="x-table __fixed x-fw">
						<div className="x-cell">
							<ImageWrapper>
								<img src={`https://dgzfssf1la12s.cloudfront.net/small/${selectedVariant.image}`}/>
							</ImageWrapper>
						</div>
						<div className="x-cell">
							<Ellipsis>{selectedProduct.name}</Ellipsis>
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

						<SizeColorRow className="x-table">
							<div className="x-cell">
								<span>{intl.formatMessage({id: 'color'})}</span>
							</div>
							<div className="x-cell">

								<BLOCKS>
									{
										products.map((product, index) => <div className="__block" key={index}>
											<COLOR onClick={ () => { this.setProductHandle(product) }} className={ selectedProduct.id === product.id && this.existVariant(product, selectedVariant.id) ? '__selected' : '' }>
												<img src={`https://dgzfssf1la12s.cloudfront.net/small/${product.mainImage}`}/>
											</COLOR>
										</div>)
									}
								</BLOCKS>
								
								{
									selectedVariant && selectedVariant.color && <TIP>
										You selected { selectedVariant.color }
										{
											selectedProduct.theme ? `-${selectedProduct.theme}`:''
										}
									</TIP>
								}

							</div>
						</SizeColorRow>
						{
							(!selectedProduct.variants.length === 1 || selectedProduct.variants[0].size) && <SizeColorRow className="x-table">
								<div className="x-cell">
									<span>{intl.formatMessage({id: 'size'})}</span>
								</div>
								<div className="x-cell">
									<BLOCKS>
										{
											selectedProduct.variants.map(variant => <div key={variant.id} className="__block">
												<SIZE onClick={ () => { this.setState({selectedVariant: variant}) } } className={ selectedVariant.id === variant.id ? '__selected' : '' }>{variant.size}</SIZE>
											</div>)
										}
									</BLOCKS>

									{
										selectedVariant && selectedVariant.description && <TIP>{ selectedVariant.description }</TIP>
									}
								</div>
							</SizeColorRow>
						}
						<SizeColorRow className="x-table">
							<div className="x-cell">
								<span>{intl.formatMessage({id: 'qty'})}</span>
							</div>
							<div className="x-cell">
								<Quantity onChange={(quantity) => { this.setState({selectedQuantity: quantity}) }} quantity={this.state.selectedQuantity}/>
							</div>
						</SizeColorRow>
					</SizeColor>

					<div style={{paddingTop: 20}}>

						{
							selectedVariant && selectedVariant.status === '1' && (selectedVariant.inventory > 0 || selectedProduct.isAutoInventory) ? (
								<BigButton onClick={this.editHandle.bind(this)}>{intl.formatMessage({id: 'confirm'})}</BigButton>
							) : (
								<BigButton bgColor="#999" style={{cursor: 'not-allowed'}}>
									<FormattedMessage id="sold_out"/>
								</BigButton>
							)
						}

					</div>

				</BD>

			</Wrapper>
		) : <div>Loading</div>
	}
}

export default injectIntl(ProductEditor)
