import Vue from 'vue'
import settings from './confirm.vue'
let ConfirmConstructor = Vue.extend(settings)
let Confirm = function (obj = {}) {
  return new Promise((resolve, reject) => {
    let instance = new ConfirmConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(instance.$el)
    instance.config = Object.assign(instance.config, obj)
    instance.isShow = true
    instance.onConfirm = () => {
      instance.isShow = false
      resolve()
    }
    instance.onCancel = () => {
      instance.isShow = false
      reject(new Error('cancel'))
    }
  })
}
export default Confirm
