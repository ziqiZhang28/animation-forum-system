/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { history } from 'umi';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  408: '服务器内部错误',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const top = 66
/**
 * 异常处理程序
 */
const errorHandler = async (error: any) => {

  const response = error;
  // 状态码处理
  if (response && response.status) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    //  401-登录失效
    if (response.status === 401) {
      notification.error({
        top,
        message: '提示',
        description: '登录已失效，请重新登录！',
      });
      sessionStorage.clear()
      window.location.href = '/user/login';
    }

    const { status, statusText } = response;
    // 返回报错信息
    let errorText = codeMessage[status] || statusText;

    await response.json().then((err: any) => {
      let { message, details } = err.error
      let msg = message || errorText
      notification.error({
        top,
        message: `提示`,
        description: `${msg} ${details || ''}`,
      });
    });
  } else if (!response) {
    // notification.error({
    //   top,
    //   description: '您的网络发生异常，无法连接服务器',
    //   message: '网络异常',
    // });
    // window.location.href = '/network-anomaly';
  }
  // return response;
  throw response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  timeout: 30 * 1000,
  errorHandler, // 默认错误处理
  // prefix: 'http://接口地址，如果没有填写默认以当前前端域名为准。',
  // credentials: 'include', // 默认请求是否带上cookie
});

// 此处为拦截器，每次发送请求之前判断能否取到token
request.interceptors.request.use((url: string, options) => {
  const headers = {
    // 'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Token': '',
  };

  // token
  const token = sessionStorage.getItem('token');
  if (token) {
    headers['X-Token'] = token
  }
  // 租户编码
  const tenantCode = sessionStorage.getItem('tenantCode');
  if (token) {
    headers['tenantCode'] = tenantCode
  }
  return ({
    url,
    options: { ...options, headers },
  });
});

// request响应拦截器, 统一处理错误信息
request.interceptors.response.use(async (response, options) => {
  const data: any = await response.clone().json();

  if (data.code !== 200 && data.msg) {
    // 界面报错处理
    notification.error({
      top,
      message: data.code,
      description: data.msg || codeMessage[data.code],
      // message: data.msg,
      // description: '您的网络发生异常，无法连接服务器',
    });
    if (data.code === 401) {
      sessionStorage.clear()
      history.replace('/user/login');
    }
    throw data;
  } else {
    return data.data;
  }
});

export default request;
