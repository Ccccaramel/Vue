import request from '../utils/request'

export function searchNormalAttackAttribute(params){
    return request({
        method: 'get',
        url: '/normalAttackAttribute/searchNormalAttackAttribute',
        params:params
    })
}

export function saveNormalAttackAttribute(params){
    return request({
        method: 'post',
        url: '/normalAttackAttribute/saveNormalAttackAttribute',
        data:params
    })
}

export function deleteNormalAttackAttribute(params){
    return request({
        method: 'post',
        url: '/normalAttackAttribute/deleteNormalAttackAttribute',
        data:params
    })
}