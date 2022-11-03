import request from '../utils/request'

export function searchPointer(params){
    return request({
        method: 'get',
        url: '/pointer/searchPointer',
        params:params
    })
}

export function savePointer(params){
    return request({
        method: 'post',
        url: '/pointer/savePointer',
        data:params
    })
}

export function replyPointer(params){
    return request({
        method: 'post',
        url: '/pointer/replyPointer',
        data:params
    })
}

export function deletePointer(params){
    return request({
        method: 'post',
        url: '/pointer/deletePointer',
        data:params
    })
}

export function returnPointer(params){
    return request({
        method: 'post',
        url: '/pointer/returnPointer',
        data:params
    })
} 