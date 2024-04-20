import request from '../utils/request'

export function searchVisitLog(params){
    return request({
        method: 'get',
        url: '/welcome/searchVisitLog',
        params:params
    })
}

export function saveVisitLog(params){
    return request({
        method: 'post',
        url: '/welcome/myHumbleAbode',
        data:params
    })
}

export function getStatisticalData(){
    return request({
        method: 'get',
        url: '/welcome/getStatisticalData'
    })
}
