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
