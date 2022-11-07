declare namespace UserAPI {

    type GetListParams = {
        user_id: number
    };
    type UpdateUserParams = {
        user :{
        user_id: number;
        username?: string;
        nickname?: string;
        // password: string;
        email?: string;
        userface?: string
    }
}
}