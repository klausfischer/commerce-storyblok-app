<template>
  <el-form ref="form" :model="model" label-width="120px">
    <el-tabs>
      <el-tab-pane :key="tab.label" v-for="tab in config.formFields" :label="tab.label">
        <div :model="model" :root-config="rootConfig" :is="item.component" :options="item.options" v-for="item in tab.body"></div>

        <el-form-item :key="field.name" :label="field.label" v-for="field in tab.fields">
          <div :placeholder="field.placeholder" @input="setModel(field.name)" :root-config="rootConfig" :options="field.options" :type="field.type" :is="field.component" v-model="model[field.name]"></div>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Save</el-button>
      <el-button @click="$router.push({name: 'admin', params: {id: 'all', action: 'index'}})">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import api from '../libs/api'

export default {
  name: 'v-crud-new',

  props: ['config', 'rootConfig', 'params', 'id'],

  data () {
    return {
      model: {}
    }
  },

  methods: {
    setModel () {
      if (typeof this.model[name] === 'undefined') {
        this.model = Object.assign({}, this.model)
      }
    },
    onSubmit () {
      let params = {}

      if (this.config.singleRootObject) {
        params[this.config.singleRootObject] = this.model
      } else {
        params = this.model
      }

      api.res
        .save(params)
        .then(() => {
          this.$router.push({name: 'admin', params: {id: 'all', action: 'index'}})
        })
        .catch(api.errorHandler)
    }
  }
}
</script>
