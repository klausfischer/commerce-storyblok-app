export default {
  default: [
    {
      component: 'v-crud',
      resource: 'orders/{id}',
      route: 'orders',
      name: 'Orders',
      hideCreate: true,
      hideActionBar: true,
      formFields: [
        {
          component: 'order',
          label: 'General',
          fields: [],
          body: [
            {
              component: 'order'
            }
          ]
        }
      ],
      columns: [
        {
          component: 'simple-text',
          label: 'Ordernumber',
          property: 'order_number'
        },
        {
          component: 'simple-text',
          label: 'Status',
          property: 'status'
        },
        {
          component: 'date-time',
          label: 'Ordered on',
          property: 'ordered_on'
        },
        {
          component: 'simple-text',
          label: 'Currency',
          property: 'currency'
        },
        {
          component: 'currency',
          label: 'Total',
          property: 'total'
        }
      ]
    },
    {
      component: 'v-crud',
      resource: 'products/{id}',
      import: 'products',
      route: 'products',
      name: 'Products',
      formFields: [
        {
          component: 'el-tab',
          label: 'Details',
          fields: [
            {
              component: 'el-checkbox',
              label: 'Enabled',
              name: 'enabled'
            },
            {
              component: 'el-input',
              label: 'Name',
              name: 'name'
            },
            {
              component: 'el-input',
              label: 'SKU',
              name: 'sku'
            },
            {
              component: 'el-input',
              label: 'Excerpt',
              type: 'textarea',
              name: 'excerpt'
            },
            {
              component: 'el-input',
              label: 'Description',
              type: 'textarea',
              name: 'description'
            }
          ]
        },
        {
          component: 'el-tab',
          label: 'Prices',
          fields: [
            {
              component: 'el-input',
              label: 'Price',
              name: 'price'
            },
            {
              component: 'el-input',
              label: 'Saleprice',
              name: 'saleprice'
            }
          ]
        },
        {
          component: 'el-tab',
          label: 'Images',
          fields: [
            {
              component: 'v-crud-image-upload',
              label: 'Images',
              name: 'images'
            }
          ]
        }
      ],
      columns: [
        {
          component: 'simple-text',
          label: 'SKU',
          property: 'sku'
        },
        {
          component: 'simple-text',
          label: 'Name',
          property: 'name'
        },
        {
          component: 'simple-text',
          label: 'Quantity',
          property: 'quantity'
        },
        {
          component: 'currency',
          label: 'Price',
          property: 'price'
        },
        {
          component: 'boolean',
          label: 'Enabled',
          property: 'enabled'
        }
      ]
    },
    {
      component: 'settings',
      resource: 'settings/{id}',
      route: 'settings',
      name: 'Shop Config'
    }
  ],
  catalogue: [
    {
      component: 'v-crud',
      resource: 'testimonials/{id}',
      route: 'testimonials',
      name: 'Testimonials',
      formFields: [
        {
          component: 'el-tab',
          label: 'Details',
          fields: [
            {
              component: 'v-crud-remote-select',
              label: 'Product',
              name: 'product_id',
              options: {
                resource: 'products/{id}',
                multiple: false
              }
            },
            {
              component: 'v-crud-boolean',
              label: 'approved',
              name: 'approved'
            },
            {
              component: 'el-input',
              label: 'message',
              name: 'message'
            },
            {
              component: 'el-input',
              label: 'firstname',
              name: 'firstname'
            },
            {
              component: 'el-input',
              label: 'lastname',
              name: 'lastname'
            },
            {
              component: 'el-input',
              label: 'city',
              name: 'city'
            },
            {
              component: 'el-input',
              label: 'country',
              name: 'country'
            },
            {
              component: 'el-input',
              label: 'sex',
              name: 'sex'
            },
            {
              component: 'v-crud-remote-select',
              label: 'Customer',
              name: 'customer_id',
              options: {
                resource: 'customers/{id}',
                multiple: false,
                searchKey: 'email'
              }
            },
            {
              component: 'el-input',
              label: 'private_message',
              name: 'private_message'
            },
            {
              component: 'el-input',
              label: 'rating_look',
              name: 'rating_look'
            },
            {
              component: 'el-input',
              label: 'rating_usability',
              name: 'rating_usability'
            },
            {
              component: 'el-input',
              label: 'rating_support',
              name: 'rating_support'
            },
            {
              component: 'el-input',
              label: 'rating_total',
              name: 'rating_total'
            },
            {
              component: 'v-crud-boolean',
              label: 'stared',
              name: 'stared'
            }
          ]
        }
      ],
      columns: [
        {
          component: 'date-time',
          label: 'Created at',
          property: 'created_at'
        },
        {
          component: 'simple-text',
          label: 'Rating',
          property: 'rating_total'
        }
      ]
    }
  ],
  settings: [
    {
      component: 'v-crud',
      resource: 'pricelists/{id}',
      route: 'pricelists',
      name: 'Pricelists',
      formFields: [
        {
          component: 'el-tab',
          label: 'Details',
          fields: [
            {
              component: 'el-input',
              label: 'Name',
              name: 'name'
            }
          ]
        }
      ],
      columns: [
        {
          component: 'simple-text',
          label: 'Name',
          property: 'name'
        }
      ]
    },
    {
      component: 'v-crud',
      resource: 'canned_messages/{id}',
      route: 'canned_messages',
      name: 'Emails',
      formFields: [
        {
          component: 'el-tab',
          label: 'Details',
          fields: [
            {
              component: 'el-input',
              label: 'Name',
              name: 'name'
            },
            {
              component: 'el-input',
              label: 'Subject',
              name: 'subject'
            },
            {
              component: 'el-input',
              label: 'Trigger',
              name: 'trigger'
            },
            {
              component: 'el-input',
              label: 'Body',
              type: 'textarea',
              name: 'content'
            }
          ]
        }
      ],
      columns: [
        {
          component: 'simple-text',
          label: 'Name',
          property: 'name'
        }
      ]
    },
    {
      component: 'v-crud',
      resource: 'site_countries/{id}',
      route: 'site_countries',
      name: 'Countries',
      formFields: [
        {
          component: 'el-tab',
          label: 'Details',
          fields: [
            {
              component: 'v-crud-remote-select',
              label: 'Country ID',
              name: 'country_id',
              options: {
                resource: 'countries/{id}',
                multiple: false
              }
            },
            {
              component: 'v-crud-boolean',
              label: 'Status',
              name: 'status'
            },
            {
              component: 'el-input',
              label: 'Tax Rate',
              name: 'tax'
            }
          ]
        }
      ],
      columns: [
        {
          component: 'simple-text',
          label: 'Name',
          property: 'name'
        }
      ]
    }
  ]
}
