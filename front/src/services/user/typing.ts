declare namespace LoginAPI {

    type LoginParams = {
        username: string;
        nickname?: string;
        password: string;
        email?: string;
        userface?: string

    };

    type RegisterParams = {
        user: {
            username: string;
            nickname?: string;
            password: string;
            email?: string;
            userface?: string
        }
        // password: string;
    };
    type GetUserByTokenParams = {
        Token?: string
    }
}