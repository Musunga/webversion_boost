import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import About from '../views/about.vue'
import Login from '../views/login/login.vue'
import Register from '../views/register/register.vue'
import LoginWechat from '../views/login/wechat.vue'
import LoginAlipay from '../views/login/alipay.vue'
import Confirm from '../views/confirm/confirm.vue'
import Wallet from '../views/wallet/wallet.vue'
import Result from '../views/result/result.vue'
import Order from '../views/order/order.vue'
import Setting from '../views/setting/setting.vue'
import Shop from '../views/shop/shop.vue'
import Help from '../views/help/help.vue'
import WalletIn from '../views/wallet/wallet_in.vue'
import WalletOut from '../views/wallet/wallet_out.vue'
import GoogleMap from '../views/map/google-index.vue'
import ShopDetail from '../views/nearby/shop'
import CameraView from '../views/scan/scanview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      ignoreAuth: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      ignoreAuth: true
    }
  },
  {
    path: '/login_wechat',
    name: 'login_wechat',
    component: LoginWechat,
    meta: {
      ignoreAuth: true
    }
  },
  {
    path: '/login_alipay',
    name: 'login_alipay',
    component: LoginAlipay,
    meta: {
      ignoreAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: Confirm
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: Wallet
  },
  {
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop
  },
  {
    path: '/help',
    name: 'help',
    component: Help
  },
  {
    path: '/wallet_in',
    name: 'wallet_in',
    component: WalletIn
  },
  {
    path: '/wallet_out',
    name: 'wallet_out',
    component: WalletOut
  },
  {
    path: '/google_map',
    name: 'google_map',
    component: GoogleMap,
    alias: '/map'
  },
  {
    path: '/scan',
    name: 'scan',
    component: CameraView
  },
  {
    path: '/nearby_shop',
    name: 'nearby_shop',
    component: ShopDetail
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      ignoreAuth: true
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log('to', to)
  const token = store.state.token
  if (to.name === 'home') {
    if (to.query.qrcode) {
      store.commit('qrcode', to.query.qrcode)
      store.commit('zhcode', '')
    }
    if (to.query.zhcode) {
      store.commit('zhcode', to.query.zhcode)
      store.commit('qrcode', '')
    }
  }
  if (to.matched.some(r => r.meta.ignoreAuth) || token) {
    next()
  } else {
    next({
      path: '/login'
    })
  }
})

export default router
