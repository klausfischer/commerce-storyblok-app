<template>
  <div class="u__margin-bottom">
    <h4 class="group__headline">Stripe</h4>
    <div v-if="model.stripe">
      <el-form-item label="Enabled">
        <el-radio v-model="model.stripe.enabled" label="1">Yes</el-radio>
        <el-radio v-model="model.stripe.enabled" label="0">No</el-radio>
      </el-form-item>
      <el-form-item label="Account Setup">
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
      </el-form-item>
    </div>
    <div v-else>
      <el-button type="primary" @click="install('stripe')">Install</el-button>
    </div>

    <h4 class="group__headline u__margin-top">Prepayment</h4>
    <div v-if="model.cod">
      <el-form-item label="Enabled">
        <el-radio v-model="model.cod.enabled" label="1">Yes</el-radio>
        <el-radio v-model="model.cod.enabled" label="0">No</el-radio>
      </el-form-item>
      <el-form-item label="Label">
        <el-input v-model="model.cod.method_name"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="model.cod.form_description"></el-input>
      </el-form-item>
    </div>
    <div v-else>
      <el-button type="primary" @click="install('cod')">Install</el-button>
    </div>

    <h4 class="group__headline u__margin-top">Invoice</h4>
    <div v-if="model.invoice">
      <el-form-item label="Enabled">
        <el-radio v-model="model.invoice.enabled" label="1">Yes</el-radio>
        <el-radio v-model="model.invoice.enabled" label="0">No</el-radio>
      </el-form-item>
      <el-form-item label="Label">
        <el-input v-model="model.invoice.method_name"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="model.invoice.form_description"></el-input>
      </el-form-item>
    </div>
    <div v-else>
      <el-button type="primary" @click="install('invoice')">Install</el-button>
    </div>

    <h4 class="group__headline u__margin-top">Paypal</h4>
    <div v-if="model.paypal_express">
      <el-form-item label="Enabled">
        <el-radio v-model="model.paypal_express.enabled" label="1">Yes</el-radio>
        <el-radio v-model="model.paypal_express.enabled" label="0">No</el-radio>
      </el-form-item>
      <el-form-item label="Username">
        <el-input v-model="model.paypal_express.username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="model.paypal_express.password"></el-input>
      </el-form-item>
      <el-form-item label="Signature">
        <el-input v-model="model.paypal_express.signature"></el-input>
      </el-form-item>
      <el-form-item label="Sandbox">
        <el-radio v-model="model.paypal_express.SANDBOX" label="1">Yes</el-radio>
        <el-radio v-model="model.paypal_express.SANDBOX" label="0">No</el-radio>
      </el-form-item>
    </div>
    <div v-else>
      <el-button type="primary" @click="install('paypal_express')">Install</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['model', 'settings', 'api'],

    data () {
      return {
        loading: true,
        gotUrl: false,
        url: ''
      }
    },

    computed: {
      userIsConnected () {
        let settings = this.settings.filter((item) => {
          return item.code === 'stripe' && item.setting_key === 'user' && item.setting
        })

        return settings.length > 0
      }
    },

    methods: {
      install (method) {
        let data = {}
        let initial = {enabled: '0'}
        data[method] = initial
        data.payment_modules = {}
        data.payment_modules[method] = '0'

        this.api
          .update({id: 'mine'}, data)
          .then((res) => {
            this.$emit('updated', res.data)
            this.$message('Updated successfully')
          })
      },

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
      }
    }
  }
</script>
