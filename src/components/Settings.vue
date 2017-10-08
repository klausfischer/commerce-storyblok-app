<template>
  <div>
    <el-form v-loading="loading" ref="form" :model="model" label-width="120px">
      <h2>Stripe Setup</h2>
      <div v-if="userIsConnected">
        <p>You have successfully connected your Stripe account to this app.</p>
        <el-button @click="disconnect">Disconnect your Stripe account</el-button>
      </div>
      <div v-if="!userIsConnected">
        <div v-if="!gotUrl">
          <el-button type="primary" @click="connectStripe">Connect your Stripe account</el-button>
        </div>
        <div v-if="gotUrl">
          <a :href="url" class="el-button el-button--primary" target="_blank">Click here to start connecting Stripe to this app</a>
        </div>
      </div>

      <div class="setting__live">
        <el-checkbox true-label="1" false-label="0" v-model="model.stripe.livemode">Enable live mode?</el-checkbox>
      </div>

      <h2>General Settings</h2>

      <el-form-item :key="innerKey" :label="innerKey|humanize" v-for="(innerItem, innerKey) in model.general_setting">
        <el-input v-model="model.general_setting[innerKey]"></el-input>
      </el-form-item>

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
        stripe: { livemode: '0' },
        general_setting: { default_shipping_price: '', default_tax: '', domain: '', currency: 'usd' }
      },
      settings: [],
      gotUrl: false,
      url: ''
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
        this.rootConfig.endPoint.replace('/v1', '') + '/connect/{action}', {}, {}, {credentials: true, headers: this.rootConfig.headers})

      this.gotUrl = false
      this.loading = true

      authApi.get({action: 'oauth'})
        .then((res) => {
          this.loading = false
          this.gotUrl = true
          this.url = res.data.url
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

  .setting__live {
    margin-top: 20px;
    margin-bottom: 30px;
  }
</style>
