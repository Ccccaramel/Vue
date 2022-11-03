import request from '../utils/request'

export function searchSuperSkill(params){
    return request({
        method: 'get',
        url: '/superSkill/searchSuperSkill',
        params:params
    })
}

export function saveSuperSkill(params){
    return request({
        method: 'post',
        url: '/superSkill/saveSuperSkill',
        data:params
    })
}

export function deleteSuperSkill(params){
    return request({
        method: 'post',
        url: '/superSkill/deleteSuperSkill',
        data:params
    })
}