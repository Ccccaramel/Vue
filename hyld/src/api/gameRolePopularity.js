import request from '../utils/request'

export function saveGameRolePopularity(params){
    return request({
        method: 'post',
        url: '/gameRolePopularity/saveGameRolePopularity',
        data:params
    })
}

export function findByGameRoleId(params){
    return request({
        method: 'get',
        url: '/gameRolePopularity/findByGameRoleId',
        params:params
    })
}

export function searchGameRolePopularity(params){
    return request({
        method: 'get',
        url: '/gameRolePopularity/searchGameRolePopularity',
        params:params
    })
}