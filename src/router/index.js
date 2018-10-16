import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import { store } from '../store'

Vue.use(Router)

const checkContractLoaded = (to, from, next) => {
  if (!store.state.contractLoaded) {
    store.watch(
      state => state.contractLoaded,
      loaded => {
        if (loaded) next()
      }
    )
  } else {
    next()
  }
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: checkContractLoaded
    }
  ]
})

export default router
