import { request } from 'umi';

export interface StateType {
    status?: 'ok' | 'error';
    currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface UserLoginrParams {
    password: string;
    username: string;
}

export async function fakeRegister(params: UserLoginrParams) {
    return request('/api/register', {
        method: 'POST',
        data: params,
    });
}

