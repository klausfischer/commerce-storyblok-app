<template>
  <span>{{value | datetime}}</span>
</template>

<script>
  export default {
    props: ['value']
  }
</script>
