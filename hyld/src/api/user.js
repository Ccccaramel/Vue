import request from '../utils/request'

// 箭头函数
// export const userLogin = params => request('post','/user/userLogin',params)
// export const userLogin=function(params){
//     return request('post','/user/userLogin',params)
// }

export function test(){
    return request({
        method: 'get',
        url:'/user/test1'
    })
} 

export function register(params){
    return request({
        method: 'post',
        url: '/user/register',
        data: params,
    })
}

export function login(params){
    return request({
        method: 'POST',
        url: '/user/login',
        params: params,
    })
}

export function qqLogin(params){
    return request({
        method: 'POST',
        url: '/user/qqLogin',
        params: params,
    })
}

export function logout(){
    return request({
        method: 'POST',
        url:'/user/logout',
    })
} 

export function getCurrentUserInfo(){
    return request({
        method: 'get',
        url: '/user/getCurrentUserInfo',
    })
}

export function updateUserInfo(params){
    return request({
        method: 'post',
        url: '/user/updateUserInfo',
        data: params
    })
}

export function searchUser(params){
    return request({
        method: 'get',
        url: '/user/searchUser',
        params: params
    })
}

export function saveUser(params){
    return request({
        method: 'post',
        url: '/user/saveUser',
        data: params
    })
}

export function checkToken(params){
    return request({
        method: 'get',
        url: '/user/checkToken',
    })
}

export function saveUserPassword(params){
    return request({
        method: 'post',
        url: '/user/saveUserPassword',
        data: params
    })
}

export function saveHeadPortrait(params){
    return request({
        method: 'post',
        url: '/user/saveHeadPortrait',
        data: params
    })
}

export function bindEmail(params){
    return request({
        method: 'post',
        url: '/user/bindEmail',
        data: params
    })
}

export function unbindEmail(){
    return request({
        method: 'post',
        url: '/user/unbindEmail'
    })
}

export function updatePassword(params){
    return request({
        method: 'post',
        url: '/user/updatePassword',
        data: params
    })
}