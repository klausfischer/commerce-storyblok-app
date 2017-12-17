<template>
  <div>
    <v-crud-index :model="model" action="index" :root-config="rootConfig" :config="config"></v-crud-index>
  </div>
</template>

<script>
import VueCrudIndex from './VueCrudIndex.vue'

export default {
  name: 'v-crud-table',

  props: ['config', 'rootConfig', 'model'],

  components: {
    'v-crud-index': VueCrudIndex
  },

  data () {
    return {

    }
  },

  mounted () {

  }
}
</script>
