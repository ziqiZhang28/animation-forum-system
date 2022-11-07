import request from '@/utils/request';

//用户登录
export async function UserLogin(params:LoginAPI.LoginParams) {
    return request(`/auth/login/login`, {
        method: 'POST',
        data: params,
    }
    )
}

//用户注册
export async function UserRegister(params: LoginAPI.RegisterParams) {
    return request(`/auth/register/addUser`, {
        method: 'POST',
        data: params,
    }
    )
}

//根据token获取用户
export async function GetUserByToken(params: LoginAPI.GetUserByTokenParams) {
    return request(`/auth/user/getUserByToken`, { params })
}
