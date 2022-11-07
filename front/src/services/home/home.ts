import request from '@/utils/request';

//获取首页帖子列表
export async function GetPostListByLike() {
    return request(`/auth/forum/getHomeForums`, { params: {} }
    )
}

//帖子点赞
export async function LikeForum(params: HomeAPI.LikeParams) {
    return request(`/auth/user/like`, {
        method: 'PUT',
        data: params,
    }
    )
}

//帖子取消点赞
export async function DisLikeForum(params: HomeAPI.LikeParams) {
    return request(`/auth/user/dislike`, {
        method: 'PUT',
        data: params,
    }
    )
}
//帖子取消收藏
export async function DisCollectForum(params: HomeAPI.LikeParams) {
    return request(`/auth/user/discollect`, {
        method: 'PUT',
        data: params,
    }
    )
}

//帖子收藏
export async function CollectForum(params: HomeAPI.LikeParams) {
    return request(`/auth/user/collect`, {
        method: 'PUT',
        data: params,
    }
    )
}

//关键词搜索
//根据id获取帖子详情
export async function SearchList(params: HomeAPI.SearchParams) {
    return request(`/auth/forum/getForumsByKey`, { params })
}
