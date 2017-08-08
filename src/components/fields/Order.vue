<template>
  <div>
    #{{ rootModel.order_number }}
    <dl class="dl">
      <dt>Status</dt>
      <dd>{{ rootModel.status }}</dd>
      <dt>Ordered on</dt>
      <dd>{{ rootModel.ordered_on }}</dd>
      <dt>Email</dt>
      <dd>{{ rootModel.email }}</dd>
      <dt>History</dt>
      <dd>
        <ul>
          <li v-for="history in rootModel.history">
            {{ history }}
          </li>
        </ul>
      </dd>
      <dt>Line items</dt>
      <dd>
        <el-table
          :data="rootModel.order_items"
          stripe
          style="width: 100%">
          <el-table-column
            prop="sku"
            label="SKU"
            width="180">
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="Quantity"
            width="180">
          </el-table-column>
          <el-table-column
            prop="value"
            label="Price">
          </el-table-column>
          <el-table-column
            prop="meta_data"
            label="Image">
            <template scope="scope">
              <img :src="scope.row.meta_data.image" width="40">
            </template>
          </el-table-column>
        </el-table>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'order',
  props: ['options', 'placeholder', 'value', 'rootModel'],

  created () {

  }
}
</script>

<style>
  .dl {
    margin: 0;
  }

  .dl dt {
    font-weight: bold;
  }

  .dl dd {
    margin: 0;
    line-height: 1;
    margin-bottom: 10px;
  }

  .dl ul {
    margin: 0;
  }
</style>
