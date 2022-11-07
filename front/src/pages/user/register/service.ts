import { request } from 'umi';

export interface StateType {
    status?: 'ok' | 'error';
    currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface UserRegisterParams {
    email: string;
    password: string;
    nickname: string;
    username: string;
    userface: string;
}

export async function fakeRegister(params: UserRegisterParams) {
    return request('/api/register', {
        method: 'POST',
        data: params,
    });
}
