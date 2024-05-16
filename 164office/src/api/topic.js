import request from '../utils/request'

export function searchTopic(params){
    return request({
        method: 'get',
        url: '/topic/searchTopic',
        params:params
    })
}

export function searchMyTopic(params){
    return request({
        method: 'get',
        url: '/topic/searchMyTopic',
        params:params
    })
}

export function getTopicReply(params){
    return request({
        method: 'get',
        url: '/topic/getTopicReply',
        params:params
    })
}

export function getTopicData(params){
    return request({
        method: 'get',
        url: '/topic/getTopicData',
        params:params
    })
}

export function saveTopic(params){
    return request({
        method: 'post',
        url: '/topic/saveTopic',
        data:params
    })
}

export function saveReplyTopicInfo(params){
    return request({
        method: 'post',
        url: '/topic/saveReplyTopicInfo',
        data:params
    })
}

export function deleteTopic(params){
    return request({
        method: 'post',
        url: '/topic/deleteTopic',
        data:params
    })
}

export function frozenTopic(params){
    return request({
        method: 'post',
        url: '/topic/frozenTopic',
        data:params
    })
}

export function returnTopic(params){
    return request({
        method: 'post',
        url: '/topic/returnTopic',
        data:params
    })
}

export function searchReplyMe(params){
    return request({
        method: 'get',
        url: '/topic/searchReplyMe',
        params:params
    })
}