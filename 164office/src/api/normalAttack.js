import request from '../utils/request'

export function searchNormalAttack(params){
    return request({
        method: 'get',
        url: '/normalAttack/searchNormalAttack',
        params:params
    })
}

export function saveNormalAttack(params){
    return request({
        method: 'post',
        url: '/normalAttack/saveNormalAttack',
        data:params
    })
}

export function deleteNormalAttack(params){
    return request({
        method: 'post',
        url: '/normalAttack/deleteNormalAttack',
        data:params
    })
}