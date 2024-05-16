import request from '../utils/request'

export function saveBlogFile(params){
    return request({
        method: 'post',
        url: '/blogFile/saveBlogFile',
        data:params
    })
}