import request from '../utils/request'

export function saveBill(params){
    return request({
        method: 'post',
        url: '/bill/saveBill',
        data:params
    })
}

export function searchBill(params){
    return request({
        method: 'get',
        url: '/bill/searchBill',
        params:params
    })
}

export function deleteBill(params){
    return request({
        method: 'post',
        url: '/bill/deleteBill',
        data:params
    })
}

export function getBillStatistics(){
    return request({
        method: 'get',
        url: '/bill/getBillStatistics',
    })
}

export function getBillTrendData(){
    return request({
        method: 'get',
        url: '/bill/getBillTrendData',
    })
}
