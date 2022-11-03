import request from '../utils/request'

export function searchGear(params){
    return request({
        method: 'get',
        url: '/gear/searchGear',
        params:params
    })
}

export function saveGear(params){
    return request({
        method: 'post',
        url: '/gear/saveGear',
        data:params
    })
}