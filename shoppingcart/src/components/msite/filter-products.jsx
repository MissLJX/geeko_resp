import React, { useEffect, useState } from 'react'
import { getFilters, getSorters, filterProducts, suggestions, searchProducts } from '../../api'
import Sliders from './slider.jsx'
import styled from 'styled-components'
import Icon from '../icon.jsx'
import { NormalProduct } from './product-item.jsx'
import ProductEditor from './item-editor.jsx'
import { FormattedMessage } from 'react-intl'
import { unitprice } from '../../utils/utils'
import _ from 'lodash'

const FILTERITEMS = styled.div`

    & > div{
        margin-top: 26px;
        &:first-child{
            margin-top: 0;
        }
    }
`

const FILTERITEM = styled.div`
    & > .__hd{
        font-family: AcuminPro-Bold;
        font-size: 14px;
	    color: #222222;
        text-transform: capitalize;
    }

    & > .__bd{
        display: flex;
        flex-wrap: wrap;
        margin-top: 6px;
        margin-left: -4px;
        margin-right: -4px;
    }
`

const ITEM = styled.span`
    display: inline-block;
    min-width: 74px;
    height: 20px;
	background-color: #f6f6f6;
	border-radius: 2px;
    font-size: 12px;
	color: #999999;
    line-height: 20px;
    text-align: center;
    margin: 4px;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    &.active{
        color: #222;
        font-family: 'SlatePro-Medium';
    }
`

const FILTERCONTAINER = styled.div`
    padding-bottom: 95px;
    padding-top: 16px;
    & > .__fd{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 75px;
        background-color: #ffffff;
	    box-shadow: 0px 2px 20px 0px #999999;
        padding: 10px 18px;
    }
`

const BUTTON = styled.button`
    height: 34px;
    background: #222222;
    border-radius: 2px;
    font-size: 16px;
    font-family: AcuminPro-Bold;
    line-height: 34px;
    outline: none;
    border: none;
    color: #fff;
    text-align: center;
    &.secondary{
        background-color: #e6e6e6;
        color: #999999;
    }
`

export const Filter = props => {
	const { filter } = props
	const [filterItems, setFilterItems] = useState(null)
	const [endPrice, setEndPrice] = useState(100)
	const [startPrice, setStartPrice] = useState(0)

	useEffect(() => {
		if (filter) {
			setFilterItems(filter.filterItems)
			setEndPrice(filter.endPrice || Number(filter.maxPrice.amount))
			setStartPrice(filter.startPrice || Number(filter.minPrice.amount))
		}
	}, [filter])

	const selectionClick = (selection, filterItem) => {
		setFilterItems(filterItems.map(item => {
			if (item.fieldName === filterItem.fieldName) {
				const selections = filterItem.selections.map(s => {
					if (s.value === selection.value) {
						return { ...s, selected: !s.selected }
					}
					return s
				})
				return { ...item, selections }
			}
			return item
		}))
	}

	const handleFilter = () => {
		props.onFilter({ ...filter, filterItems, startPrice, endPrice, currency: filter.minPrice.currency })
	}

	const handleClear = () => {
		const filterItems = filter.filterItems.map(item => {
			const selections = item.selections.map(s => ({ ...s, selected: false }))
			return { ...item, selections }
		})
		setFilterItems(filterItems)
		setEndPrice(Number(filter.maxPrice.amount))
		setStartPrice(Number(filter.minPrice.amount))
		props.onFilter({ ...filter, filterItems, startPrice: Number(filter.minPrice.amount), endPrice: Number(filter.maxPrice.amount), currency: filter.minPrice.currency })
	}


	return <FILTERCONTAINER>
		{
			filter && <FILTERITEMS>
				<FILTERITEM>
					<div className="__hd">Range Price</div>
					<div style={{ marginTop: 16, }}>
						<Sliders onChange={values => {
							setStartPrice(values[0])
							setEndPrice(values[1])
						}} values={[startPrice, endPrice]} min={filter.minPrice} max={filter.maxPrice} />
					</div>
				</FILTERITEM>
				{
					filterItems && filterItems.length > 0 && filterItems.map(filterItem => <FILTERITEM key={filterItem.fieldName}>
						<div className="__hd">{filterItem.title}</div>
						<div className="__bd">
							{
								filterItem.selections && filterItem.selections.length > 0 && filterItem.selections.sort((a, b) => { return a.sort - b.sort }).map(selection => <ITEM onClick={evt => { selectionClick(selection, filterItem) }} className={`${selection.selected ? 'active' : ''}`} key={selection.value}>
									{selection.label}
								</ITEM>)
							}
						</div>
					</FILTERITEM>)
				}
			</FILTERITEMS>

		}
		<div className="__fd">
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<BUTTON onClick={handleClear} className="secondary" style={{ width: 'calc(50% - 8px)' }}>Clear</BUTTON>
				<BUTTON style={{ width: 'calc(50% - 8px)' }} onClick={handleFilter}>Apply</BUTTON>
			</div>
		</div>
	</FILTERCONTAINER>
}


