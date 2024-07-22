import Vue from 'vue'
import Router from 'vue-router'
import Attendance from '@/components/Attendance'
import CardingDetail from '@/components/CardingDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Attendance',
      component: Attendance
    },
    {
      path: '/CardingDetail/:cardingDay',
      name: 'CardingDetail',
      component: CardingDetail
    }
  ]
})
