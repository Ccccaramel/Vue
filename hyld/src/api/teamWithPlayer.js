import request from '../utils/request'

export function changeTeamMemberStatus(params){
    return request({
        method: 'POST',
        url:'/teamWithPlayer/changeTeamMemberStatus',
        data: params
    })
}

export function addNewTeamMember(params){
    return request({
        method: 'POST',
        url:'/teamWithPlayer/addNewTeamMember',
        data: params
    })
}

export function getAllValidTeamMember(params){
    return request({
        method: 'GET',
        url: '/teamWithPlayer/getAllValidTeamMember',
        params:params
    })
}

export function searchTeamMember(params){
    return request({
        method: 'GET',
        url: '/teamWithPlayer/searchTeamMember',
        params: params
    })
}

