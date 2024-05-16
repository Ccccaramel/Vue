import request from '../utils/request'

// 箭头函数
// export const userLogin = params => request('post','/user/userLogin',params)
// export const userLogin=function(params){
//     return request('post','/user/userLogin',params)
// }

export function searchPlayerInfo(params){
    return request({
        method: 'get',
        url: '/player/searchPlayerInfo',
        params: params,
    })
}

export function updatePlayer(params){
    return request({
        method: 'post',
        url: '/player/updatePlayer',
        data: params,
    })
}