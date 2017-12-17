<template>
  <div class="body" v-loading="loading">
    <div v-for="locale in locales">
      <h4 class="group__headline">{{ locale.name }}</h4>
      <div>
        <el-form-item :key="field.value" :label="field.label" v-for="field in options">
          <div type="textarea" is="el-input" v-model="translations[locale.id][field.value]"></div>
          {{ model[field.value] }}
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(locale.id)">Save this translations</el-button>
        </el-form-item>
      </div>
    </div>
  </div>
</template>

<script>
import each from '../../libs/each'
import api from '../../libs/api'
import isoLanguages from '../../libs/isoLanguages'

export default {
  name: 'v-crud-translations',
  data () {
    return {
      loading: false,
      locales: [],
      translations: {}
    }
  },
  computed: {
    settingApi () {
      return this.$resource(
        this.rootConfig.endPoint + '/settings/{id}', {}, {}, {headers: this.rootConfig.headers})
    },
    api () {
      return this.$resource(
        this.rootConfig.endPoint + '/translations/{id}', {}, {}, {headers: this.rootConfig.headers})
    },
    tableName () {
      return 'cart_' + this.$route.params.model
    }
  },
  props: ['formConfig', 'options', 'placeholder', 'rootConfig', 'model', 'value', 'type', 'fieldName'],
  watch: {
    '$route.params.id': function () {
      this.loadTranslations()
    },
    '$route.params.model': function () {
      this.loadTranslations()
    }
  },
  created () {
    setTimeout(() => {
      this.loadTranslations()
    }, 100)
  },
  methods: {
    loadTranslations () {
      this.settingApi
        .get({code: 'general_setting', setting_key: 'aditional_languages'})
        .then((res) => {
          if (res.body.length > 0) {
            let languages = JSON.parse(res.body[0].setting)

            languages.forEach((item) => {
              this.locales.push({name: (isoLanguages[item] || item), id: item})
              this.translations[item] = {}
            })
          }

          this.api
            .get({with_table_name: this.tableName, with_foreign_id: this.$route.params.id})
            .then((res) => {
              res.data.forEach((item) => {
                if (typeof this.translations[item.language] !== 'undefined') {
                  this.translations[item.language][item.key] = item.body
                }
              })

              this.translations = Object.assign({}, this.translations)
            })
            .catch(api.errorHandler)
        })
        .catch(api.errorHandler)
    },
    onSubmit () {
      let translations = []

      each(this.translations, (translation, language) => {
        each(translation, (body, key) => {
          translations.push({
            table_name: this.tableName,
            foreign_id: this.$route.params.id,
            language: language,
            key: key,
            body: body
          })
        })
      })

      this.loading = true

      this.api
        .save({translations: translations})
        .then((res) => {
          this.loading = false
        })
        .catch(api.errorHandler)
    }
  }
}
</script>

<style scoped>
  .body {
    margin-bottom: 60px;
  }
</style>
