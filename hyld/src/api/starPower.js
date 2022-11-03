import request from '../utils/request'

export function searchStarPower(params){
    return request({
        method: 'get',
        url: '/starPower/searchStarPower',
        params:params
    })
}

export function saveStarPower(params){
    return request({
        method: 'post',
        url: '/starPower/saveStarPower',
        data:params
    })
}