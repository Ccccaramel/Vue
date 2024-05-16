import request from '../utils/request'

export function saveBlogRemark(params){
    return request({
        method: 'post',
        url: '/blogRemark/saveBlogRemark',
        data:params
    })
}

export function searchBlogRemark(params){
    return request({
        method: 'get',
        url: '/blogRemark/searchBlogRemark',
        params:params
    })
}
