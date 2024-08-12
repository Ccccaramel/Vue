import request from '../utils/request'

export function searchSuperBag(params){
    return request({
        method: 'get',
        url: '/superBag/searchSuperBag',
        params:params
    })
}

export function saveSuperBag(params){
    return request({
        method: 'post',
        url: '/superBag/saveSuperBag',
        data:params
    })
}

export function deleteSuperBag(params){
    return request({
        method: 'post',
        url: '/superBag/deleteSuperBag',
        data:params
    })
}