const MASK = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    cursor: pointer;
`

const BOTTOMPRODUCTS = styled.div`
    position: fixed;
    bottom: 0;
    height: calc(100% - 80px);
    width: 100%;
    left: 0;
    z-index: 10;
    background-color: #fff;
    transition: bottom 200ms;
    &.anim{
        
        bottom: 0 !important;
    }
    & > .__hd{
        height: 46px;
        text-align: center;
        line-height: 46px;
        border-bottom: 1px solid #f6f6f6;
        position: relative;
        .__title{
            font-family: AcuminPro-Bold;
            font-size: 16px;
            color: #222;
        }

        .__back{
            left: 12px;
            font-family: iconfont;
            cursor: pointer;
            font-size: 18px;
            transform: rotate(180deg);
            position: absolute;
            left: 10px;
            top: 0;
        }
    }

    & > .__bd{
       
        height: calc(100% - 46px);
        overflow: auto;
        padding: 0 18px 90px 18px;
        -webkit-overflow-scrolling: touch;
    }

    & > .__pbd{
        height: calc(100% - 64px);
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        padding: 0 18px 90px 18px;
    }

    & > .__fd{
        height: 75px;
        background-color: #ffffff;
        box-shadow: 0px 2px 20px 0px 
            rgba(153, 153, 153, 0.5);
        padding-top: 10px;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding-left: 18px;
        padding-right: 18px;
    }
`

const SORTMASK = styled.div`
    position: absolute;
    top: calc(100% + 1px);
    height: 2000px;
    z-index: 9;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, .4);
`

const SEARCHBANNEL = styled.div`
    height: 46px;
    border-top: solid 1px #f6f6f6;
    border-bottom: solid 1px #f6f6f6;
    display: flex;
    margin-top: 18px;
    align-items: center;
    position: relative;
    & > div{
        &:first-child{
            flex: 1;
        }

        &:nth-child(2){
            padding-left: 9px;
            padding-right: 9px;
            font-family: SlatePro-Medium;
            cursor: pointer;
        }

        &:nth-child(3){
            padding-left: 30px;
            padding-right: 20px;
            border-left: solid 1px #f6f6f6;
            height: 100%;
            line-height: 44px;
            font-family: SlatePro-Medium;
            cursor: pointer;
        }

        &.__sortlist{
            position: absolute;
            top: calc(100% + 1px);
            left: 0;
            width: 100%;
            background-color: #fff;
            z-index: 10;
            padding-top: 10px;
            padding-bottom: 10px;
            & > div{
                cursor: pointer;
                line-height: 30px;
                padding-left: 18px;
                position: relative;
                &.active{
                    &::after{
                        content: '\\e638';
                        font-family: 'iconfont';
                        font-size: 18px;
                        position: absolute;
                        right: 18px;
                        top: 0;
                        display: inline-block;

                    }
                }
            }
        }
    }

    
