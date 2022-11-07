declare namespace DetailAPI {

    type AddCommentsParams = {
        content: string;
        user_id: number;
        forum_id: number;
    };

    type AddReplysParams = {
        content: string;
        user_id: number;
        comment_id: number;
    };
}