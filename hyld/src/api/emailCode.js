import request from '../utils/request'

export function searchEmailCode(params){
    return request({
        method: 'get',
        url: '/emailCode/searchEmailCode',
        params:params
    })
}

export function sendEmailCode(params){
    return request({
        method: 'post',
        url: '/emailCode/sendEmailCode',
        data:params
    })
}

export function emailVerify(params){
    return request({
        method: 'post',
        url: '/emailCode/emailVerify',
        data:params
    })
}