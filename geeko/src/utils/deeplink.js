const isNew = false;

const PAGE_PRODUCT_URL =  isNew ? '/page/product?productId=' : '/i/product_detail?productId='
const PAGE_EARLY_BIRD = isNew? '/page/pre-order' : '/i/early-bird'
const PAGE_FLASH = isNew ? '/page/sale': '/i/flash/products'
const PAGE_NEW = isNew? '/page/new-in': '/i/new-arrivals'
const PAGE_TRENDING = isNew? '/page/trending-now': '/i/trending-now'
const PAGE_CATEGORY = isNew? '/page/category/products?id=': '/i/category/products?categoryId='

export default ( deepLink ) => {
	if(!deepLink) return '#'

	if(typeof deepLink === 'string'){
		try {
			deepLink = JSON.parse(deepLink)
		}catch (e){
			return '#'
		}
	}


	const { type, params } = deepLink
	let _url
	switch (type) {
	case 1:
		_url = `/collection/products/${params[0]}.html`
		break
	case 2:
		_url = PAGE_PRODUCT_URL + params[0]
		break
	case 3:
		_url = '/me/m/coupons'
		break
	case 7:
		_url = '/me/m/credits'
		break
	case 8:
		_url = '/me/m/order/detail/' + params[0]
		break
	case 9:
		_url = '/me/m/order/ticket/' + params[0]
		break
	case 10:
		_url = '/i/lottery'
		break
	case 11:
		_url = PAGE_EARLY_BIRD
		break
	case 12:
		_url = PAGE_FLASH
		break
	case 13:
		_url = PAGE_NEW
		break
	case 14:
		_url = PAGE_TRENDING
		break
	case 15:
		_url = `/category/products/${params[0]}.html`
		break
	case 16:
		_url = params[0]
		break
	case 17:
		_url = '/shoppingcart/show'
		break
	default:
		_url = '#'
	}
	return _url
} 