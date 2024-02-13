import Vue from 'vue'
import settings from './toast.vue'
let ToastConstructor = Vue.extend(settings)
let Toast = function (msg = '', obj = {}) {
  let instance = new ToastConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
  instance.config = Object.assign(instance.config, obj)
  instance.show(msg)
}
export default Toast
