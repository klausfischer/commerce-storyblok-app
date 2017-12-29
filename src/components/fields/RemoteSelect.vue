<template>
  <div class="v-crud-remote-select">
    <el-select
      :value="proxyValue"
      @input="updateValue"
      filterable
      remote
      placeholder="Please enter a keyword"
      :remote-method="remoteMethod"
      :loading="loading">
      <el-option
        v-for="item in results"
        :key="item.id"
        :label="item[searchKey]"
        :value="item.id">
      </el-option>
    </el-select>

    <div class="taglist">
      <span
        class="el-tag el-tag--primary"
        v-for="val in valueList">
        {{ val.name }}
        <i class="el-tag__close el-icon-close"
          @click="removeValue(val.id)"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        results: [],
        list: [],
        valueList: [],
        loading: false,
        states: [],
        proxyValue: ''
      }
    },
    computed: {
      api () {
        return this.$resource(
            [this.rootConfig.endPoint, this.options[0].resource].join('/'), {}, {}, {headers: this.rootConfig.headers})
      },
      searchKey () {
        return this.options[0].searchKey || 'name'
      }
    },
    props: ['options', 'placeholder', 'value', 'rootConfig'],
    mounted () {

    },
    watch: {
      value () {
        if (this.value && this.value !== '0' && this.value !== []) {
          this.api.get({id: this.value, per_page: 1000})
            .then((res) => {
              this.setProxyValue(res.data)
            })
            .catch((res) => {
              console.error(res)
              this.$message('Something went wrong. Please try again.')
            })
        }
      }
    },
    methods: {
      setProxyValue (value) {
        if (this.options[0].multiple) {
          let validatedIds = value.map(item => {
            return item.id
          })

          if (validatedIds.length !== this.value.length) {
            this.$emit('input', validatedIds)
            return
          }

          this.proxyValue = ''
          this.valueList = value
        } else {
          this.proxyValue = value[this.searchKey]
        }
      },

      removeValue (id) {
        let results = this.value.filter(item => {
          return item !== id
        })

        this.$emit('input', results)
      },

      updateValue (v) {
        let results = this.results.filter(item => {
          return item.id === v
        })

        if (results && results.length > 0) {
          let value = results[0][this.searchKey]

          if (this.options[0].multiple) {
            this.proxyValue = ''

            let newValue = v
            v = this.value

            if (typeof v === 'undefined') {
              v = []
            }

            v.push(newValue)
          } else {
            this.proxyValue = value
          }
        }

        this.$emit('input', v)
      },

      remoteMethod (query) {
        if (query !== '') {
          this.loading = true
          this.api.get({term: query})
            .then((res) => {
              this.loading = false
              this.results = res.data
            })
            .catch((res) => {
              this.loading = false
              console.error(res)
              this.$message('Something went wrong. Please try again.')
            })
        } else {
          this.results = []
        }
      }
    }
  }
</script>

<style scoped>
  .v-crud-remote-select .el-select {
    width: 100%;
  }

  .v-crud-remote-select .el-tag {
    margin-right: 5px;
  }

  .taglist {
    margin-top: 5px;
    margin-bottom: 10px;
  }
</style>
