import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'

// axios 配置
// const baseURL = process.env.NODE_ENV === 'production'
//   ? 'https://app.telpaygroup.dev/cdb-app-api/v1/app/'
//   // : '/cdb-app-api/test/app/'
//   : '/cdb-app-api/v1/app/'

const baseURL = 'https://app.telpaygroup.dev/cdb-app-api/v1/'
//const baseURL = 'https://boostdev.telpaygroup.dev/cdb-app-api/v1/'

axios.defaults.timeout = 10000
axios.defaults.baseURL = baseURL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// http request 拦截器
axios.interceptors.request.use(config => {
  if (!config.headers.token && store.state.token) {
    config.headers.token = store.state.token
    config.headers.lang = store.state.lang
  } else {
    console.log('before config', JSON.stringify(config))
  }

  return config
}, function (error) {
  console.log(0, error)
  // 对请求错误做些什么
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(
  resp => {
    if (resp && resp.data && resp.data.code === 401) {
      alert(resp.data.msg)
      store.commit('user', null)
      store.commit('token', '')
      router.replace({
        path: `${store.state.prefix}/login`
      })
    }
    return resp
  },
  error => {
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error)
  }
)

const get = (url, data = {}, success = () => { }, failure = () => { }, config = {}) => {
  console.log('get config', JSON.stringify(config))
  axios.get(url, { params: data, ...config })
    .then(resp => {
      if (resp.data.code === 0) {
        success && success(resp.data)
      } else if (resp.data.code === 403) {
        failure && failure('Insufficient permissions, please consult the administrator')
      } else {
        failure && failure(resp.data.msg)
      }
    })
    .catch((error) => {
      if (window.Raven) {
        window.Raven.captureException(error)
      }
      console.log('get error', error)
      failure && failure('Server error, please try again')
    })
}

const post = (url, data = {}, success = () => { }, failure = () => { }, config = {}) => {
  if (!(config.headers && config.headers['Content-Type'] !== 'application/x-www-form-urlencoded')) {
    data = qs.stringify(data)
  }
  axios.post(url, data, config)
    .then(resp => {
      if (resp.data.code === 0) {
        success && success(resp.data)
      } else if (resp.data.code === 403) {
        failure && failure('Insufficient permissions, please consult the administrator')
      } else {
        failure && failure(resp.data.msg)
      }
    })
    .catch((error) => {
      if (window.Raven) {
        window.Raven.captureException(error)
      }
      console.log('Server error, please try again', error)
      failure && failure('Server error, please try again')
    })
}

export default axios

export {
  get,
  post,
  baseURL
}
