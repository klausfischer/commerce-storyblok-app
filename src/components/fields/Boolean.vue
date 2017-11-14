<template>
  <el-checkbox v-bind:value="value" v-on:change="updateValue" :label="label">
  </el-checkbox>
</template>

<script>
export default {
  props: ['value', 'label'],
  methods: {
    updateValue (v) {
      this.$emit('input', v.target.checked)
    }
  }
}
</script>
