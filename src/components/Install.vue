<template>
  <div class="installation">
    <h1>Developer Info</h1>
    <div>
      <h2>Your API-Keys</h2>
      <div v-for="api_key in api_keys" style="margin-bottom: 10px;">
        <el-input v-model="api_key.key" readonly style="width:300px"></el-input> <el-tag type="success">{{ api_key.access }}</el-tag>
      </div>

      <h2>Api-Documenation</h2>
      <div>
        <a href="https://www.storyblok.com/commerce/docs/api/products" target="_blank">https://www.storyblok.com/commerce/docs/api/products</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rootConfig'],

  data () {
    return {
      api_keys: []
    }
  },

  created () {
    let api = this.$resource(this.rootConfig.endPoint + '/api_keys/{id}', {}, {}, {headers: this.rootConfig.headers})
    api.get()
      .then((res) => {
        this.api_keys = res.body
      })
  }
}
</script>

<style scoped>
  .installation {

  }
</style>
