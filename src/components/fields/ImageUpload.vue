<template>
  <el-upload
    :on-success="handleSuccess"
    :file-list="fileList"
    :http-request="doUpload"
    list-type="picture">
    <el-button size="small" type="primary">Click to upload</el-button>
    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 5000kb</div>
  </el-upload>
</template>

<script>
import api from '../../libs/api'

export default {
  name: 'v-crud-image-upload',
  props: ['placeholder', 'value', 'rootModel'],
  methods: {
    updateValue (v) {
      this.$emit('input', v)
    },
    handleSuccess (file, fileList) {
      console.log(file, fileList)
    },
    doUpload () {
      api.init('')
    }
  },
  data () {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  watch: {
    value () {
      console.log(this.value)
    }
  }
}
</script>
