import request from '../utils/request'

export function findLeaveType(){
    return request({
        method: 'get',
        url:'/dictionary/findLeaveType',
    })
}
export function findJoinWayType(){
    return request({
        method: 'get',
        url:'/dictionary/findJoinWayType',
    })
}
export function findCreditType(){
    return request({
        method: 'get',
        url:'/dictionary/findCreditType',
    })
}
export function getTeamCompetitionType(){
    return request({
        method: 'get',
        url:'/dictionary/getTeamCompetitionType',
    })
}
export function getTeamStatusType(){
    return request({
        method: 'get',
        url:'/dictionary/getTeamStatusType',
    })
}
export function searchDictionary(params){
    return request({
        method: 'get',
        url: '/dictionary/searchDictionary',
        params:params
    })
} 
export function saveDictionaryInfo(params){
    return request({
        method: 'POST',
        url: '/dictionary/saveDictionaryInfo',
        data:params
    })
}