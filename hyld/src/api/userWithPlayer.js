import request from '../utils/request'

// 箭头函数
// export const userLogin = params => request('post','/user/userLogin',params)
// export const userLogin=function(params){
//     return request('post','/user/userLogin',params)
// }


export function searchMyGameAccount(){
    return request({
        method: 'get',
        url: '/userWithPlayer/searchMyGameAccount',
    })
}

export function relievePlayer(params){
    return request({
        method: 'get',
        url: '/userWithPlayer/relievePlayer',
        params: params
    })
}

export function savePlayerCheckData(params){
    return request({
        method: 'post',
        url: '/userWithPlayer/savePlayerCheckData',
        data: params,
    })
}

export function searchPlayerExamine(params){
    return request({
        method: 'get',
        url: '/userWithPlayer/searchPlayerExamine',
        params:params
    })
}

export function playerExamineCheck(params){
    return request({
        method: 'post',
        url: '/userWithPlayer/playerExamineCheck',
        data:params
    })
}