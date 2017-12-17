<template>
  <div>
    <ul class="el-upload-list el-upload-list--picture">
      <li class="el-upload-list__item" v-for="file in fileList">
        <a :href="imgService + file.filename" target="_blank">
        <img
          class="el-upload-list__item-thumbnail"
          :src="imgService + file.filename" alt="">
        </a>
        <a class="el-upload-list__item-name">
          <el-button @click.prevent="handleDelete(file)">Delete</el-button>
        </a>
      </li>
    </ul>
    <el-upload
      ref="imageupload"
      :action="importEndpoint"
      :headers="rootConfig.headers"
      :before-upload="beforeUpload"
      :show-file-list="false"
      :multiple="true"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :on-change="handleChange"
      list-type="picture">

      <el-button size="small" type="primary">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 5000kb</div>
    </el-upload>
  </div>
</template>

<script>
import api from '../../libs/api'

export default {
  name: 'v-crud-image-upload',
  props: ['placeholder', 'value', 'rootModel', 'rootConfig'],
  methods: {
    updateValue (v) {
      v.forEach((file) => {
        file.filename = file.filename.replace('http://assets.storeblok.com/', '')
      })

      if (this.isSingle) {
        this.$emit('input', v[0].filename)
      } else {
        this.$emit('input', v)
      }
    },

    handleRemove (file) {

    },

    beforeUpload () {
      return new Promise(resolve => {
        setTimeout(resolve, this.throttleCount * 100)
        this.throttleCount = this.throttleCount + 1
      })
    },

    handleUploadSuccess (res) {
      if (this.isSingle) {
        this.fileList = [{filename: res.filename, primary: 0}]
      } else {
        this.fileList.push({filename: res.filename, primary: 0})
      }
      this.updateValue(this.fileList)
    },

    handleUploadError () {

    },

    handleDelete (file) {
      this.fileList = this.fileList.filter((fileListItem) => {
        return file.filename !== fileListItem.filename
      })
      this.updateValue(this.fileList)
    },

    handleChange (file, fileList) {
      console.log(fileList)
    },

    doUpload (xhr) {
      this.saveBase64(xhr.file, (base64file) => {
        api.init('assets')
          .save({file: base64file})
          .then(this.handleSuccess)
          .catch(api.errorHandler)
      })
    },

    setFilelist () {
      if (this.value) {
        if (this.isSingle) {
          this.fileList = [{filename: this.value}]
        } else {
          let value = this.value

          if (this.value.constructor !== Array) {
            value = Object.values(this.value)
          }
          let fileList = []

          value.forEach((file) => {
            file.filename = file.filename.replace(new RegExp('http://assets.storeblok.com/', 'g'), '')
            fileList.push(file)
          })

          this.fileList = fileList
        }
      }
    }
  },

  computed: {
    importEndpoint () {
      return this.rootConfig.endPoint + '/assets'
    },
    isSingle () {
      return this.value.constructor === String
    }
  },

  data () {
    return {
      imgService: 'http://assets.storeblok.com/',
      fileList: []
    }
  },

  created () {
    this.setFilelist()
  },

  watch: {
    value () {
      this.setFilelist()
    }
  }
}
</script>
