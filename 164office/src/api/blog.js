import request from '../utils/request'

// export function saveBlogFile(params){
//     return request({
//         method: 'post',
//         url: '/blog/saveBlogFile',
//         data:params
//     })
// }

export function saveBlog(params){
    return request({
        method: 'post',
        url: '/blog/saveBlog',
        data:params
    })
}

export function viewBlog(params){
    return request({
        method: 'post',
        url: '/blog/viewBlog',
        params:params
    })
}


export function initBlog(){
    return request({
        method: 'post',
        url: '/blog/initBlog',
    })
}

export function findBlogById(params){
    return request({
        method: 'get',
        url: '/blog/findBlogById',
        params:params
    })
}

export function searchMyBlog(params){
    return request({
        method: 'get',
        url: '/blog/searchMyBlog',
        params:params
    })
}

export function searchBlog(params){
    return request({
        method: 'get',
        url: '/blog/searchBlog',
        params:params
    })
}

export function deleteBlog(params){
    return request({
        method: 'post',
        url: '/blog/deleteBlog',
        data:params
    })
}

export function deletePointer(params){
    return request({
        method: 'post',
        url: '/pointer/deletePointer',
        data:params
    })
}

export function returnPointer(params){
    return request({
        method: 'post',
        url: '/pointer/returnPointer',
        data:params
    })
} 