import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
  baseURL () {
    return process.env.BASE_URL
  }

  request (config) {
    return this.$http.request(config)
  }
}
