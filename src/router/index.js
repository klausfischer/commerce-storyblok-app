import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import VueResource from 'vue-resource'

Vue.filter('humanize', function (value) {
  if (typeof value === 'undefined') {
    return 'undefined'
  }
  var humanized = value.toString()
                       .toLowerCase()
                       .replace(/[_-]/g, ' ')
                       .replace(/(?:^|\s)\S/g, function (a) {
                         return a.toUpperCase()
                       })

  return humanized
})

Vue.use(VueResource)
Vue.use(Router)

Vue.http.options.headers = {
  'Authorization': null
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Admin,
      props: { model: 'orders', id: 'all', action: 'index' }
    },
    {
      path: '/admin/:model/:id/:action',
      name: 'admin',
      component: Admin,
      props: true
    },
    {
      path: '/settings',
      name: 'settings',
      component: Admin,
      props: { model: 'settings', id: 'all', action: 'index' }
    }
  ]
})
