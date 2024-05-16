import request from '../utils/request'

export function searchSystemConfig(params){
    return request({
        method: 'get',
        url: '/systemConfig/searchSystemConfig',
        params:params
    })
}

export function saveSystemConfig(params){
    return request({
        method: 'post',
        url: '/systemConfig/saveSystemConfig',
        data:params
    })
}

export function getCommunityNotice(){
    return request({
        method: 'get',
        url: '/systemConfig/getCommunityNotice',
    })
}

export function getHomeNotice(){
    return request({
        method: 'get',
        url: '/systemConfig/getHomeNotice',
    })
}