import request from '../utils/request'

export function searchOfficialVersionUpdateLog(params){
    return request({
        method: 'get',
        url: '/officialVersionUpdateLog/searchOfficialVersionUpdateLog',
        params:params
    })
}

export function saveOfficialVersionUpdateLog(params){
    return request({
        method: 'post',
        url: '/officialVersionUpdateLog/saveOfficialVersionUpdateLog',
        data:params
    })
}

export function deleteOfficialVersionUpdateLog(params){
    return request({
        method: 'post',
        url: '/officialVersionUpdateLog/deleteOfficialVersionUpdateLog',
        data:params
    })
}
