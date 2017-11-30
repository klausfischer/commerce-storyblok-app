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
              options: [{
                resource: 'products/{id}',
                multiple: false,
                searchKey: 'sku'
              }]
            },
            {
              component: 'v-crud-boolean',
              label: 'Approved',
              name: 'approved'
            },
            {
              component: 'el-input',
              type: 'textarea',
              label: 'Message',
              name: 'message'
            },
            {
              component: 'el-input',
              label: 'Firstname',
              name: 'firstname'
            },
            {
              component: 'el-input',
              label: 'Lastname',
              name: 'lastname'
            },
            {
              component: 'v-crud-remote-select',
              label: 'Customer',
              name: 'customer_id',
              options: [{
                resource: 'customers/{id}',
                multiple: false,
                searchKey: 'email'
              }]
            },
            {
              component: 'el-input',
              label: 'Rating',
              name: 'rating_total'
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
          label: 'Name',
          property: 'firstname'
        },
        {
          component: 'simple-text',
          label: 'Rating',
          property: 'rating_total'
        },
        {
          component: 'boolean',
          label: 'Approved',
          property: 'approved'
        }
      ]
    }
  ],
  customers: [
    {
      component: 'v-crud',
      resource: 'customers/{id}',
      route: 'customers',
      exportable: true,
      hideCreate: true,
      name: 'Customers',
      formFields: [
        {
          component: 'el-tab',
          label: 'Details',
          fields: [
            {
              component: 'el-input',
              label: 'Firstname',
              name: 'firstname'
            },
            {
              component: 'el-input',
              label: 'Lastname',
              name: 'lastname'
            },
            {
              component: 'el-input',
              label: 'Company',
              name: 'company'
            },
            {
              component: 'el-input',
              label: 'Email',
              name: 'email'
            },
            {
              component: 'v-crud-remote-select',
              label: 'Origin',
              name: 'origin_id',
              options: [{
                resource: 'origins/{id}',
                multiple: false,
                searchKey: 'name'
              }]
            }
          ]
        }
      ],
      columns: [
        {
          component: 'simple-text',
          label: 'Email',
          property: 'email'
        },
        {
          component: 'simple-text',
          label: 'Firstname',
          property: 'firstname'
        },
        {
          component: 'simple-text',
          label: 'Lastname',
          property: 'lastname'
        },
        {
          component: 'simple-text',
          label: 'Company',
          property: 'company'
        }
      ]
    },
    {
      component: 'v-crud',
      resource: 'customer_groups/{id}',
      route: 'customer_groups',
      name: 'Customer Groups',
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
              label: 'Access code',
              name: 'access_code'
            },
            {
              component: 'v-crud-remote-select',
              label: 'Pricelist',
              name: 'pricelist_id',
              options: [{
                resource: 'pricelists/{id}',
                multiple: false,
                searchKey: 'name'
              }]
            },
            {
              component: 'v-crud-remote-select',
              label: 'Category',
              name: 'category_id',
              options: [{
                resource: 'categories/{id}',
                multiple: false,
                searchKey: 'name'
              }]
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
      resource: 'prices/{id}',
      route: 'prices',
      import: 'prices',
      name: 'Prices',
      formFields: [
        {
          component: 'el-tab',
          label: 'Details',
          fields: [
            {
              component: 'v-crud-remote-select',
              label: 'Product',
              name: 'product_id',
              options: [{
                resource: 'products/{id}',
                multiple: false,
                searchKey: 'sku'
              }]
            },
            {
              component: 'el-input',
              label: 'Price',
              name: 'price'
            },
            {
              component: 'el-input',
              label: 'Saleprice',
              name: 'saleprice'
            },
            {
              component: 'el-input',
              label: 'Currency',
              name: 'currency'
            },
            {
              component: 'v-crud-remote-select',
              label: 'Pricelist',
              name: 'pricelist_id',
              options: [{
                resource: 'pricelists/{id}',
                multiple: false,
                searchKey: 'name'
              }]
            }
          ]
        }
      ],
      columns: [
        {
          component: 'simple-text',
          label: 'Product ID',
          property: 'product_id'
        },
        {
          component: 'simple-text',
          label: 'Pricelist',
          property: 'pricelist_id'
        },
        {
          component: 'simple-text',
          label: 'Currency',
          property: 'currency'
        },
        {
          component: 'simple-text',
          label: 'Price',
          property: 'price'
        },
        {
          component: 'simple-text',
          label: 'Saleprice',
          property: 'saleprice'
        }
      ]
    }
  ],
  import: [
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
              component: 'el-input',
              label: 'SKU',
              name: 'sku'
            },
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
          label: 'SKU',
          property: 'sku'
        },
        {
          component: 'simple-text',
          label: 'Name',
          property: 'name'
        }
      ]
    },
    {
      component: 'v-crud',
      resource: 'assets/{id}',
      import: 'assets',
      route: 'assets',
      hideCreate: true,
      name: 'Assets',
      formFields: [
        {
          component: 'el-tab',
          label: 'Details',
          fields: [
            {
              component: 'v-crud-image',
              label: 'Filename',
              name: 'filename'
            }
          ]
        }
      ],
      columns: [
        {
          component: 'simple-text',
          label: 'Filename',
          property: 'filename'
        }
      ]
    }
  ],
  settings: [
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
              options: [{
                resource: 'countries/{id}',
                multiple: false
              }]
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
        },
        {
          component: 'el-tab',
          label: 'Preview',
          fields: [
            {
              component: 'v-crud-mail-preview',
              name: 'trigger',
              label: 'Preview'
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
      resource: 'origins/{id}',
      route: 'origins',
      name: 'Origins',
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
              label: 'Owner email',
              name: 'email'
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
      resource: 'settings/{id}',
      route: 'settings',
      name: 'All Settings',
      formFields: [
        {
          component: 'el-tab',
          label: 'Details',
          fields: [
            {
              component: 'el-input',
              label: 'Group',
              name: 'code'
            },
            {
              component: 'el-input',
              label: 'Setting key',
              name: 'setting_key'
            },
            {
              component: 'el-input',
              label: 'Setting',
              name: 'setting'
            }
          ]
        }
      ],
      columns: [
        {
          component: 'simple-text',
          label: 'Group',
          property: 'code'
        },
        {
          component: 'simple-text',
          label: 'Setting key',
          property: 'setting_key'
        }
      ]
    }
  ]
}
