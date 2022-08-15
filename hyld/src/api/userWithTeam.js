import request from '../utils/request'

export function saveTeamInfo(params){
    return request({
        method: 'post',
        url:'/userWithTeam/saveTeamInfo',
        data:params
    })
}

export function removeTeam(params){
    return request({
        method: 'post',
        url:'/userWithTeam/removeTeam',
        params:params
    })
}

export function searchTeam(params){
    return request({
        method: 'get',
        url:'/userWithTeam/searchTeam',
        params:params
    })
}
