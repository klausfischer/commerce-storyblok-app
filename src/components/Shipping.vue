<template>
  <div>
    <h4 class="group__headline">Shipping Rates</h4>
    <el-button @click="addRateGroup">New rate group</el-button>
    <el-collapse v-model="activeRateGroup" class="u__margin-top u__margin-bottom" accordion>
      <el-collapse-item :key="rateIndex" :title="rateGroup.name" :name="rateIndex" v-for="(rateGroup, rateIndex) in tablerates">
        <div v-if="activeRateGroup == rateIndex">
          <el-form-item label="Name">
            <el-input v-model="rateGroup.name"></el-input>
          </el-form-item>

          <el-form-item label="Country">
            <select v-model="rateGroup.country" class="select">
              <option :key="country.id" :value="country.id" v-for="country in countries">{{ country.name }}</option>
            </select>
          </el-form-item>

          <el-form-item label="Maximum weight">
            <el-input v-model="rateGroup.max_weight"></el-input>
          </el-form-item>

          <el-form-item label="Time">
            <el-input v-model="rateGroup.time"></el-input>
          </el-form-item>

          <el-form-item label="Method">
            <el-input v-model="rateGroup.method"></el-input>
          </el-form-item>

          <el-form-item
            v-for="(rate, index) in rateGroup.rates"
            label="Rate"
            :key="index">
            <el-col :span="5">
              <el-input placeholder="From" v-model="rate.from"></el-input>
            </el-col>
            <el-col :span="5">
              <el-input placeholder="Rate" v-model="rate.rate"></el-input>
            </el-col>
            <el-col :span="11">
              <el-button @click.prevent="removeRate(rateIndex, rate)">Delete</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="addRate(rateIndex)">New rate</el-button>
          </el-form-item>
        </div>
      </el-collapse-item>
    </el-collapse>

    <h4 class="group__headline">Shipping Discounts</h4>
    <el-button @click="addDiscount">New discount</el-button>
    <el-collapse v-model="activeDiscount" class="u__margin-top u__margin-bottom" accordion>
      <el-collapse-item :key="ruleIndex" :title="rule.name" :name="ruleIndex" v-for="(rule, ruleIndex) in shiprules">
        <div v-if="activeDiscount == ruleIndex">
          <el-form-item label="Name">
            <el-input v-model="rule.name"></el-input>
          </el-form-item>

          <el-form-item label="Discountend shipping value">
            <el-input v-model="rule.discounted_shipping"></el-input>
          </el-form-item>

          <el-form-item label="Minimum order value">
            <el-input v-model="rule.free_shipping"></el-input>
          </el-form-item>

          <el-form-item
            v-for="(loc, index) in rule.location"
            label="Location"
            :key="index"
            :rules="{
              required: true, message: 'location can not be null', trigger: 'blur'
            }">
            <el-col :span="11">
              <select v-model="loc.country" class="select">
                <option :key="country.id" :value="country.id" v-for="country in countries">{{ country.name }}</option>
              </select>
            </el-col>
            <el-col :span="11">
              <el-button @click.prevent="removeLocation(ruleIndex, loc)">Delete</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="addLocation(ruleIndex)">New location</el-button>
          </el-form-item>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import api from '../libs/api'

  export default {
    props: ['settings', 'rootConfig'],

    data () {
      return {
        activeRateGroup: '-1',
        activeDiscount: '-1',
        shiprules: [],
        tablerates: [],
        countries: []
      }
    },

    created () {
      this.loadCountries()
      this.setShipRules()
      this.setTableRates()
    },

    watch: {
      settings () {
        this.loadCountries()
        this.setShipRules()
        this.setTableRates()
      }
    },

    methods: {
      loadCountries () {
        let countries = this.$resource(
          this.rootConfig.endPoint + '/countries/{id}', {}, {}, {headers: this.rootConfig.headers})

        countries.get()
          .then((res) => {
            this.countries = res.data
          })
          .catch(api.errorHandler)
      },
      setTableRates () {
        let settings = this.settings.filter((item) => {
          return item.code === 'table_rate' && item.setting_key === 'rates'
        })

        if (settings.length) {
          this.tablerates = JSON.parse(settings[0].setting)
        } else {
          this.tablerates = []
        }
      },
      setShipRules () {
        let settings = this.settings.filter((item) => {
          return item.code === 'shiprules'
        })

        if (settings.length) {
          this.shiprules = JSON.parse(settings[0].setting)
        } else {
          this.shiprules = []
        }
      },
      removeLocation (ruleIndex, item) {
        var index = this.shiprules[ruleIndex].location.indexOf(item)
        if (index !== -1) {
          this.shiprules[ruleIndex].location.splice(index, 1)
        }
      },
      addLocation (ruleIndex) {
        this.shiprules[ruleIndex].location.push({
          key: Date.now(),
          value: ''
        })
      },
      addRateGroup () {
        this.tablerates.unshift({
          name: 'Shipping method name',
          country: '',
          max_weight: '',
          time: '',
          method: '',
          rates: [
            {from: '0', rate: '0'}
          ]
        })
      },
      removeRate (rateIndex, item) {
        var index = this.tablerates[rateIndex].rates.indexOf(item)
        if (index !== -1) {
          this.tablerates[rateIndex].rates.splice(index, 1)
        }
      },
      addRate (rateIndex) {
        this.tablerates[rateIndex].rates.push({
          from: '0',
          rate: '0'
        })
      },
      addDiscount () {
        this.shiprules.unshift({
          name: 'Rulename',
          discounted_shipping: '0',
          free_shipping: '0',
          location: []
        })
      }
    }
  }
</script>

<style scoped>
  .select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTYiIHZpZXdCb3g9I…9uIGZpbGw9IiM2NjYiIHBvaW50cz0iMTIgMTMgOSA4IDE1IDgiPjwvcG9seWdvbj48L3N2Zz4=);
    background-repeat: no-repeat;
    background-position: 100% 50%;
    border: 1px solid #ddd;
    background-color: #FFF;
    padding: 0 55px 0 15px;
    box-sizing: border-box;
    margin: 0;
    width: 100%;
    border-radius: 5px;
    font: inherit;
    color: #000;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }
</style>
