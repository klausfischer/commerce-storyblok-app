import each from './each'

export default {
  init () {},
  res: null,
  errorHandler (error) {
    const h = this.$createElement
    let errors = []

    if (error.body && error.status !== 500) {
      each(error.body, (item, key) => {
        errors.push(h('div', item))
      })
    } else {
      errors.push(h('div', 'Ops something went wrong'))
    }

    this.$notify.error({
      title: 'Error',
      duration: 6000,
      message: h('div', errors)
    })
  }
}
