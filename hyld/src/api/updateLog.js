import request from '../utils/request'

export function searchUpdateLog(params){
    return request({
        method: 'get',
        url: '/updateLog/searchUpdateLog',
        params:params
    })
}

export function saveUpdateLog(params){
    return request({
        method: 'post',
        url: '/updateLog/saveUpdateLog',
        data:params
    })
}