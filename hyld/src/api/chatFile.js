import request from '../utils/request'

export function saveChatFile(params){
    return request({
        method: 'post',
        url: '/chatFile/saveChatFile',
        data:params
    })
}