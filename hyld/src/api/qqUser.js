import request from '../utils/request'

// 箭头函数
// export const userLogin = params => request('post','/user/userLogin',params)
// export const userLogin=function(params){
//     return request('post','/user/userLogin',params)
// }

export function register(params){
    return request({
        method: 'post',
        url: '/qqUser/qqUserInfoRecord',
        data: params,
    })
}
