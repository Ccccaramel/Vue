import request from '../utils/request'

export function collectionBlog(params){
    return request({
        method: 'post',
        url: '/blogCollection/collectionBlog',
        data:params
    })
}

export function collectionStatus(params){
    return request({
        method: 'post',
        url: '/blogCollection/collectionStatus',
        data:params
    })
}