import Vue from 'vue'
import App from './App'
import '@js/flexible'


Vue.config.productionTip = false
new Vue({
  el: '#singleProject',
  components: { App },
  template: '<App/>'
})
