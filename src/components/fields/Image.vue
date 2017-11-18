<template>
  <div>
    <img :src="src" width="200">
    <div>
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],

  computed: {
    src () {
      return this.value ? `//img3.storyblok.com/${this.value}` : null
    }
  }
}
</script>
