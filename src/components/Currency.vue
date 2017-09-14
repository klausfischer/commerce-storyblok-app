<template>
  <span>{{value | currency('') }}</span>
</template>

<script>
  export default {
    props: ['value']
  }
</script>
