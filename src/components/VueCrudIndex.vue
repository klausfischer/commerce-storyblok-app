<template>
  <div>
    <div class="header">
      <span class="title">{{ config.name }}</span>
      <span class="buttons">
        <div>
          <el-input
            placeholder="Search"
            icon="search"
            v-model="term">
          </el-input>
        </div>
        <div class="upload-btn" v-if="config.import">
          <el-upload
            ref="upload"
            :action="importEndpoint"
            :headers="rootConfig.headers"
            :before-upload="beforeUpload"
            :show-file-list="true"
            :multiple="true"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            v-loading="uploading">
            <el-button slot="trigger">Import</el-button>
          </el-upload>
          <el-button @click="clearImport" v-if="showClearBtn">Clear</el-button>
        </div>

        <el-button v-if="config.exportable" @click="doExport">
          Export
        </el-button>
        <el-button v-if="!config.hideCreate" @click="$router.push({name: 'admin', params: {model: config.route, id: 'all', action: 'new'}})">
          New
        </el-button>
      </span>
    </div>
    <div class="selection" v-if="multipleSelection.length > 0">
      <el-button @click="massDeletion">Delete</el-button>
      {{ multipleSelection.length }} selected
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      @row-click="handlRowClick"
      @selection-change="handleSelectionChange">
      <div slot="empty">
        No items yet
      </div>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        :key="column.property"
        :label="column.label"
        :property="column.property"
        :width="column.width"
        v-for="column in config.columns">

        <template scope="scope">
          <span :is="column.component" :value="scope.row[column.property]"></span>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer" v-if="pageSize > 0">
      <el-pagination
        layout="prev, pager, next"
        :total="numFound"
        :page-size="pageSize"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import SimpleText from './SimpleText.vue'
import Boolean from './Boolean.vue'
import DateTime from './DateTime.vue'
import Currency from './Currency.vue'
import api from '../libs/api'
import download from '../libs/download'

export default {
  name: 'v-crud-index',

  props: ['config', 'rootConfig', 'api'],

  components: {
    SimpleText,
    Currency,
    Boolean,
    DateTime
  },

  data () {
    return {
      tableData: [],
      multipleSelection: [],
      pageSize: 0,
      numFound: 0,
      page: 1,
      loading: false,
      term: '',
      showClearBtn: false,
      throttleCount: 0,
      uploading: false
    }
  },

  mounted () {
    this.loadData()
  },

  watch: {
    'config' () {
      this.loadData()
      if (typeof this.$refs.upload !== 'undefined') {
        this.clearImport()
      }
    },

    term () {
      this.loadData()
    }
  },

  computed: {
    importEndpoint () {
      return this.rootConfig.endPoint + '/' + this.config.import
    },

    filter () {
      if (typeof this.config.filter !== 'undefined' && this.config.filter.length > 0) {
        return this.config.filter + this.$route.params.id
      }
      return ''
    },

    apiResource () {
      return this.$resource(
        this.rootConfig.endPoint + '/' + this.config.resource + this.filter, {}, {}, {headers: this.rootConfig.headers})
    }
  },

  methods: {
    doExport () {
      this.apiResource
        .get({term: this.term, per_page: 1000, as_csv: true})
        .then((res) => {
          download(res.data.csv, 'entries.csv', 'text/csv')
        })
    },

    beforeUpload () {
      this.uploading = true

      return new Promise(resolve => {
        setTimeout(resolve, this.throttleCount * 100)
        this.throttleCount = this.throttleCount + 1
      })
    },

    pageChange (page) {
      this.page = page
      this.loadData()
    },

    handleUploadSuccess () {
      this.loadData()
      this.showClearBtn = true
      this.uploading = false
    },

    handleUploadError (res) {
      this.handleUploadSuccess()

      let response = {
        status: res.status,
        body: JSON.parse(res.message.substr(4))
      }
      api.errorHandler.call(this, response)
    },

    clearImport () {
      this.$refs.upload.clearFiles()
      this.showClearBtn = false
      this.throttleCount = 0
    },

    loadData () {
      this.loading = true
      this.apiResource
        .get({page: this.page, term: this.term})
        .then(this.setTableData)
        .catch(api.errorHandler)
    },

    getHeader (res, header) {
      if (res.headers.map[header]) {
        return parseInt(res.headers.map[header][0])
      }
      let lowerHeader = header.toLowerCase()
      if (res.headers.map[lowerHeader]) {
        return parseInt(res.headers.map[lowerHeader][0])
      }
      return 0
    },

    setTableData (res) {
      this.pageSize = this.getHeader(res, 'Per-Page')
      this.numFound = this.getHeader(res, 'Total')

      if (this.config.rootObject) {
        this.tableData = res.body[this.config.rootObject]
      } else {
        this.tableData = res.body
      }

      this.loading = false
    },

    handlRowClick (row, event, column) {
      if (column.type === 'default') {
        this.$router.push({name: 'admin', params: {id: row.id, action: 'edit', model: this.config.route}})
      }
    },

    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    massDeletion () {
      this.multipleSelection.forEach((item, index) => {
        setTimeout(() => {
          this.apiResource
            .delete({id: item.id})
            .then(() => {
              this.loadData()
            })
            .catch(api.errorHandler)
        }, 200 * index)
      })
    }
  }
}
</script>

<style>
  .footer {
    padding: 30px 0;
    text-align: center;
  }

  .selection {
    margin-bottom: 20px;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    margin-right: auto;
    font-size: 1.2rem;
  }

  .buttons {
    margin-left: auto;
  }

  .upload-btn {
    position: relative;
  }

  .upload-btn > * {
    display: inline-block;
  }

  .buttons > * {
    margin-left: 10px !important;
    display: inline-block;
  }

  .buttons .el-upload-list {
    position: absolute;
    background: #FFF;
    z-index: 10001;
    border-radius: 5px;
    margin-top: 5px;
    right: 0;
    border: 1px solid #CCC;
  }

  .buttons .el-upload-list__item:first-child {
    margin-top: 0;
  }
</style>
