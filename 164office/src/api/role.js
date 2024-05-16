import request from '../utils/request'

export function getAllRole(){
    return request({
        method: 'GET',
        url: '/role/getAllRole',
    })
}

export function saveRole(params){
    return request({
        method: 'POST',
        url: '/role/saveRole',
        data: params,
    })
}

export function getRoleMenuTree(params){
    return request({
        method: 'get',
        url: '/role/getRoleMenuTree',
        params: params,
    })
}

export function saveRolePower(params){
    return request({
        method: 'post',
        url: '/role/saveRolePower',
        data: params,
    })
}

export function deleteRolePower(params){
    return request({
        method: 'post',
        url: '/role/deleteRolePower',
        data: params,
    })
}
