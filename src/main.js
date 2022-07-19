import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import '@/assets/styles/reset.css'
import 'vant/lib/index.css'
import '@/assets/fonts/iconfont.css'
import 'amfe-flexible'

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥
  ak: '7ch6mGRNCzpTFhohVPOG4Z3WkRBRUmD9'
})

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
