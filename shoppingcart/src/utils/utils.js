export const strconcat = (...strs) => {
  const filted = strs.filter(s => !!s)
  return filted.join(', ')
}

export const unitprice = (money) => {
  return money ? (money.unit + money.amount) : ''
}

export const __route_root__ = '/cart'
