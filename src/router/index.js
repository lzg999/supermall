import Vue from 'vue'

import Router from 'vue-router'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const Home = () => import('../views/home/home')
const ClassIfy = () => import('../views/classify/classify')
const Shopcar = () => import('../views/shopcar/shopcar')
const Profile = () => import('../views/profile/profile')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/classify",
      component: ClassIfy,
      meta: {
        title: "分类"
      }
    },
    {
      path: "/shopcar",
      component: Shopcar,
      meta: {
        title: "购物车"
      }
    },
    {
      path: "/profile",
      component: Profile,
      meta: {
        title: "我的"
      }
    },
  ]
})
