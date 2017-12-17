<template>
  <div>
    <el-form v-loading="loading" ref="form" :model="model" label-width="120px">
      <el-tabs v-model="activeTab">
        <el-tab-pane :key="tab.label" v-for="tab in config.formFields" :label="tab.label">
          <div :model="model"
               :settings="settings"
               :root-config="rootConfig"
               :api="api"
               @updated="assignSettings"
               :is="item.component"
               :options="item.options"
               v-for="item in tab.body"></div>

          <el-form-item :key="field.name" :label="field.label" v-for="field in tab.fields">
            <div :placeholder="field.placeholder"
                 :root-config="rootConfig"
                 :options="field.options"
                 :type="field.type"
                 :is="field.component"
                 :root-model="model"
                 v-if="model[field.name.split('.')[0]]"
                 v-model="model[field.name.split('.')[0]][field.name.split('.')[1]]"></div>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <el-form-item v-if="!hideSave">
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['config', 'rootConfig'],

  data () {
    return {
      activeTab: '0',
      api: null,
      loading: true,
      model: {},
      settingValues: {},
      settings: []
    }
  },

  computed: {
    hideSave () {
      return this.config.formFields[this.activeTab].hideSave
    }
  },

  created () {
    this.api = this.$resource(
      this.rootConfig.endPoint + '/bulk_settings/{id}', {}, {}, {headers: this.rootConfig.headers})

    this.api
      .get({id: 'mine'})
      .then((res) => {
        this.loading = false
        this.assignSettings(res.data)
      })
  },

  methods: {
    assignSettings (resData) {
      this.settings = resData

      for (let i = 0; i < resData.length; i++) {
        let data = resData[i]
        if (typeof this.model[data.code] === 'undefined') {
          this.model[data.code] = {}
        }
        this.model[data.code][data.setting_key] = data.setting
      }

      this.model = Object.assign({}, this.model)
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
