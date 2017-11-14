<template>
  <el-select
    :value="proxyValue"
    @input="updateValue"
    :multiple="options.multiple"
    filterable
    remote
    placeholder="Please enter a keyword"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in results"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data () {
      return {
        results: [],
        list: [],
        loading: false,
        states: [],
        proxyValue: ''
      }
    },
    computed: {
      api () {
        return this.$resource(
            [this.rootConfig.endPoint, this.options.resource].join('/'), {}, {}, {headers: this.rootConfig.headers})
      }
    },
    props: ['options', 'placeholder', 'value', 'rootConfig'],
    mounted () {

    },
    watch: {
      value () {
        this.api.get({id: this.value})
          .then((res) => {
            this.proxyValue = res.data.name
          })
          .catch((res) => {
            console.error(res)
            this.$message('Something went wrong. Please try again.')
          })
      }
    },
    methods: {
      updateValue (v) {
        this.proxyValue = this.results.filter(item => {
          return item.id === v
        })[0].name

        this.$emit('input', v)
      },

      remoteMethod (query) {
        if (query !== '') {
          this.loading = true
          this.api.get({term: query})
            .then((res) => {
              this.loading = false

              this.results = res.data.filter(item => {
                return item.name.toLowerCase()
                  .indexOf(query.toString().toLowerCase()) > -1
              })
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
