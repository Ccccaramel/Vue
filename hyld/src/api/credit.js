import request from '../utils/request'

export function getTeamMemberScoreboard(params){
    return request({
        method: 'GET',
        url: '/credit/getTeamMemberScoreboard',
        params: params
    })
}

export function searchCreditBy(params){
    return request({
        method: 'GET',
        url: '/credit/searchCreditBy',
        params: params
    })
}

export function saveTeamMemberCreditInfo(params){
    return request({
        method: 'POST',
        url:'/credit/saveTeamMemberCreditInfo',
        data: params
    })
}

export function batchCreditAddSave(params){
    return request({
        method: 'POST',
        url:'/credit/batchCreditAddSave',
        data: params
    })
}

export function singleCreditAddSave(params){
    return request({
        method: 'POST',
        url:'/credit/singleCreditAddSave',
        data: params
    })
}

export function getTeamMemberAllCreditRecord(params){
    return request({
        method: 'GET',
        url:'/credit/getTeamMemberAllCreditRecord',
        params: params
    })
}

export function getSettlementTimeList(params){
    return request({
        method: 'GET',
        url:'/credit/getSettlementTimeList',
        params: params
    })
}

export function getTeamData(params){
    return request({
        method: 'GET',
        url: '/credit/getTeamData',
        params: params
    })
}

export function getPlayerAllCreditRecord(params){
    return request({
        method: 'GET',
        url: '/credit/getPlayerAllCreditRecord',
        params: params
    })
}