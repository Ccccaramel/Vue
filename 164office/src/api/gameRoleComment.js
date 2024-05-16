import request from '../utils/request'

export function searchGameRoleComment(params){
    return request({
        method: 'get',
        url: '/gameRoleComment/searchGameRoleComment',
        params:params
    })
}

export function getGameRoleCommentData(params){
    return request({
        method: 'get',
        url: '/gameRoleComment/getGameRoleCommentData',
        params:params
    })
}

export function saveReplyGameRoleCommentInfo(params){
    return request({
        method: 'post',
        url: '/gameRoleComment/saveReplyGameRoleCommentInfo',
        data:params
    })
}

export function getAllGameRoleComment(params){
    return request({
        method: 'get',
        url: '/gameRoleComment/getAllGameRoleComment',
        params:params
    })
}

export function recoveryGameRoleComment(params){
    return request({
        method: 'post',
        url: '/gameRoleComment/recoveryGameRoleComment',
        data:params
    })
}


export function deleteGameRoleComment(params){
    return request({
        method: 'post',
        url: '/gameRoleComment/deleteGameRoleComment',
        data:params
    })
}