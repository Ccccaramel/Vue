import request from '../utils/request'

export function getMyRelationship(){
    return request({
        method: 'GET',
        url: '/relationship/getMyRelationship',
    })
}

export function getMyApplicationList(){
    return request({
        method: 'GET',
        url: '/relationship/getMyApplicationList',
    })
}


export function addRelationship(params){
    return request({
        method: 'POST',
        url: '/relationship/addRelationship',
        data: params,
    })
}

export function deleteRelationship(params){
    return request({
        method: 'POST',
        url: '/relationship/deleteRelationship',
        data: params,
    })
}

export function revoke(params){
    return request({
        method: 'POST',
        url: '/relationship/revoke',
        data: params,
    })
}

export function refuse(params){
    return request({
        method: 'POST',
        url: '/relationship/refuse',
        data: params,
    })
}

export function agree(params){
    return request({
        method: 'POST',
        url: '/relationship/agree',
        data: params,
    })
}