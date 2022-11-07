import request from '@/utils/request';

//获取帖子列表
export async function GetPostList() {
    return request(`/auth/forum/getAllForums`, { params: {} }
    )
}