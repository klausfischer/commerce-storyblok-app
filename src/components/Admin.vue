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

export default {
  name: 'admin',

  props: ['id', 'model', 'action'],

  data () {
    return {
      loading: true,
      config: {
        component: 'v-admin',
        endPoint: 'https://localhost:3005/v1',
        headers: {},
        body: [
          {
            component: 'v-crud',
            resource: 'orders/{id}',
            route: 'orders',
            name: 'Orders',
            hideCreate: true,
            formFields: [
              {
                component: 'el-tab',
                label: 'General',
                fields: [
                  {
                    component: 'order',
                    label: 'Order',
                    name: 'order_number'
                  },
                  {
                    component: 'el-input',
                    type: 'textarea',
                    label: 'Notes',
                    name: 'notes'
                  }
                ]
              }
            ],
            columns: [
              {
                component: 'el-table-column',
                label: 'Ordernumber',
                property: 'order_number'
              },
              {
                component: 'el-table-column',
                label: 'Status',
                property: 'status'
              },
              {
                component: 'el-table-column',
                label: 'Ordered on',
                property: 'ordered_on'
              },
              {
                component: 'el-table-column',
                label: 'Total',
                property: 'total'
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
    window.storyblok.getSession((data) => {
      this.config.headers['Authorization'] = data.session.access_token
      this.loading = false
    })
  },

  components: {
    'v-crud': VueCrud,
    'settings': Settings
  },

  methods: {
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
