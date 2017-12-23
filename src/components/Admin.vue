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
import Install from './Install'
import Dashboard from './Dashboard'
import schema from '../schema'
import params from '../libs/params'
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
        body: {}
      },
      firstRedirect: true
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
    let group = params('group')
    if (params('_storyblok')) {
      this.loadConfig()

      if (local) {
        this.registerStoryblok()
      }
    } else {
      this.config.body = schema[group] || schema.default
      this.initRoute()
      this.firstRedirect = false
    }
  },

  components: {
    'v-crud': VueCrud,
    'settings': Settings,
    'install': Install,
    'dashboard': Dashboard
  },

  methods: {
    loadConfig () {
      let stories = this.$resource('https://api.storyblok.com/v1/cdn/stories/{id}')
      stories.get({id: params('_storyblok'), token: 'LuOkra0UmAAm1mvux2XX7Att', version: 'draft'})
        .then((res) => {
          this.config.body = res.body.story.content.body
          this.initRoute()
          this.firstRedirect = false
        })
    },

    registerStoryblok () {
      window.storyblok.init()

      window.storyblok.on('change', () => {
        this.loadConfig()
      })

      window.storyblok.on('published', () => {
        this.loadConfig()
      })

      window.storyblok.pingEditor(function () {
        if (window.storyblok.inEditor) {
          window.storyblok.enterEditmode()
        }
      })
    },

    initRoute () {
      let first = this.config.body[0]
      if (this.firstRedirect) {
        this.$router.push({name: 'admin', params: {model: first.route, id: 'all', action: 'index'}})
      }

      if (params('storeblok')) {
        let url = 'https://' + params('storeblok') + '.storeblok.com/admin/users/get_api_provision'
        if (local) {
          url = 'http://' + params('storeblok') + '.localhost.com/admin/users/get_api_provision'
        }
        let api = this.$resource(
          url, {}, {}, {credentials: true})

        api.get()
          .then((res) => {
            this.config.headers['Authorization'] = res.body.access_token
            this.loading = false
            this.stripeRedirect()
          })
      } else if (local) {
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
