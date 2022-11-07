import request from '@/utils/request';

//对帖子进行评论
export async function AddCommentToForum(params: DetailAPI.AddCommentsParams) {
    return request(`/auth/comment/addCommentToForum`, {
        method: 'POST',
        data: params,
    }
    )
}

//对评论进行回复
export async function AddReplyToComment(params: DetailAPI.AddReplysParams) {
    return request(`/auth/comment/addReplyToComment`, {
        method: 'POST',
        data: params,
    }
    )
}