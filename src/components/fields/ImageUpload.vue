<template>
  <el-upload
    :file-list="fileList"
    :http-request="doUpload"
    :multiple="true"
    :on-remove="handleRemove"
    action="https://jsonplaceholder.typicode.com/posts/"
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

    handleSuccess (res) {
      this.fileList.push({name: res.body.filename, url: this.imgService + res.body.filename})
      this.updateValue(this.cleanedFileList)
    },

    handleRemove (file, fileList) {
      this.fileList = fileList
      this.updateValue(this.cleanedFileList)
    },

    doUpload (xhr) {
      this.saveBase64(xhr.file, (base64file) => {
        api.init('assets')
          .save({file: base64file})
          .then(this.handleSuccess)
          .catch(api.errorHandler)
      })
    },

    saveBase64 (file, cb) {
      var fd = new FileReader()

      fd.onloadend = () => {
        cb(fd.result)
      }

      fd.readAsDataURL(file)
    }
  },

  computed: {
    cleanedFileList () {
      let fileList = []

      this.fileList.forEach((file) => {
        fileList.push({filename: file.name, primary: 0})
      })

      return fileList
    }
  },

  data () {
    return {
      imgService: 'https://img2.storyblok.com/100x100/',
      fileList: []
    }
  },

  watch: {
    value () {
      if (this.value) {
        let value = this.value

        if (this.value.constructor !== Array) {
          value = Object.values(this.value)
        }
        let fileList = []

        value.forEach((file) => {
          fileList.push({name: file.filename, url: this.imgService + file.filename})
        })

        this.fileList = fileList
      }
    }
  }
}
</script>
