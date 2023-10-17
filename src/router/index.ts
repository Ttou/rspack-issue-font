import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  base: '',
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () =>
        import(/* webpackChunkName: "Home" */ '@/views/home/index.vue')
    },
    {
      path: '/dialog',
      name: 'Dialog',
      component: () =>
        import(/* webpackChunkName: "Dialog" */ '@/views/dialog/index.vue')
    }
  ]
})
