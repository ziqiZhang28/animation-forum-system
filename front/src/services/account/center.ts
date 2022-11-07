import request from '@/utils/request';

//获取用户帖子列表
export async function GetUserPostList(params: UserAPI.GetListParams) {
    return request(`/auth/forum/getUserForums`, { params })
}

//获取用户收藏列表
export async function GetUserCollectList(params: UserAPI.GetListParams) {
    return request(`/auth/user/getUserCollects`, { params })
}

//获取用户喜欢列表
export async function GetUserLikeList(params: UserAPI.GetListParams) {
    return request(`/auth/user/getUserLikes`, { params })
}
//修改用户资料
export async function UpdateUser(params: UserAPI.UpdateUserParams) {
    return request(`/auth/user/updateUser`, {
        method: 'PUT',
        data: params,
    }
    )
}