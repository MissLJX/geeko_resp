export const submit = (result) => {
  const {payURL, params} = result
  const form = document.createElement('form')
  form.style.display = 'none'
  form.setAttribute('method', 'POST')
  form.setAttribute('action', payURL)
  let input
  for (let key in params) {
  	input = document.createElement('input')
  	input.setAttribute('type', 'hidden')
  	input.setAttribute('name', key)
  	input.setAttribute('value', params[key])
  	form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
