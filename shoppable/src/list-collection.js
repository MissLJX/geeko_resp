import Vue from 'vue'
import App from './list-collection.vue'


const root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

new Vue({
  el: '#root',
  render: (h) => h(App)
})
