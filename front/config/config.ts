// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
    hash: true,
    antd: {},
    dva: {
        hmr: true,
    },
    layout: {
        // https://umijs.org/zh-CN/plugins/plugin-layout
        // locale: true,
        siderWidth: 208,
        ...defaultSettings,
    },
    // https://umijs.org/zh-CN/plugins/plugin-locale
    locale: {
        // default zh-CN
        default: 'zh-CN',
        antd: true,
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
    },
    dynamicImport: {
        loading: '@ant-design/pro-layout/es/PageLoading',
    },
    targets: {
        ie: 11,
    },
    // umi routes: https://umijs.org/docs/routing
    routes: [
        {
            path: '/user',
            layout: false,
            routes: [
                {
                    path: '/user/login',
                    layout: false,
                    name: 'login',
                    component: './user/Login',
                },
                {
                    path: '/user',
                    redirect: '/user/login',
                },
                {
                    name: 'register-result',
                    icon: 'smile',
                    path: '/user/register-result',
                    component: './user/register-result',
                },
                {
                    name: 'register',
                    icon: 'smile',
                    path: '/user/register',
                    component: './user/register',
                },
                {
                    component: '404',
                },
            ],
        },
        {
            path: '/home',
            name: '首页',
            icon: 'HomeOutlined',
            component: './dashboard/home',
            hideInBreadcrumb: true,
        },
        {
            path: '/post',
            // icon: 'form',
            // name: '帖子',
            component: './post',
            hideInBreadcrumb: true,
            
        },
        {
            path: '/detail',
            component: './detail',
        },
        {
            path: '/write',
            component: './write',
        },
        {
            path: '/search',
            component: './search',
        },
        {
            path: '/plate',
            icon: 'table',
            name: '板块',
            component: './plate',
            hideInBreadcrumb: true,
        },
        {
            name: '个人',
            icon: 'user',
            path: '/account',
            routes: [
                {
                    path: '/account',
                    redirect: '/account/center',
                },
                {
                    name: '个人中心',
                    icon: 'smile',
                    path: '/account/center',
                    component: './account/center',
                },
                {
                    name: '个人设置',
                    icon: 'smile',
                    path: '/account/settings',
                    component: './account/settings',
                },
            ],
        },
        {
            path: '/',
            redirect: '/home',
        },
        {
            component: '404',
        },
    ],
    access: {},
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        // 'primary-color': defaultSettings.primaryColor,
        // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
        // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
        // https://ant.design/docs/react/customize-theme-variable-cn
        'primary-color': '#FFB6C1', // 全局主色
        // 'link-color': '#FFB6C1', // 链接色
        // 'success-color': '#52c41a,', // 成功色
        // 'warning-color': '#faad14', // 警告色
        // 'error-color': '#f5222d', // 错误色
        // 'font-size - base': '14px', // 主字号
        // 'heading-color': '＃FFC0CB', // 标题色
        // 'border-color - base': '#d9d9d9', // 边框色
        // 'root-entry-name': 'variable',
        // "primary-color": "#1DA57A",
    },
    // esbuild is father build tools
    // https://umijs.org/plugins/plugin-esbuild
    esbuild: {},
    title: false,
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV || 'dev'],
    manifest: {
        basePath: '/',
    },
    // Fast Refresh 热更新
    fastRefresh: {},
    openAPI: [
        {
            requestLibPath: "import { request } from 'umi'",
            // 或者使用在线的版本
            // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
            schemaPath: join(__dirname, 'oneapi.json'),
            mock: false,
        },
        {
            requestLibPath: "import { request } from 'umi'",
            schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
            projectName: 'swagger',
        },
    ],
    nodeModulesTransform: {
        type: 'none',
    },
    mfsu: {},
    webpack5: {},
    exportStatic: {},
});
