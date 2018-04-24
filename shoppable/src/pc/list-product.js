import Vue from 'vue'
import App from './list-product.vue'

if(process.env.NODE_ENV === 'development'){
    const root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)
}

new Vue({
  el: '#root',
  render: (h) => h(App)
})
