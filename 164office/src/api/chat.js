import request from '../utils/request'

export function sendMessage(params){
    return request({
        method: 'POST',
        url: '/chat/sendMessage',
        data: params,
    })
}

export function searchChat(params){
    return request({
        method: 'get',
        url: '/chat/searchChat',
        params: params,
    })
}
