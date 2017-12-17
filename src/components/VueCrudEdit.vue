<template>
  <el-form v-loading="loading" ref="form" :model="model" label-width="120px">
    <el-tabs v-model="activeTab">
      <el-tab-pane :key="tab.label" v-for="tab in config.formFields" :label="tab.label">
        <div :model="model" :config="item" :root-config="rootConfig" :is="item.component" :options="item.options" v-for="item in tab.body"></div>

        <el-form-item :key="field.name" :label="field.label" v-for="field in tab.fields">
          <div :placeholder="field.placeholder" :root-config="rootConfig" :options="field.options" :type="field.type" :is="field.component" :root-model="model" v-model="model[field.name]"></div>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>

    <el-form-item v-if="!config.hideActionBar">
      <el-button type="primary" @click="onSubmit">Save</el-button>
      <el-button @click="$router.push({name: 'admin', params: {id: 'all', action: 'index'}})">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import api from '../libs/api'

export default {
  name: 'v-crud-edit',

  props: ['config', 'rootConfig', 'params', 'id'],

  data () {
    return {
      model: {},
      activeTab: '0',
      loading: false
    }
  },

  watch: {
    '$route.params.model' () {
      this.loadData()
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      this.loading = true
      api.res
        .get({id: this.id})
        .then(this.setModelData)
        .catch(api.errorHandler)
    },

    onSubmit () {
      let params = {}

      if (this.config.singleRootObject) {
        params[this.config.singleRootObject] = this.model
      } else {
        params = this.model
      }

      api.res
        .update({id: this.id}, params)
        .then(() => {
          this.$router.push({name: 'admin', params: {id: 'all', action: 'index'}})
        })
        .catch(api.errorHandler)
    },

    setModelData (res) {
      if (this.config.singleRootObject) {
        this.model = res.body[this.config.singleRootObject]
      } else {
        this.model = res.body
      }
      this.loading = false
      this.activeTab = '0'
    }
  }
}
</script>
