import request from '../utils/request'

export function saveTeamRelationInfo(params){
    return request({
        method: 'post',
        url:'/userWithTeam/saveTeamRelationInfo',
        data:params
    })
}

export function relieveTeam(params){
    return request({
        method: 'post',
        url:'/userWithTeam/relieveTeam',
        params:params
    })
}

export function searchMyTeam(params){
    return request({
        method: 'get',
        url:'/userWithTeam/searchMyTeam',
        params:params
    })
}

export function searchMyRelationTeam(params){
    return request({
        method: 'get',
        url:'/userWithTeam/searchMyRelationTeam',
        params:params
    })
}

export function searchAllTeam(params){
    return request({
        method: 'get',
        url:'/userWithTeam/searchAllTeam',
        params:params
    })
}

export function teamExamineCheck(params){
    return request({
        method: 'post',
        url:'/userWithTeam/teamExamineCheck',
        data:params
    })
}

export function searchTeamRelation(params){
    return request({
        method: 'get',
        url: '/userWithTeam/searchTeamRelation',
        params:params
    })
}

export function saveTeamCheckData(params){
    return request({
        method: 'post',
        url: '/userWithTeam/saveTeamCheckData',
        data:params
    })
}

export function getAllViceCaptain(params){
    return request({
        method: 'get',
        url: '/userWithTeam/getAllViceCaptain',
        params:params
    })
}

export function addViceCaptain(params){
    return request({
        method: 'post',
        url: '/userWithTeam/addViceCaptain',
        data:params
    })
}

export function searchValidTeamInfo(params){
    return request({
        method: 'GET',
        url: '/userWithTeam/searchValidTeamInfo',
        params: params,
    })
}

export function teamTransfer(params){
    return request({
        method: 'POST',
        url: '/userWithTeam/teamTransfer',
        data: params,
    })
}

export function teamCreditScoreSave(params){
    return request({
        method: 'POST',
        url: '/userWithTeam/teamCreditScoreSave',
        data: params,
    })
}
