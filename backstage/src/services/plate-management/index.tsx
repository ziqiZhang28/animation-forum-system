import request from '@/utils/request';

//获取板块列表
export async function GetPlateList() {
    return request(`/auth/classify/classify`, { params: {} }
    )
}