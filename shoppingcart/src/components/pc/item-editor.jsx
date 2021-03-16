import React from 'react'
import styled from 'styled-components'

import {Modal} from './modal.jsx'

import {FormattedMessage} from 'react-intl'

import { BigButton } from '../msite/buttons.jsx'

import Icon from '../icon.jsx'

const EDITOR = styled.div`
	padding: 45px;
	width: 485px;
	background-color: #fff;
`

const LABEL = styled.span`
	font-size: 16px;
	font-family: HelveticaNeue-Medium;
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

const LINE = styled.div`
	& > div{
		&:first-child{
			width: 90px;
		}
	}
`

const BLOCKS = styled.div`
	&>.__block{
		display: inline-block;
		margin-right: 10px;
		margin-bottom: 10px;
	}
`

const IMAGE = styled.div`
	width: 45px;
	height: 56px;
	overflow: hidden;
	cursor: pointer;
	&.__selected{
		border: solid 1px #222222;
	}
	background: #efefef top/100% no-repeat;
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

const QInput = styled.input`
	&::-webkit-outer-spin-button, &::-webkit-inner-spin-button{                
		-webkit-appearance: none !important;
		-moz-appearance:textfield;
	} 
	width: 88px;
	height: 32px;
	border: solid 1px #cacaca;
	text-align: center;

`

const QUANITTY = styled.div`
	& > *{
		margin-left:4px;
		vertical-align: top;
		&:first-child{
			margin-left:0;
		}
	}
`

const OPBTN = styled.span`
	width: 40px;
	height: 32px;
	border: solid 1px #e6e6e6;
	line-height: 30px;
	text-align: center;
	cursor: pointer;
	display: inline-block;
	&:active{
		border-color: #222;
		color: #222;
	}
`

export default class extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			selectedProduct: null,
			selectedVariant: null,
			selectedQuantity: 1
		}
	}

	existVariant (product, variantId) {
		return product.variants && product.variants.find(v => v.id === variantId)
	}

	componentWillMount () {
		// 预处理
		const { products, productId, variantId } = this.props

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
			selectedQuantity: this.props.quantity
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

		this.props.editHandle(this.props.variantId, newVaraintId, newQuantity)
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
		const { products } = this.props
		const { selectedVariant, selectedProduct, selectedQuantity} = this.state


		return <Modal onClose={this.props.onClose}>
			<EDITOR>
				<LINE className="x-table x-fw __vt __fixed">
					<div className="x-cell" style={{paddingTop: 15}}>
						<LABEL><FormattedMessage id="color"/></LABEL>
					</div>

					<div className="x-cell">
						<BLOCKS>
							{
								products.map((product, index) => <div className="__block" key={index}>
									<IMAGE onClick={ () => { this.setProductHandle(product) }} className={ selectedProduct.id === product.id && this.existVariant(product, selectedVariant.id) ? '__selected' : '' } style={{backgroundImage: `url(https://image.geeko.ltd/medium/${product.variants[0].image})`}}/>
								</div>)
							}
						</BLOCKS>

						{
							<TIP><FormattedMessage id="you_selected"/> {` ${selectedVariant.color}${selectedProduct.theme?`-${selectedProduct.theme}`:''}`}</TIP>
						}
					</div>
				</LINE>

				{
					(!selectedProduct.variants.length === 1 || selectedProduct.variants[0].size) && <LINE style={{marginTop: 25}} className="x-table x-fw __vt __fixed">
						<div className="x-cell" style={{paddingTop: 2}}>
							<LABEL><FormattedMessage id="size"/></LABEL>
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
					</LINE>
				}

				<LINE className="x-table x-fw __vt __fixed" style={{marginTop: 25}}>
					<div className="x-cell" style={{paddingTop: 2}}>
						<LABEL><FormattedMessage id="qty"/></LABEL>
					</div>
					<div className="x-cell">

						<QUANITTY>
							<OPBTN onClick={ (evt) => { this.changeQuantity('-') } }><Icon>&#xe6ba;</Icon></OPBTN>
							<QInput type="number" value={selectedQuantity} onChange={ (evt) => { this.setState({selectedQuantity: evt.target.value >= 1 ? Math.floor(evt.target.value) : 1 }) } }/>
							<OPBTN onClick={ (evt) => { this.changeQuantity('+') } } ><Icon>&#xe6b9;</Icon></OPBTN>
						</QUANITTY>
					</div>
				</LINE>

				<div style={{marginTop: 30}}>
					{
						selectedVariant && selectedVariant.status === '1' && (selectedVariant.inventory > 0 || selectedProduct.isAutoInventory) ? (
							<BigButton bgColor="#222" style={{width: 240, height: 40}} onClick={ this.editHandle.bind(this) }>
								<FormattedMessage id="submit"/>
							</BigButton>

						) : (
							<BigButton bgColor="#999" style={{width: 240, height: 40, cursor: 'not-allowed'}}>
								<FormattedMessage id="sold_out"/>
							</BigButton>
						)
					}

				</div>

			</EDITOR>
		</Modal>
	}
}
