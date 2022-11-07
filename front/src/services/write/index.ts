import request from '@/utils/request';

export async function AddPost(params: WriteAPI.AddwriteParams) {
    return request(`/auth/forum/addForum`, {
        method: 'POST',
        data: params,
    }
    )
}