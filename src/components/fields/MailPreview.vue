<template>
  <div>
    <div class="preview"></div>
  </div>
</template>

<script>
export default {
  name: 'v-crud-mail-preview',
  props: ['root-config', 'value'],
  computed: {
    api () {
      return this.$resource(
          [this.rootConfig.endPoint, 'mail_previews/me'].join('/'), {}, {}, {headers: this.rootConfig.headers})
    }
  },
  watch: {
    value () {
      if (this.value && this.value.length > 0) {
        this.api.get({trigger: this.value})
          .then((res) => {
            document.querySelector('.preview').innerHTML = res.data
          })
          .catch((res) => {
            console.error(res)
            this.$message('Something went wrong. Please try again.')
          })
      }
    }
  }
}
</script>
