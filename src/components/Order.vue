<template>
  <div>
    <h2>
      #{{ model.order_number }}
      <small class="order__time">{{ model.ordered_on | datetime }}</small>
    </h2>

    <el-row :gutter="30">
      <el-col :xs="24" :sm="16">
        <el-table
          :data="model.order_items"
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
            prop="value | currency('')"
            label="Price">
          </el-table-column>
          <el-table-column
            prop="meta_data"
            label="Image">
            <template scope="scope">
              <div v-if="scope.row.meta_data">
                <img :src="scope.row.meta_data.image" width="40">
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div>
          <h4 class="order__subhead">History</h4>
          <div v-if="!model.history || !model.history.length">No history yet</div>
          <ul class="order__history">
            <li v-for="history in model.history">
              {{ history }}
            </li>
          </ul>

          <h4 class="order__subhead">Payments</h4>
          <div v-if="!model.payments || !model.payments.length">No payments yet</div>
          <ul class="order__history">
            <li v-for="payment in model.payments">
              {{ payment.status }} (Created at {{ payment.created_at }})
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8">
        <dl class="dl">
          <dt>Status</dt>
          <dd>{{ model.status }}</dd>
          <dt>Email</dt>
          <dd>{{ model.email }}</dd>
          <dt>Address</dt>
          <dd v-if="model.ship_address">
            {{ model.ship_address.firstname }}<br>
            {{ model.ship_address.address1 }}<br>
            {{ model.ship_address.zip }} {{ model.ship_address.country }}
          </dd>
        </dl>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'order_detail',
  props: ['model'],

  created () {

  }
}
</script>

<style>
  .order__subhead {
    margin-bottom: 5px;
  }

  .order__history {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 0;
      padding: 0;
    }
  }

  .order__time {
    color: #99A9BF;
  }

  .dl {
    margin: 0;
  }

  .dl dt {
    font-weight: bold;
  }

  .dl dd {
    margin: 0;
    line-height: 1;
    margin-bottom: 20px;
  }

  .dl ul {
    margin: 0;
  }
</style>
