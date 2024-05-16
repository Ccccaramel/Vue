import request from '../utils/request'

export function searchMusic(params){
    return request({
        method: 'GET',
        url: '/music/searchMusic',
        params:params
    })
}

export function saveMusic(params){
    return request({
        method: 'POST',
        url: '/music/saveMusic',
        data: params,
    })
}

export function restoreMusic(params){
    return request({
        method: 'POST',
        url: '/music/restoreMusic',
        data: params,
    })
}

export function deleteMusic(params){
    return request({
        method: 'POST',
        url: '/music/deleteMusic',
        data: params,
    })
}

export function getMusic(params){
    return request({
        method: 'GET',
        url: '/music/getMusic',
        params:params
    })
}

