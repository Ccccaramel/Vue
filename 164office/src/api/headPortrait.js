import request from '../utils/request'

export function searchHeadPortrait(params){
    return request({
        method: 'get',
        url: '/headPortrait/searchHeadPortrait',
        params:params
    })
}

export function saveHeadPortrait(params){
    return request({
        method: 'post',
        url: '/headPortrait/saveHeadPortrait',
        data:params
    })
}

export function deleteHeadPortrait(params){
    return request({
        method: 'post',
        url: '/headPortrait/deleteHeadPortrait',
        data:params
    })
}