`

const SEARCHINPUT = styled.div`
    padding-left: 40px;
    cursor: pointer;
    position: relative;
    span{
        display: inline-block;
        border-right: 1px solid #f6f6f6;
        width: 100%;
        height: 24px;
    }
    .__searchIcon{
        font-family: iconfont;
        font-style:normal;
        cursor: pointer;
        position: absolute;
        left: 14px;
        top:5px;
        color: #999;
        font-size: 18px;
    }
`

const PRODUCTS = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: -6px;
    margin-right: -6px;
    & > div{
        width: 50%;
        padding: 8px 6px;
    }
`

const INPUT = styled.input`
    height: 30px;
    background-color: #f6f6f6;
    color: #999;
    border: none;
    outline: none;
    box-shadow: none;
    outline: none;
    -webkit-apperance: none;
    appearance: none;
    width: 100%;
    padding-left: 20px;
`

const SEARCHLIST = styled.div`
    & > div{
        height: 40px;
        border-bottom: 1px solid #f6f6f6;
        line-height: 40px;
        cursor: pointer;
    }
`


const LOADING = styled.div`
    text-align: center;
    margin-top: 20px;
    color: #999;
`

const NOMORE = styled.div`
    text-align: center;
    margin-top: 20px;
    color: #999;
    fontFamily: 'SlatePro-Medium'
`




