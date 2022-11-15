import axios from 'axios'
// var isPro = process.env.NODE_ENV === 'production'
var request = axios.create({
    baseURL: '/api',
    timeout: 6000 // 超时时间6s
})


request.defaults.retry = 3 // 请求重试次数
request.defaults.retryDelay = 1000 // 请求重试时间间隔
request.defaults.shouldretry = true // 是否重试
// request.defaults.baseURL = 'http://10.109.21.63:8090' // 后端地址

// 添加请求拦截器
request.interceptors.request.use(
    config => {
        // 添加 header
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
        // config.headers['Accept-Language'] = 'zh-CN'
        // config.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With,Accept-Language, Content-Type, Accept, Authorization";
        const token = localStorage.getItem("authorization") // 全局设置接口请求 header 中带 token
        if (config.method === "post") {
            if (!config.data) { // 没有参数时,config.data为null,将其转换为 { }
                config.data = {}
            }
        }
        
        if (token != "undefined" && token != null) { // 如果有token则带上
            // config.headers['Authorization'] = token
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