import axios from 'axios'

var request = axios.create({
    baseURL: "http://localhost:8090",
    timeout: 6000
})

export default request