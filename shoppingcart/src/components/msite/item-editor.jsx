import React from 'react'
import styled from 'styled-components'
import { product2 } from '../../api'
import Ellipsis from '../ellipsis.jsx'
import Money from '../money.jsx'
import { Grey, Red } from '../text.jsx'
import Icon from '../icon.jsx'
import SizeColorBlockers from './size-color-blockers.jsx'
import _ from 'lodash'
import Quantity from '../quantity.jsx'
import { BigButton } from './buttons.jsx'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IMAGE_PREFIX } from '../../utils/constants'
import ReactDOM from 'react-dom'
import {imageClick} from './image-displayer'

const Wrapper = styled.div`
	position: fixed;
	width: 100%;
	bottom: 0;
	background-color: #fff;
	z-index: 10;
	left: 0;
	padding-bottom: 20px;
`

const HD = styled.div`
	position: relative;
	height: 50px;
	line-height: 50px;
	padding-left: 10px;
	padding-right: 10px;
	.__back{
		left: 20px;
		font-family: iconfont;
		cursor: pointer;
		font-size: 18px;
		transform: rotate(180deg);
		position: absolute;
		left: 10px;
		top: 0;
	}
`

const BD = styled.div`
	padding-left: 20px;
	padding-right: 20px;
	height: calc(100% - 50px);
	overflow: auto;
	-webkit-overflow-scrolling: touch;
	padding-bottom: 90px;
`

const FD = styled.div`
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
	height: 75px;
	padding-top: 10px;
	background-color: #ffffff;
	box-shadow: 0px 2px 20px 0px 
		#999999;
	padding-left: 18px;
	padding-right: 18px;
`

const SWIPER = styled.div`
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
	margin-top: 5px;
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
	
`

const SizeColor = styled.div`
	border-top: 1px solid #e5e5e5;
	max-height: 300px;
	overflow: auto;
	& > div{
		margin-top: 15px;
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
		margin-right: 8px;
		margin-bottom: 8px;
	}
`

const SIZE = styled.span`
	display: inline-block;
	padding: 0 11px;
	border: solid 1px #cacaca;
	cursor: pointer;
	height: 24px;
	min-width: 56px;
	text-align: center;
	border-radius: 4px;
	line-height: 22px;
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

const ITEMIMAGE = styled.div`

	position: relative;
	overflow: hidden;
	display: block;
	background-color: #efefef;
	border: solid 1px #ccc;

	&::after{
		display: block;
		margin-top: 125%;
		content: '';
	}
	& > img{
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1;
		border: 1px solid #fff;
	}
	&.selected{
		border-color: #222;
	}
`

const NAME = styled.div`
	font-size: 12px;
	color: #999;
	line-height: 20px;
	margin-top: 5px;
`

const OFF = styled.span`
background-color: #222;
color: #fff;
padding: 2px 4px;
font-size: 12px;
margin-left: 10px;
`

const CloseIcon = styled.span`
	position: absolute;
    right: 0;
    top: -27px;
    font-size: 24px;
    color: #fff;
    font-weight: bold;
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
	return ((high.amount - low.amount) / high.amount * 100).toFixed(0) + '%'
}

const ImageSwiper = props => {
	const { images } = props
	const imageHandle = (image) => {
		imageClick(image, images)
	}
	return <Swiper
		slidesPerView={2.3}
		spaceBetween={10}
	>
		{
			images && images.map(image => <SwiperSlide key={image}>
				<ITEMIMAGE style={{ border: 'none', cursor:'pointer' }} onClick={() => {imageHandle(image)}}>
					<img src={`${IMAGE_PREFIX}/medium/${image}`} />
				</ITEMIMAGE>
			</SwiperSlide>)
		}
	</Swiper>
}

const ColorSwiper = props => {
	const { products, selectedProduct, onSelect } = props

	return <Swiper
		slidesPerView={8.5}
		spaceBetween={8}
	>
		{
			products && products.map(product => <SwiperSlide key={product.id}>
				<ITEMIMAGE className={selectedProduct.id === product.id ? 'selected' : ''} style={{ cursor: 'pointer' }} onClick={evt => { onSelect(product) }}>
					<img src={`${IMAGE_PREFIX}/small/${product.pcMainImage}`} />
				</ITEMIMAGE>
			</SwiperSlide>)
		}
	</Swiper>
}

