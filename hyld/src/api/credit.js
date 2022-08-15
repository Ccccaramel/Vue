import request from '../utils/request'

export function getTeamMemberScoreboard(params){
    return request({
        method: 'GET',
        url: '/credit/getTeamMemberScoreboard',
        params: params
    })
}

export function searchTeamMemberCredit(params){
    return request({
        method: 'GET',
        url: '/credit/searchTeamMemberCredit',
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
