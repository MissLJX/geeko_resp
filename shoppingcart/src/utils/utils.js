export const strconcat = (...strs) => {
  const filted = strs.filter(s => !!s)
  return filted.join(', ')
}

export const unitprice = (money) => {
  return money ? (money.unit + money.amount) : ''
}

export const __route_root__ = '/cart'

export const storage = {
  add (k, v, exp) {
  	if (window.localStorage) {
  		const s = {
  			exp: new Date().getTime() + (exp || 24 * 60 * 60) * 1000,
  			data: v
  		}
  		window.localStorage.setItem(k, JSON.stringify(s))
  	}
  },
  get (k) {
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

export const producturl = product => `/product/${_url_analyst(product.name)}/${product.id}.html`

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
