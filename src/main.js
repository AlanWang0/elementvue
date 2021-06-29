import Vue from 'vue'
import App from './App.vue'
import router from   './router'

//导入网络请求模块
import './network/axios'

//导入elementui组件
import './plugins/index.js'


//导入全局样式表
import'./assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'


// 定义全局时间过滤器
Vue.filter('dateFormat',function (originVal){
  const dt = new Date(originVal * 1000)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  const d = (dt.getDate()+ '').padStart(2,'0')

  const hh = (dt.getHours()+ '').padStart(2,'0')
  const mm = (dt.getMinutes()+ '').padStart(2,'0')
  const ss = (dt.getMilliseconds()+ '').padStart(2,'0')

  const DateStr = `${y}-${m}-${d} ${hh}:${mm}:${ss}`

  return DateStr
})

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount( '#app')
