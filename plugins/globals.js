import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import forOwn from 'lodash/forOwn'

/**
 * Thirdparty Integrations
 */

/**
 * For handling global events
 * @type {Vue}
 */
Vue.prototype.$eventHub = new Vue()
/**
 * [$modal description]
 * @type {Object}
 */
Vue.prototype.$modal = {
  open () {

  }
}

/**
 * Mixins
 */
Vue.mixin({
  data: () => ({
    model: false
  }),
  destroyed () {
    if (typeof this.$options.actions === 'object') {
      this.$root.__actionButton.clear()
    }
  },
  mounted () {
    if (typeof this.$options.actions === 'object') {
      this.$root.__actionButton.init(this.$options.actions.items)
    }
  },
  created () {
    if (typeof this.$options.clone === 'object') {
      this.model = cloneDeep(this[this.$options.clone.key])

      if (this.$options.clone.debug) {
        const p = {}
        forOwn(this.model, (data, key) => {
          p[key] = data
        })
      }
    }
  }
})
