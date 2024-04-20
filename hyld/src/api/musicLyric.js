import request from '../utils/request'

export function getMusicLyric(params){
    return request({
        method: 'GET',
        url: '/musicLyric/getMusicLyric',
        params:params
    })
}

export function saveMusicLyric(params){
    return request({
        method: 'post',
        url: '/musicLyric/saveMusicLyric',
        data:params
    })
}