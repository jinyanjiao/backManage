import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/login/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/manage',
      name: 'Manage',
      component: resolve => require(['@/page/Manage'], resolve),
      children: [{
        path: '/home',
        name: 'HelloWorld',
        component: resolve => require(['@/components/HelloWorld'], resolve)
      },
      {
        path: '/parklist',
        name: 'ParkList',
        component: resolve => require(['@/page/ParkList'], resolve)
      },
      {
        path: '/addpark',
        name: 'AddPark',
        component: resolve => require(['@/page/AddPark'], resolve)
      }]
    }
  ]
})
