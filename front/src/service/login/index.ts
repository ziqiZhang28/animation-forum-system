import request from '@/utils/request';

export async function login(params: LoginAPI.LoginParams) {
  return request(`/auth/api/web/login`, {
    method: 'POST',
    data: params,
  })
}
