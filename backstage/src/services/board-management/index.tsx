import request from '@/utils/request';

//获取公告列表
export async function GetBoardList() {
    return request(`/auth/board/getAllBoard`, { params: {} }
    )
}