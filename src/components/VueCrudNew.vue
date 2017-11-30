<template>
  <el-form ref="form" :model="model" label-width="120px">
    <el-tabs>
      <el-tab-pane :key="tab.label" v-for="tab in config.formFields" :label="tab.label">
        <el-form-item :key="field.name" :label="field.label" v-for="field in tab.fields">
          <div :placeholder="field.placeholder" :root-config="rootConfig" :options="field.options" :type="field.type" :is="field.component" v-model="model[field.name]"></div>
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
import Radio from './fields/Radio.vue'
import Select from './fields/Select.vue'
import CrudBoolean from './fields/Boolean.vue'
import RemoteSelect from './fields/RemoteSelect.vue'
import ImageUpload from './fields/ImageUpload.vue'
import Order from './Order.vue'
import api from '../libs/api'

export default {
  name: 'v-crud-new',

  props: ['config', 'rootConfig', 'params', 'id'],

  data () {
    return {
      model: {}
    }
  },

  components: {
    'v-crud-radio': Radio,
    'v-crud-select': Select,
    'v-crud-boolean': CrudBoolean,
    'v-crud-remote-select': RemoteSelect,
    'v-crud-image-upload': ImageUpload,
    'order': Order
  },

  methods: {
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
