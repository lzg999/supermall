import axios from 'axios'

export function request(config){
    // 1、 创建Axios的实例
    const instance = axios.create({
      // baseURL: 'http://123.207.32.32:8000/api/wh',
      baseURL: 'http://106.54.54.237:8000/api/wh',
      timeout: 5000
    })
    // 2、Axios的拦截器
    // 2.1 请求拦截
    instance.interceptors.request.use(config => {
      return config
    },err => {
      console.log(err)
    })
    // 2.2、响应拦截
    instance.interceptors.response.use( res => {
      return res.data
    }, err => {
      console.log(err)
    })
    // 3、发送真正的网络请求(返回的直接就是个promise对象)
    return instance(config)
}