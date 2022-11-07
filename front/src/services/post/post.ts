import request from '@/utils/request';

//获取帖子列表
export async function GetPostListByLike() {
    return request(`/auth/forum/getHomeForums`, { params: {} }
    )
}

//根据最近时间获取帖子列表
export async function GetPostListByTime(params: PostAPI.GetPostListParams) {
    return request(`/auth/forum/getForumsByTime`,{params})
}

//根据板块id获取帖子列表
export async function GetPostListById(params: PostAPI.GetPostListParams) {
    return request(`/auth/forum/getForumsByClassifyId`, { params })
}


//根据板块id获取最热帖子列表
export async function GetHotPostById(params: PostAPI.GetPostListParams) {
    return request(`/auth/forum/getHotForums`, { params })
}

//根据id获取帖子详情
export async function GetPostDetail(params: PostAPI.GetPostDetailParams) {
    return request(`/auth/forum/getOneForum`, { params })
}

//根据帖子id获取评论
export async function GetCommentList(params: PostAPI.GetPostDetailParams) {
    return request(`/auth/comment/getForumComment`, { params })
}