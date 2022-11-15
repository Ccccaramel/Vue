import request from '../utils/request'

export function searchVisitLog(params){
    return request({
        method: 'get',
        url: '/vL/searchVisitLog',
        params:params
    })
}

export function saveVisitLog(params){
    return request({
        method: 'post',
        url: '/vL/sVL',
        data:params
    })
}

export function getStatisticalData(){
    return request({
        method: 'get',
        url: '/vL/getStatisticalData'
    })
}
