<template>
  <el-radio-group v-bind:value="value" v-on:input="updateValue" :placeholder="placeholder">
    <el-radio :key="option.value" v-for="option in options" :label="option.value">{{ option.label }}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'v-crud-radio',
  props: ['options', 'placeholder', 'value'],
  methods: {
    updateValue (v) {
      this.$emit('input', v)
    }
  }
}
</script>
