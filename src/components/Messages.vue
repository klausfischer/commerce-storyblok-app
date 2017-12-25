<template>
  <div>
    <el-form-item label="Predefined">
      <el-select v-on:input="updateCannedMsg">
        <el-option :key="option.id" v-for="option in cannedMessages" :label="option.name" :value="option.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Recipient">
      <el-input v-model="message.email"></el-input>
    </el-form-item>

    <el-form-item label="Subject">
      <el-input v-model="message.subject"></el-input>
    </el-form-item>

    <el-form-item label="Message">
      <wysiwyg v-model="message.content"></wysiwyg>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="send">Send</el-button>
    </el-form-item>
  </div>
</template>

<script>
  import api from '../libs/api'

  export default {
    computed: {
      api () {
        return this.$resource(
          this.rootConfig.endPoint + '/canned_messages/{id}', {}, {}, {headers: this.rootConfig.headers})
      }
    },
    data () {
      return {
        cannedMessages: [],
        message: {
          subject: '',
          content: '',
          order_id: '',
          email: ''
        }
      }
    },
    watch: {
      model () {
        this.message.email = this.model.email
        this.message.order_id = this.model.id
      }
    },
    props: ['model', 'config', 'rootConfig'],
    created () {
      this.api
        .get()
        .then((res) => {
          this.cannedMessages = res.data
        })
    },
    methods: {
      send () {
        let mailApi = this.$resource(
          this.rootConfig.endPoint + '/mails/{id}', {}, {}, {headers: this.rootConfig.headers})

        mailApi
          .save(this.message)
          .then((res) => {
            this.$message('Message sent successfully')
          })
          .catch(api.errorHandler)
      },
      updateCannedMsg (val) {
        let msgs = this.cannedMessages.filter((item) => {
          return item.id === val
        })

        if (msgs.length > 0) {
          this.message.content = msgs[0].content
          this.message.subject = msgs[0].subject
        }
      }
    }
  }
</script>
