import Vue from 'vue'
import axios from 'axios'

//配置请求的根路径
//http://120.53.120.229:8888/api/private/v1/
//xios.defaults.baseURL='http://120.53.120.229:8888/api/private/v1/'
//axios.defaults.baseURL='http://timemeetyou.com:8889/api/private/v1/'
axios.defaults.baseURL='http://40j456m073.qicp.vip/api/private/v1'
//axios.defaults.baseURL='http://192.168.31.159:8888/api/private/v1'


//请求拦截器,作用是，在向服务器发送请求前（就是用axios发送数据前，对请求头做一下预处理,请求头做处理之后，才发送到服务器），
//调用一下use函数，为config.headers.Authorization属性添加，token值
//服务器收到请求，会去config.headers.Authorization中找这个属性值，与服务器保存的数据，对比，是否符合
axios.interceptors.request.use(config =>{
    //debugger
    config.headers.Authorization = window.sessionStorage.getItem('token')

    //console.log(config);
    console.log(config.headers.Authorization);
    return config
    
})
Vue.prototype.$http = axios
