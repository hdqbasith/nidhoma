// import { baseRequestClient, requestClient } from '#/api/request';

import { baseRequestClient, requestClient } from "../request";

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    email?: string;
    password?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
    user:any;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  // eslint-disable-next-line no-console
  // console.log(
  //   JSON.stringify(
  //     requestClient.post<AuthApi.LoginResult>('/auth/login', data),
  //   ),
  // );  
  return requestClient.post<AuthApi.LoginResult>('/auth/login', data);
}
export async function registerApi(data: AuthApi.LoginParams) {
  // eslint-disable-next-line no-console
  // console.log(
  //   JSON.stringify(
  //     requestClient.post<AuthApi.LoginResult>('/auth/login', data),
  //   ),
  // );  
  return requestClient.post<AuthApi.LoginResult>('/auth/register', data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout');
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes');
}
