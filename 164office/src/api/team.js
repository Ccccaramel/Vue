import request from '../utils/request'

// export function searchTeamInfo(params){
//     return request({
//         method: 'GET',
//         url: '/team/searchTeamInfo',
//         params: params,
//     })
// }

export function searchAllTeam(params){
    return request({
        method: 'GET',
        url: '/team/searchAllTeam',
        params: params,
    })
}

export function saveTeamInfo(params){
    return request({
        method: 'post',
        url: '/team/saveTeamInfo',
        data: params,
    })
}
