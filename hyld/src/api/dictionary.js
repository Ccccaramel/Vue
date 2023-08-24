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
export function getTeamMemberStatusType(){
    return request({
        method: 'get',
        url:'/dictionary/getTeamMemberStatusType',
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
export function getTeamType(){
    return request({
        method: 'GET',
        url: '/dictionary/getTeamType',
    })
}

export function getMenuNoteType(){
    return request({
        method: 'get',
        url: '/dictionary/getMenuNoteType',
    })
}

export function deleteDictionary(params){
    return request({
        method: 'get',
        url: '/dictionary/deleteDictionary',
        params: params,
    })
}

export function getUserType(){
    return request({
        method: 'get',
        url: '/dictionary/getUserType',
    })
}

export function getUserStatus(){
    return request({
        method: 'get',
        url: '/dictionary/getUserStatus',
    })
}

export function getplayerPositionType(){
    return request({
        method: 'get',
        url: '/dictionary/getplayerPositionType',
    })
}
export function getTeamMemberPositionTypeExcludeViceCaptain(){
    return request({
        method: 'get',
        url: '/dictionary/getTeamMemberPositionTypeExcludeViceCaptain',
    })
}
export function getPlayerType(){
    return request({
        method: 'get',
        url: '/dictionary/getPlayerType',
    })
}

export function getCheckStatus(){
    return request({
        method: 'get',
        url: '/dictionary/getCheckStatus',
    })
}

export function getRelationStatus(){
    return request({
        method: 'get',
        url: '/dictionary/getRelationStatus',
    })
}

export function getGameRoleRarity(){
    return request({
        method: 'get',
        url: '/dictionary/getGameRoleRarity',
    })
}

export function getGameRolePosition(){
    return request({
        method: 'get',
        url: '/dictionary/getGameRolePosition',
    })
}

export function getGearRarity(){
    return request({
        method: 'get',
        url: '/dictionary/getGearRarity',
    })
}

export function getBlogPower(){
    return request({
        method: 'get',
        url: '/dictionary/getBlogPower',
    })
}

export function getBlogType(){
    return request({
        method: 'get',
        url: '/dictionary/getBlogType',
    })
}

export function getBillType(){
    return request({
        method: 'get',
        url: '/dictionary/getBillType',
    })
}

export function getBillWeight(){
    return request({
        method: 'get',
        url: '/dictionary/getBillWeight',
    })
}

export function getCurrencyType(){
    return request({
        method: 'get',
        url: '/dictionary/getCurrencyType',
    })
}

export function getBillStatus(){
    return request({
        method: 'get',
        url: '/dictionary/getBillStatus',
    })
}