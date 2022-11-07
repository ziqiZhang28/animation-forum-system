import request from '@/utils/request';

//获取所有公告
export async function GetAllBoard() {
    return request(`/auth/board/getAllBoard`, {
        params:{}
    }
    )
}