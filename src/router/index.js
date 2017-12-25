import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import LoggedOut from '@/components/LoggedOut'
import VueResource from 'vue-resource'
import Currency from '../libs/currency'
import Radio from '@/components/fields/Radio.vue'
import Select from '@/components/fields/Select.vue'
import CrudBoolean from '@/components/fields/Boolean.vue'
import RemoteSelect from '@/components/fields/RemoteSelect.vue'
import MailPreview from '@/components/fields/MailPreview.vue'
import ImageUpload from '@/components/fields/ImageUpload.vue'
import Translations from '@/components/fields/Translations.vue'
import Image from '@/components/fields/Image.vue'
import Order from '@/components/Order.vue'
import Messages from '@/components/Messages.vue'
import Payment from '@/components/Payment.vue'
import Shipping from '@/components/Shipping.vue'
import VueCrudTable from '@/components/VueCrudTable.vue'
import Wysiwyg from 'vue-wysiwyg'

Vue.component('v-crud-radio', Radio)
Vue.component('v-crud-select', Select)
Vue.component('v-crud-boolean', CrudBoolean)
Vue.component('v-crud-remote-select', RemoteSelect)
Vue.component('v-crud-image-upload', ImageUpload)
Vue.component('v-crud-mail-preview', MailPreview)
Vue.component('v-crud-image', Image)
Vue.component('v-crud-translations', Translations)
Vue.component('v-crud-table', VueCrudTable)
Vue.component('order', Order)
Vue.component('messages', Messages)
Vue.component('payment', Payment)
Vue.component('shipping', Shipping)

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

Vue.filter('datetime', function (date) {
  if (typeof date === 'undefined') {
    return ''
  }

  var dateObj = new Date(date)
  return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString()
})

Vue.filter('currency', Currency)

Vue.filter('date', function (date, format) {
  if (typeof date === 'undefined') {
    return ''
  }

  var dateObj = new Date(date)
  return dateObj.toLocaleDateString()
})

Vue.use(VueResource)
Vue.use(Router)
Vue.use(Wysiwyg, {
  hideModules: {
    image: true,
    table: true
  }
})

let routerInstance = new Router({
  routes: [
    {
      path: '/logged_out',
      name: 'logged_out',
      component: LoggedOut
    },
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

Vue.http.options.headers = {
  'Authorization': null
}

export default routerInstance
