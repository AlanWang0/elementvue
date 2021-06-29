import Vue from 'vue'
import VueRouter from 'vue-router'


//引入登录组件
import Login from "../views/Login.vue"
//引入home组件
import Home from "../views/Home.vue"
//引入welcome组件
import Welcome from "../components/welcome/index.vue"
//引入其他组件
import Users from "../components/user/Users.vue"
import RightsList from "../components/power/Rights.vue"
import RolesList from "../components/power/Roles.vue"
import Categories from "../components/goods/Categories.vue"
import Params from "../components/goods/Params.vue"
import List from "../components/goods/List.vue"
import Order from "../components/order/Order.vue"
import DataView from "../components/dataview/DataView.vue"
Vue.use(VueRouter)

const routes = [
  //重定向到/login路径
  { 
    path: '/',
    redirect: '/login' 
  },
  //配置登录组件路径
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/home',
    name:"Home",
    component:Home,
    redirect:'/goods',
    children:[
      {path:'/welcome',component:Welcome},
      {path:'/users',component:Users},
      {path:'/rights',component:RightsList},
      {path:'/roles',component:RolesList},
      {path:'/categories',component:Categories},
      {path:'/params',component:Params},
      {path:'/goods',component:List},
      {path:'/orders',component:Order},
      {path: '/reports',component: DataView}
      
    ]
  }
  


]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  //如果用户访问的登录页，直接放行
  if(to.path === '/login') return next()
  //从 sessionStorage 中获取到 保存的 token 值
  const tokenStr = window.sessionStorage.getItem('token')
  //没有token，强制跳转到登录页
  if(!tokenStr) return next('/login')
  next()
})
export default router
