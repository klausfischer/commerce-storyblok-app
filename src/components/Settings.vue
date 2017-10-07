<template>
  <div>
    <el-form v-loading="loading" ref="form" :model="model" label-width="120px">
      <h2>Stripe Setup</h2>
      <div v-if="userIsConnected">
        <p>You have successfully connected your Stripe account to this app.</p>
        <el-button @click="disconnect">Disconnect your Stripe account</el-button>
      </div>
      <div v-if="!userIsConnected">
        <el-button type="primary" @click="connectStripe">Connect your Stripe account</el-button>
      </div>

      <div v-for="(item, key) in model">
        <h2>{{ key|humanize }}</h2>

        <el-form-item :key="innerKey" :label="innerKey|humanize" v-for="(innerItem, innerKey) in item">
          <el-input v-model="model[key][innerKey]"></el-input>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['config', 'rootConfig'],

  computed: {
    userIsConnected () {
      let settings = this.settings.filter((item) => {
        return item.code === 'stripe' && item.setting_key === 'user' && item.setting
      })

      return settings.length > 0
    }
  },

  data () {
    return {
      api: null,
      loading: true,
      model: {
        general_setting: { default_shipping_price: '', default_tax: '', domain: '', currency: 'usd' }
      },
      settings: []
    }
  },

  created () {
    this.api = this.$resource(
      this.rootConfig.endPoint + '/settings/{id}', {}, {}, {headers: this.rootConfig.headers})

    this.api
      .get({id: 'mine'})
      .then((res) => {
        this.loading = false
        this.settings = res.data

        for (let i = 0; i < res.data.length; i++) {
          let data = res.data[i]
          if (typeof this.model[data.code] !== 'undefined' && typeof this.model[data.code][data.setting_key] !== 'undefined') {
            this.model[data.code][data.setting_key] = data.setting
          }
        }
      })
  },

  methods: {
    disconnect () {
      window.open(this.rootConfig.endPoint.replace('/v1', '') + '/connect/deauthorize', '_blank', 'toolbar=0,location=0,menubar=0')
    },

    connectStripe () {
      let authApi = this.$resource(
        this.rootConfig.endPoint.replace('/v1', '') + '/connect/{action}', {}, {}, {headers: this.rootConfig.headers})

      authApi.get({action: 'oauth'})
        .then((res) => {
          window.open(res.data.url)
        })
        .catch((res) => {
          this.$message('Something went wrong. Please try again.')
        })
    },

    onSubmit () {
      this.api
        .update({id: 'mine'}, this.model)
        .then((res) => {
          this.$message('Updated successfully')
        })
    }
  }
}
</script>

<style>
  h2 {
    margin-bottom: 10px;
  }
</style>
