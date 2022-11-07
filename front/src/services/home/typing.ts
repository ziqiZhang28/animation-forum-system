declare namespace HomeAPI {

    type LikeParams = {
        user_id: number;
        forum_id: number;
    };
    type SearchParams = {
        key_word?:string
    }
}