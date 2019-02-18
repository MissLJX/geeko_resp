export const strconcat = (...strs) => {
	const filted = strs.filter(s => !!s)
	return filted.join(', ')
}

export const unitprice = (money) => {
	return money ? (money.unit + money.amount) : ''
}

export const __route_root__ = '/cart'

export const storage = {
	add(k, v, exp) {
		if (window.localStorage) {
			const s = {
				exp: new Date().getTime() + (exp || 24 * 60 * 60) * 1000,
				data: v
			}
			window.localStorage.setItem(k, JSON.stringify(s))
		}
	},
	get(k) {
		if (window.localStorage) {
			let s = window.localStorage.getItem(k)
			if (s) {
				s = JSON.parse(s)
				if (s.exp > new Date().getTime()) {
					return s.data
				} else {
					window.localStorage.removeItem(k)
					return null
				}
			}
			return null
		}
		return null
	}
}

const _url_analyst = name => name.replace(new RegExp(/\s/g), '-')
/*global siteType b:true */
/*eslint no-undef: "error"*/
export const producturl = product => siteType === 'new' ? `/product/${_url_analyst(product.name)}/${product.parentSku}/${product.id}.html` : `/product/${_url_analyst(product.name)}/${product.id}.html`

export const ispromotion = product => product.promotion && product.promotion.promotionPrice && product.promotion.enabled

export const getlowerprice = product => {
	if (ispromotion(product)) { return product.promotion.promotionPrice }
	return product.price
}

export const gethigherprice = product => {
	if (product.msrp && product.msrp.amount > 0) { return product.msrp }
	if (ispromotion(product)) { return product.price }
	return null
}

export const quantityMoney = (money, quantity) => ({ ...money, amount: (Number(money.amount) * quantity).toFixed(2) })

export const __Collection_Url__ = siteType === 'old' ? '/i/collection/products?collectionId=' : '/page/collection/products?collectionId='
export const __Category_Url__ = siteType === 'old' ? '/i/category/products?categoryId=' : '/page/category/products?id='
export const __Flash_Url__ = siteType === 'old' ? '/i/flash/products' : '/page/flash-sale'
export const __Preorder_Url__ = siteType === 'old' ? '/i/early-bird' : '/page/pre-bird'
export const __New_In_Url__ = siteType === 'old' ? '/i/new-arrivals' : '/page/new-in'
export const __Trending_Url__ = siteType === 'old' ? '/i/trending-now' : '/page/trending-now'

export const getLink = (deepLink) => {
	if (!deepLink) return '#'

	let { type, params } = deepLink, __url
	switch (type) {
	case 1: 
		__url = __Collection_Url__ + params[0]
		break
	case 11:
		__url = __Preorder_Url__
		break
	case 12:
		__url = __Flash_Url__
		break
	case 13:
		__url = __New_In_Url__
		break
	case 14:
		__url = __Trending_Url__
		break
	case 15:
		__url = __Category_Url__ + params[0]
		break
	case 16:
		__url = params[0]
		break
	default:
		__url = '#'
	}

	return __url
}
