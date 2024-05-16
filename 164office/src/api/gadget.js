import request from '../utils/request'

export function searchGadget(params){
    return request({
        method: 'get',
        url: '/gadget/searchGadget',
        params:params
    })
}

export function saveGadget(params){
    return request({
        method: 'post',
        url: '/gadget/saveGadget',
        data:params
    })
}