const ProductEditor = class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedProduct: null,
			selectedVariant: null,
			selectedQuantity: 1,
			products: null,
			isGift: false
		}
	}

	existVariant(product, variantId) {
		return product.variants && product.variants.find(v => v.id === variantId)
	}

	componentWillMount() {
		const { item } = this.props

		// 预处理
		product2(item.productId).then(({ result }) => {
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
				products: products,
				isGift: item.isGift
			})
		})
	}

	setProductHandle(product) {
		this.setState({
			selectedProduct: product,
			selectedVariant: product.variants[0]
		})
	}

	editHandle() {
		const newVaraintId = this.state.selectedVariant.id
		const newQuantity = this.state.selectedQuantity
		this.props.itemConfirmHandle(this.props.item.variantId, newVaraintId, newQuantity, this.props.item.productId)
	}

	changeQuantity(op) {
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

	render() {
		const { intl, btnMessage, style2 } = this.props

		const { products, selectedVariant, selectedProduct, selectedQuantity } = this.state
		let high = selectedVariant ? higher(selectedVariant) : null
		let low = selectedVariant ? lower(selectedVariant) : null
		// const high = {amount:'50', unit: '$', currency: 'USD'}

		if (this.state.isGift) {
			low = selectedProduct.giftPrice
			high = selectedVariant.msrp || selectedVariant.price
		}


		return (
			<Wrapper style={{ height: 'calc(100% - 85px)' }}>

				<HD>
					<span className="__back" onClick={this.props.onClose}>&#xe690;</span>
				</HD>

				{
					products && products.length > 0 ? <React.Fragment>
						<BD>
							<SWIPER>
								<ImageSwiper images={[selectedProduct.pcMainImage, ...(selectedProduct.pcExtraImageUrls || [])]} />
							</SWIPER>
							<div>
								<NAME>
									<Ellipsis>{selectedProduct.name}</Ellipsis>
								</NAME>

								<Price>
									<Money style={{ fontSize: 20, fontFamily: 'AcuminPro-Bold', color: this.state.isGift ? '#e64545' : '#222' }} money={low} />
									{
										high && (
											<React.Fragment>
												<Grey><del><Money money={high} /></del></Grey>
												{
													!this.state.isGift && <OFF>-{percent(high, low)}</OFF>
												}

											</React.Fragment>
										)
									}

								</Price>
							</div>

							<SizeColor style={{ borderTop: 'none' }}>

								<SizeColorRow>
									<div style={{ display: 'flex', justifyContent: 'space-between' }}>
										<span style={{ fontFamily: 'SlatePro-Medium', fontSize: 14 }}>{intl.formatMessage({ id: 'color' })}</span>
										{
											selectedVariant && selectedVariant.color && <span>
												You selected {selectedVariant.color}
												{
													selectedProduct.theme ? `-${selectedProduct.theme}` : ''
												}
											</span>
										}
									</div>
									<div style={{ marginTop: 8 }}>
										<ColorSwiper selectedProduct={selectedProduct} products={products} onSelect={product => { this.setProductHandle(product) }} />
									</div>
								</SizeColorRow>
								{
									(!selectedProduct.variants.length === 1 || selectedProduct.variants[0].size) && <SizeColorRow>
										<div>
											<span style={{ fontFamily: 'SlatePro-Medium', fontSize: 14 }}>{intl.formatMessage({ id: 'size' })}</span>
										</div>
										<div style={{ marginTop: 8 }}>
											<BLOCKS>
												{
													selectedProduct.variants.map(variant => <div key={variant.id} className="__block">
														<SIZE onClick={() => { this.setState({ selectedVariant: variant }) }} className={selectedVariant.id === variant.id ? '__selected' : ''}>{variant.size}</SIZE>
													</div>)
												}
											</BLOCKS>

											{
												selectedVariant && selectedVariant.description && <span style={{ fontSize: 12, lineHeight: '16px' }} dangerouslySetInnerHTML={{ __html: selectedVariant.description.replace(/:[\w|\d|\-|(|)|\.]+;/g, function (value) { return '<span style="color:#999;margin-right: 5px;">' + value + ' </span>' }) }} />
											}
										</div>
									</SizeColorRow>
								}
								<div style={{ display: 'flex' }}>
									<div>
										<span style={{ fontFamily: 'SlatePro-Medium', fontSize: 14 }}>{intl.formatMessage({ id: 'qty' })}</span>
									</div>
									<div style={{ marginLeft: 12, position: 'relative', top: -4 }}>
										<Quantity onChange={(quantity) => { this.setState({ selectedQuantity: quantity }) }} quantity={this.state.selectedQuantity} />
									</div>
								</div>
							</SizeColor>

							{/* <div style={{ paddingTop: 20 }}>

						

					</div> */}

						</BD>

						<FD>
							{
								selectedVariant && selectedVariant.status === '1' && (selectedVariant.inventory > 0 || selectedProduct.isAutoInventory) ? (
									<BigButton onClick={this.editHandle.bind(this)}>{btnMessage ? btnMessage : intl.formatMessage({ id: 'confirm' })}</BigButton>
								) : (
									<BigButton bgColor="#999" style={{ cursor: 'not-allowed' }}>
										<FormattedMessage id="sold_out" />
									</BigButton>
								)
							}
						</FD>
					</React.Fragment>: <div style={{textAlign: 'center', marginTop: 20}}>Loading</div>
				}




			</Wrapper>
		)
	}
}

export default injectIntl(ProductEditor)
