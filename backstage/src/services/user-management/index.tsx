import request from '@/utils/request';

//获取用户列表
export async function GetUserList() {
    return request(`/auth/user/user`, { params: {} }
    )
}