export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			filter: null,
			sorters: [],
			showFilter: false,
			sort: 'north_sort_001 desc',
			products: [],
			viewingItem: null,
			showEditor: false,
			showSearch: false,
			words: [],
			searchValue: '',
			showSearchProducts: false,
			searchProducts: [],
			searching: false,
			filtering: false,
			searchEmpty: false,
			filterEmpty: false,
			showMask: false,
			limit: 20,
			searchSkip: 0,
			filterSkip: 0,
			viewingItemType: ''
		}
		this.searchChange = _.debounce(this.searchChange.bind(this), 400)
		this.bindSearchScroll = this.bindSearchScroll.bind(this)
		this.bindFilterScroll = this.bindFilterScroll.bind(this)
	}

	componentDidMount() {


		const fetchSorters = getSorters().then(data => data.result)
		const fetchFilters = getFilters().then(data => data.result)

		Promise.all([fetchSorters, fetchFilters]).then(values => {
			const sorters = values[0], filter = values[1]
			const sort = sorters && sorters.length > 0 ? sorters[0].value : undefined
			this.setState({
				filter,
				sorters,
				sort
			})

			this.onFilter({ ...filter, sorter: sort })
		})

	}

	componentWillUnmount() {
		this.unBind()
	}

	searchChange(evt) {
		const { value } = evt.target

		suggestions(value).then(data => data.result).then(result => {
			const groupResult = result ? result.groupResult : null
			const wordResult = groupResult ? groupResult.words : null

			this.setState({
				words: wordResult && wordResult.result ? wordResult.result : []
			})
		})

	}

	onSearch(value, isScroll) {

		if (!this.state.searching && !this.state.searchEmpty) {
            
			searchProducts(value, this.state.searchSkip, this.state.limit).then(data => {
				const searchProducts = data.result
				const resultProducts = isScroll ? [...(this.state.searchProducts || []), ...(searchProducts || [])] : searchProducts
				this.setState({ searchSkip: (this.state.searchSkip + this.state.limit), searchProducts: (resultProducts || []).map(p => ({ ...p, requestId: data.requestId })), searching: false, searchEmpty: !searchProducts || searchProducts.length < 1 })
			})
			this.setState({
				showSearchProducts: true,
				showSearch: false,
				searchValue: value,
				searching: true,
			})
            
			try{
				if(window.GeekoSensors){
					window.GeekoSensors.Track('Search', {
						'keywords': value,
						'skip': this.state.searchSkip,
						'limit': this.state.limit,
						'resourcepage_title': 'shoppingcart'
					})
				}
			}catch(e){
				console.error(e)
			}


		}
	}

	onFilter(filter, isScroll) {

		if (!this.state.filtering && !this.state.filterEmpty) {

			const filterItems = filter.filterItems.filter(item => item.selections.some(selection => selection.selected)).map(item => {
				const selections = item.selections.filter(s => s.selected)
				return { ...item, selections }
			})


			const {couponProgress} = this.props
			let difference=0
			if(couponProgress && couponProgress.type === 0  && couponProgress.nodes){
				const node = couponProgress.nodes.find(n => !n.usable)
				if(node){
					difference = node.conditionValue -  couponProgress.value
				}
			}

			filterProducts({ ...filter, filterItems, sorter: this.state.sort }, this.state.filterSkip, this.state.limit, difference).then(data => {

				const resultProducts = isScroll ? [...(this.state.products || []), ...(data.result || [])] : data.result

				this.setState({
					filterSkip: this.state.filterSkip + this.state.limit,
					products: (resultProducts || []).map(p => ({ ...p, requestId: data.requestId })),
					filtering: false,
					filterEmpty: !data.result || data.result.length < 1
				})
			})
			this.setState({ filter, showFilter: false, filtering: true })



			if(window.GeekoSensors){

				try{
					window.GeekoSensors.Track('Filter', {
						'filter': (filterItems || []).map(item => {
							const fieldName = item.fieldName
							const selectionStr = (item.selections||[]).map(s => s.value).join(',')
							return `${fieldName}:${selectionStr}`
						}).join(';'),
						'sort': this.state.sort,
						'startPrice':filter.startPrice,
						'endPrice': filter.endPrice, 
						'skip': this.state.filterSkip,
						'limit': this.state.limit,
						'resourcepage_title': 'shoppingcart'
					})
				}catch(e){
					console.error(e)
				}
                
			}
		}

	}

	bindSearchScroll(e) {
		const { target } = e
		const scrollTop = target.scrollTop,
			scrollHeight = target.scrollHeight,
			windowHeight = target.clientHeight
		if (scrollTop + windowHeight >= scrollHeight - 50) {
			this.onSearch(this.state.searchValue, true)
		}
	}

	bindFilterScroll(e) {
		const { target } = e
		const scrollTop = target.scrollTop,
			scrollHeight = target.scrollHeight,
			windowHeight = target.clientHeight
		if (scrollTop + windowHeight >= scrollHeight - 50) {
			this.onFilter(this.state.filter, true)
		}
	}





	viewConfirm(oldId, newId, quantity, productId) {
		this.props.viewConfirm(oldId, newId, quantity).then(() => {
			this.setState({
				showEditor: false,
				viewingItem: null
			})
		})

		try{
			if(window.GeekoSensors){
				window.GeekoSensors.Track('AddToCartDetail', {
					product_id: productId,
					variant_id: newId,
					product_qty: quantity,
					page_type: this.state.viewingItem.type,
					is_success: true
				})
			}
            
		}catch(e){}
	}

	searchSubmit(e) {
		e.preventDefault()
		this.setState({ searchEmpty: false, searchSkip: 0 })
		setTimeout(() => {

			this.onSearch(this.state.searchValue)
		}, 0)
	}

	bindSearchBody(c) {
		this.searchBody = c
		if (this.searchBody) {
			this.searchBody.removeEventListener('scroll', this.bindSearchScroll)
			this.searchBody.addEventListener('scroll', this.bindSearchScroll)
		}
	}

	bindFilterBody(c) {
		if (!this.filterBody) {
			this.filterBody = c
			this.filterBody.addEventListener('scroll', this.bindFilterScroll)
		}
	}

	unBind() {
		if (this.searchBody) {
			this.searchBody.removeEventListener('scroll', this.bindFilterScroll)
		}

		if (this.filterBody) {
			this.filterBody.removeEventListener('scroll', this.bindFilterScroll)
		}
	}

	render() {

		const { summary, onClose } = this.props

		return <React.Fragment>
			{
				this.state.showMask && <MASK onClick={() => {
					this.container.classList.remove('anim')
					setTimeout(() => {
						onClose()
					}, 200)
				}} />
			}
			<BOTTOMPRODUCTS style={{ bottom: -window.innerHeight }} innerRef={c => {
				if (!this.container) {
					this.container = c
					setTimeout(() => {
						this.container.classList.add('anim')
						this.setState({
							showMask: true
						})
					}, 0)
				}
			}}>
				<SEARCHBANNEL>
					<SEARCHINPUT onClick={() => {
						this.setState({ showSearch: true })
					}}>
						<span />
						<i className="__searchIcon">&#xe772;</i>
					</SEARCHINPUT>
					<div onClick={() => {
						this.setState({
							showSort: true
						})
					}}>
						<span>Sort</span>
					</div>
					<div onClick={evt => {
						this.setState({ showFilter: true, showSort: false })

					}}>
						<span>Filter</span>
					</div>

					{
						this.state.showSort && <React.Fragment>
							<div className="__sortlist">
								{
									(this.state.sorters || []).map(sorter => <div onClick={evt => {
										this.setState({
											sort: sorter.value,
											filterEmpty: false,
											filterSkip: 0,
											showSort: false
										})

										setTimeout(() => {
											this.onFilter({ ...this.state.filter, sorter: sorter.value })
										}, 0)
									}} key={sorter.value} className={`${this.state.sort === sorter.value ? 'active' : ''}`}>
										<span>{sorter.label}</span>
									</div>)
								}
							</div>

							<SORTMASK onClick={() => {
								this.setState({
									showSort: false
								})
							}} />
						</React.Fragment>
					}


				</SEARCHBANNEL>

				<div className="__pbd" ref={this.bindFilterBody.bind(this)}>
					<PRODUCTS>
						{
							this.state.products.map((product, index) => <div key={product.id}>
								<NormalProduct position={index + 1} onSelect={(vairant, product) => {
									this.setState({
										viewingItem: {
											productId: product.id,
											variantId: vairant.id,
											quantity: 1,
											type: 'filter_products'
										},
										showEditor: true
									})


									if(window.GeekoSensors){
										window.GeekoSensors.Track('ELClick', {
											clicks: 'add_to_cart'
										})
									}


								}} requestId={product.requestId} column="Filter Products" dataType="Filter Products" dataContent="Filter Products" product={product} />
							</div>)
						}
					</PRODUCTS>
					{
						this.state.filtering && <LOADING><FormattedMessage id="loading" /></LOADING>
					}
					{
						this.state.filterEmpty && <NOMORE><FormattedMessage id="nomore" /></NOMORE>
					}
				</div>



				<div className="__fd">
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>
							<div><span style={{ fontFamily: 'SlatePro-Medium', fontSize: 16 }}><FormattedMessage id="total" />:</span> <span style={{ fontSize: 16 }}>{summary && unitprice(summary.orderTotal)}</span></div>
							<div style={{ fontSize: 14, color: '#999', marginTop: 2 }}><FormattedMessage id="coupon" />: {summary && unitprice(summary.couponDiscount)}</div>
						</div>
						<div>
							<BUTTON onClick={() => {
								this.container.classList.remove('anim')
								setTimeout(() => {
									onClose()
								}, 200)

								if(window.GeekoSensors){
									window.GeekoSensors.Track('ELClick', {
										clicks: 'back_to_bag'
									})
								}


							}} style={{ minWidth: 162, textTransform: 'uppercase', paddingLeft: 10, paddingRight: 10 }}><FormattedMessage id="back_to_bag"/></BUTTON>
						</div>
					</div>
				</div>
			</BOTTOMPRODUCTS>

			{
				this.state.showSearchProducts && <BOTTOMPRODUCTS>
					<div className="__hd">
						<span className="__back" onClick={() => { this.setState({ showSearchProducts: false, showSearch: true }) }}>&#xe690;</span>
						<span className="__title"> {this.state.searchValue}</span>
					</div>

					<div className="__bd" ref={this.bindSearchBody.bind(this)}>
						<PRODUCTS>
							{
								this.state.searchProducts.map((product, index) => <div key={product.id}>
									<NormalProduct position={index + 1} onSelect={(vairant, product) => {
										this.setState({
											viewingItem: {
												productId: product.id,
												variantId: vairant.id,
												quantity: 1,
												type: 'search_products'
											},
											showEditor: true
										})
									}} requestId={product.requestId} column="Search Products" product={product} dataType="Search Products" dataContent="Search Products"/>
								</div>)
							}
						</PRODUCTS>
						{
							this.state.searching && <LOADING><FormattedMessage id="loading" /></LOADING>
						}

						{
							this.state.searchEmpty && <NOMORE><FormattedMessage id="nomore" /></NOMORE>
						}
					</div>



					<div className="__fd">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div>
								<div><span style={{ fontFamily: 'SlatePro-Medium', fontSize: 16 }}><FormattedMessage id="total" />:</span> <span style={{ fontSize: 16 }}>{summary && unitprice(summary.orderTotal)}</span></div>
								<div style={{ fontSize: 14, color: '#999', marginTop: 2 }}><FormattedMessage id="coupon" />: {summary && unitprice(summary.couponDiscount)}</div>
							</div>
							<div>
								<BUTTON onClick={() => {
									this.container.classList.remove('anim')
									setTimeout(() => {
										onClose()
									}, 200)
								}} style={{ minWidth: 162, textTransform: 'uppercase', paddingLeft: 10, paddingRight: 10 }}><FormattedMessage id="back_to_bag"/></BUTTON>
							</div>
						</div>
					</div>
				</BOTTOMPRODUCTS>
			}


			{
				this.state.filter && this.state.showFilter && <BOTTOMPRODUCTS>
					<div className="__hd">
						<span className="__back" onClick={() => { this.setState({ showFilter: false }) }}>&#xe690;</span>
						<span className="__title">Filter</span>
					</div>
					<div className="__bd">
						<Filter filter={this.state.filter} onFilter={filter => {
							this.setState({
								filterEmpty: false,
								filterSkip: 0
							})
							setTimeout(() => {
								this.onFilter(filter)
							}, 0)

						}} />
					</div>
				</BOTTOMPRODUCTS>
			}

			{
				this.state.showSearch && <BOTTOMPRODUCTS>
					<SEARCHBANNEL style={{ borderTop: 'none' }}>
						<div style={{ display: 'flex', paddingLeft: 18, paddingRight: 18, alignItems: 'center' }}>
							<form onSubmit={this.searchSubmit.bind(this)} action="/search" style={{ flex: 1 }}>
								<INPUT value={this.state.searchValue} onChange={evt => {
									this.setState({ searchValue: evt.target.value })
									this.searchChange(evt)
								}} placeholder="Search" autoFocus ref={c => this.searchRef = c} type="search" />
							</form>
							<span style={{ marginLeft: 6, cursor: 'pointer', color: '#999' }} onClick={() => { this.setState({ showSearch: false }) }}><FormattedMessage id="cancel" /></span>
						</div>
					</SEARCHBANNEL>

					<div className="__bd">
						<SEARCHLIST>
							{
								(this.state.words || []).map(word => <div onClick={() => {
									this.setState({
										searchEmpty: false,
										searchSkip: 0
									})
									setTimeout(() => {
										this.onSearch(word)
									})
								}} key={word} data-source-click data-title="shoppingcart" data-type="search-words" data-content={word}>
									<span>{word}</span>
								</div>)
							}
						</SEARCHLIST>
					</div>
				</BOTTOMPRODUCTS>
			}

			{
				this.state.viewingItem && this.state.showEditor && <ProductEditor style2 onClose={() => { this.setState({ showEditor: false }) }}
					itemConfirmHandle={this.viewConfirm.bind(this)}
					btnMessage={<FormattedMessage id="addtocart" />}
					item={this.state.viewingItem} />
			}
		</React.Fragment>
	}
}