import request from '../utils/request'

export function searchGameRole(params){
    return request({
        method: 'get',
        url: '/gameRole/searchGameRole',
        params:params
    })
}

export function saveGameRole(params){
    return request({
        method: 'post',
        url: '/gameRole/saveGameRole',
        data:params
    })
}

export function getAllGameRole(params){
    return request({
        method: 'get',
        url: '/gameRole/getAllGameRole',
        data:params
    })
}

export function getBasicForm(params){
    return request({
        method: 'get',
        url: '/gameRole/getBasicForm',
        data:params
    })
}

export function searchGameRoleByClass(params){
    return request({
        method: 'get',
        url: '/gameRole/searchGameRoleByClass',
        data:params
    })
}

export function searchGameRoleInfoById(params){
    return request({
        method: 'get',
        url: '/gameRole/searchGameRoleInfoById',
        params:params
    })
}