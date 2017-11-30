<template>
  <div>
    <h2>
      #{{ model.order_number }}
      <small class="order__time">{{ model.ordered_on | datetime }}</small>
    </h2>

    <el-row :gutter="30">
      <el-col :xs="24" :sm="16">
        <div v-if="hasSku">
          <el-table
            :data="model.order_items"
            stripe
            style="width: 100%">
            <el-table-column
              prop="meta_data"
              label="Image">
              <template scope="scope">
                <div v-if="scope.row.meta_data">
                  <img :src="scope.row.meta_data.image" width="40">
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="sku"
              label="SKU"
              width="180">
            </el-table-column>
            <el-table-column
              prop="price"
              label="Price">
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="Quantity"
              width="180">
            </el-table-column>
            <el-table-column
              prop="total_price"
              label="Total"
              width="180">
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          <el-table
            :data="model.order_items"
            stripe
            style="width: 100%">
            <el-table-column
              prop="meta_data"
              label="Product Info">
              <template scope="scope">
                <div v-if="scope.row.contents">
                  {{ scope.row.contents.sku }} - {{ scope.row.contents.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="Price">
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="Quantity"
              width="180">
            </el-table-column>
            <el-table-column
              prop="total_price"
              label="Total"
              width="180">
            </el-table-column>

            <div slot="append">
              test
            </div>
          </el-table>
        </div>

        <div class="el-table">
          <div class="el-table__footer-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__footer">
              <tbody>
                <tr>
                  <td class="is-leaf">
                    <div class="cell text-right">Subtotal</div>
                  </td>
                  <td class="is-leaf" width="180">
                    <div class="cell">{{ model.subtotal | currency(model.currency + ' ') }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="is-leaf">
                    <div class="cell text-right">Shipping</div>
                  </td>
                  <td class="is-leaf" width="180">
                    <div class="cell">{{ model.shipping | currency(model.currency + ' ') }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="is-leaf">
                    <div class="cell text-right">Coupon discount</div>
                  </td>
                  <td class="is-leaf" width="180">
                    <div class="cell">{{ model.coupon_discount | currency(model.currency + ' ') }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="is-leaf">
                    <div class="cell text-right">Tax</div>
                  </td>
                  <td class="is-leaf" width="180">
                    <div class="cell">{{ model.tax | currency(model.currency + ' ') }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="is-leaf">
                    <div class="cell text-right">Total</div>
                  </td>
                  <td class="is-leaf" width="180">
                    <div class="cell">{{ model.total | currency(model.currency + ' ') }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

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
          <dd>
            <v-crud-select :options="statuses" :value="model.status" @input="value => { model.status = value }"></v-crud-select>
            <el-button type="primary" @click="save">Save</el-button>
          </dd>
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

import Select from './fields/Select.vue'
import api from '../libs/api'

export default {
  name: 'order_detail',
  props: ['model'],

  data () {
    return {
      statuses: [
        {value: 'Open', label: 'Open'},
        {value: 'Pending', label: 'Pending'},
        {value: 'Processing', label: 'Processing'},
        {value: 'Shipped', label: 'Shipped'},
        {value: 'On Hold', label: 'On Hold'},
        {value: 'Cancelled', label: 'Cancelled'},
        {value: 'Not Payed', label: 'Not Payed'},
        {value: 'Returned', label: 'Returned'},
        {value: 'Delivered', label: 'Delivered'}
      ]
    }
  },

  components: {
    'v-crud-select': Select
  },

  computed: {
    hasSku () {
      if (this.model && this.model.order_items && this.model.order_items[0].sku !== null) {
        return true
      }
      return false
    }
  },

  created () {

  },

  methods: {
    save () {
      api.res
        .update({id: this.model.id}, this.model)
        .then(() => {
          this.$message('Updated successfully')
        })
        .catch(api.errorHandler)
    }
  }
}
</script>

<style scoped>
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

  .text-right {
    text-align: right;
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

  .el-table table {
    width: 100%;
  }
</style>
