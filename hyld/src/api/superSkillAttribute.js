import request from '../utils/request'

export function searchSuperSkillAttribute(params){
    return request({
        method: 'get',
        url: '/superSkillAttribute/searchSuperSkillAttribute',
        params:params
    })
}

export function saveSuperSkillAttribute(params){
    return request({
        method: 'post',
        url: '/superSkillAttribute/saveSuperSkillAttribute',
        data:params
    })
}

export function deleteSuperSkillAttribute(params){
    return request({
        method: 'post',
        url: '/superSkillAttribute/deleteSuperSkillAttribute',
        data:params
    })
}