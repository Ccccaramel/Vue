import request from '../utils/request'

export function getMenuTree(){
    return request({
        method: 'GET',
        url: '/menu/getMenuTree',
    })
}

export function saveMenu(params){
    return request({
        method: 'POST',
        url: '/menu/saveMenu',
        data: params,
    })
}