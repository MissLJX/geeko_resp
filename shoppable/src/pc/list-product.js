import Vue from 'vue'
import App from './list-product.vue'

const root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

new Vue({
  el: '#root',
  render: (h) => h(App)
})
