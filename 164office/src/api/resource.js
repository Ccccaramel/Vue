import request from '../utils/request'

export function searchResource(params){
    return request({
        method: 'get',
        url: '/resource/searchResource',
        params:params
    })
}

export function saveResource(params){
    return request({
        method: 'post',
        url: '/resource/saveResource',
        data:params
    })
}

export function deleteResource(params){
    return request({
        method: 'post',
        url: '/resource/deleteResource',
        data:params
    })
}
