/*
 * @Descripttion: react_hospital
 * @version: 1.0
 * @Author: zlh
 * @Date: 2022-06-06 11:09:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-08 11:37:57
 */
/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/auth/': {
      target: 'http://100erp.f3322.net:1010',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/posts': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
