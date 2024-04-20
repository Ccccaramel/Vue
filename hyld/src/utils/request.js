import axios from 'axios'
var request = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // baseURL: '/api',
})

request.defaults.retry = 3 // 请求重试次数
request.defaults.retryDelay = 1000 // 请求重试时间间隔
request.defaults.shouldretry = true // 是否重试

// 添加请求拦截器
request.interceptors.request.use(
    config => {
        // 添加 header
        // config.headers['Accept-Language'] = 'zh-CN'
        const token = localStorage.getItem("authorization") // 全局设置接口请求 header 中带 token
        if (config.method === "post") {
            if (!config.data) { // 没有参数时,config.data为null,将其转换为 { }
                config.data = {}
            }
        }
        
        if (token != "undefined" && token != null) { // 如果有token则带上
            config.headers.Authorization = token
        }
        return config
    },
    err => {
        Promise.reject("request.js > " + err)
        console.log("error > "+error)
    }
);

export default request