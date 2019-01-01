import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/base.less'
import axios from 'axios'
import ElTreeGrid from 'element-tree-grid'
import moment from 'moment'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.component('el-table-tree-column', ElTreeGrid)
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // console.log(config)
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // console.log(response)
    return response.data
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

Vue.filter('dateFilter', (input, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(input * 1000).format(format)
})

Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
