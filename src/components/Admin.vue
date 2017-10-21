<template>
  <div v-if="!loading">
    <el-menu default-active="1" @select="handleSelect" mode="horizontal">
      <el-menu-item :key="index" :index="nav.route" v-for="(nav, index) in config.body">
        {{ nav.name }}
      </el-menu-item>
    </el-menu>
    <div class="container" v-if="activeConfig != null">
      <div :is="activeConfig.component" :model="model" :action="action" :id="id" :root-config="config" :config="activeConfig"></div>
    </div>
  </div>
</template>

<script>
import VueCrud from './VueCrud'
import Settings from './Settings'
const local = window.location.href.indexOf('localhost:') > -1
const endPoint = local ? 'https://localhost:3005/v1' : 'https://api.storeblok.com/v1'

export default {
  name: 'admin',

  props: ['id', 'model', 'action'],

  data () {
    return {
      loading: true,
      config: {
        component: 'v-admin',
        endPoint: endPoint,
        headers: {},
        body: [
          {
            component: 'v-crud',
            resource: 'orders/{id}',
            route: 'orders',
            name: 'Orders',
            hideCreate: true,
            hideActionBar: true,
            formFields: [
              {
                component: 'order',
                label: 'General',
                fields: [],
                body: [
                  {
                    component: 'order'
                  }
                ]
              }
            ],
            columns: [
              {
                component: 'simple-text',
                label: 'Ordernumber',
                property: 'order_number'
              },
              {
                component: 'simple-text',
                label: 'Status',
                property: 'status'
              },
              {
                component: 'date-time',
                label: 'Ordered on',
                property: 'ordered_on'
              },
              {
                component: 'simple-text',
                label: 'Currency',
                property: 'currency'
              },
              {
                component: 'currency',
                label: 'Total',
                property: 'total'
              }
            ]
          },
          {
            component: 'v-crud',
            resource: 'products/{id}',
            route: 'products',
            name: 'Products',
            formFields: [
              {
                component: 'el-tab',
                label: 'Details',
                fields: [
                  {
                    component: 'el-checkbox',
                    label: 'Enabled',
                    name: 'enabled'
                  },
                  {
                    component: 'el-input',
                    label: 'Name',
                    name: 'name'
                  },
                  {
                    component: 'el-input',
                    label: 'SKU',
                    name: 'sku'
                  },
                  {
                    component: 'el-input',
                    label: 'Excerpt',
                    type: 'textarea',
                    name: 'excerpt'
                  },
                  {
                    component: 'el-input',
                    label: 'Description',
                    type: 'textarea',
                    name: 'description'
                  }
                ]
              },
              {
                component: 'el-tab',
                label: 'Prices',
                fields: [
                  {
                    component: 'el-input',
                    label: 'Price',
                    name: 'price'
                  },
                  {
                    component: 'el-input',
                    label: 'Saleprice',
                    name: 'saleprice'
                  }
                ]
              },
              {
                component: 'el-tab',
                label: 'Images',
                fields: [
                  {
                    component: 'v-crud-image-upload',
                    label: 'Images',
                    name: 'images'
                  }
                ]
              }
            ],
            columns: [
              {
                component: 'simple-text',
                label: 'SKU',
                property: 'sku'
              },
              {
                component: 'simple-text',
                label: 'Name',
                property: 'name'
              },
              {
                component: 'simple-text',
                label: 'Quantity',
                property: 'quantity'
              },
              {
                component: 'currency',
                label: 'Price',
                property: 'price'
              },
              {
                component: 'boolean',
                label: 'Enabled',
                property: 'enabled'
              }
            ]
          },
          {
            component: 'settings',
            resource: 'settings/{id}',
            route: 'settings',
            name: 'Shop Config'
          }
        ]
      }
    }
  },

  computed: {
    activeConfig: function () {
      let model = this.config.body.filter((e) => {
        return e.route === this.model
      })

      if (model.length > 0) {
        return model[0]
      }

      return null
    }
  },

  created () {
    if (local) {
      this.config.headers['Authorization'] = 'Token token=3a9073a24d131fd3380d0d4a6c0ba7d3'
      this.loading = false
      this.stripeRedirect()
    } else {
      window.storyblok.getSession((data) => {
        this.config.headers['Authorization'] = data.session.access_token
        this.loading = false
        this.stripeRedirect()
      })
    }
  },

  components: {
    'v-crud': VueCrud,
    'settings': Settings
  },

  methods: {
    stripeRedirect () {
      if (window.location.search.indexOf('?stripe_connected=1') > -1) {
        this.$router.push({name: 'admin', params: {model: 'settings', id: 'all', action: 'index'}})
      }
    },

    handleSelect (index) {
      this.$router.push({name: 'admin', params: {model: index, id: 'all', action: 'index'}})
    }
  }
}
</script>

<style scoped>
  .container {
    padding: 30px;
  }
</style>
