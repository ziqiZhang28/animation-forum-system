import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
import NoFoundPage from './pages/404';
// import TagView from './components/TagView';

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
    loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    currentUser?: API.CurrentUser;
    loading?: boolean;
    fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
    const fetchUserInfo = async () => {
        try {
            // const msg = await queryCurrentUser();
            const msg = {
                code: 200,
                data: {
                    name: 'admin',
                },
            };
            return msg.data;
        } catch (error) {
            history.push(loginPath);
        }
        return undefined;
    };
    // // 如果不是登录页面，执行
    // if (history.location.pathname !== loginPath) {
    //   const currentUser = await fetchUserInfo();
    //   return {
    //     fetchUserInfo,
    //     currentUser,
    //     settings: defaultSettings,
    //   };
    // }
    // 如果是登录页面，不执行
    if (location.pathname.indexOf('/user/') === -1) {
        // if ([loginPath, registerPath].indexOf(history.location.pathname) === -1) {
        // if (history.location.pathname !== loginPath) {
        const currentUser = await fetchUserInfo();
        return {
            fetchUserInfo,
            currentUser,
            settings: {},
        };
    }
    return {
        fetchUserInfo,
        settings: defaultSettings,
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
    return {
        rightContentRender: () => <RightContent />,
        // childrenRender: (children) => {
        //   return (
        //     <>
        //       {initialState?.currentUser && location.pathname !== loginPath ? (
        //         <TagView children={children} home="/workplace" />
        //       ) : (
        //         children
        //       )}
        //     </>
        //   );
        // },
        disableContentMargin: false,
        contentStyle: {
            margin: 12,
        },
        waterMarkProps: {
            // content: initialState?.currentUser?.name,
            content: '二次元动漫论坛',
            width: 800,
            height: 480,
        },
        // footerRender: () => <Footer />,
        onPageChange: () => {
            const { location } = history;
            // 如果没有登录，重定向到 login
            // if (!initialState?.currentUser && location.pathname !== loginPath) {
            //   history.push(loginPath);
            // }
            if (!initialState?.currentUser && location.pathname.indexOf('/user') === -1) {
                // if (!initialState?.currentUser && location.pathname !== loginPath) {
                // if (!initialState?.currentUser && [loginPath, registerPath].indexOf(location.pathname) === -1) {
                history.push(loginPath);
                // } else {
                //   EventEmitter.emit('routerChange', location);
            }
        },

        menuHeaderRender: undefined,
        // 自定义 403 页面
        unAccessible: <div>unAccessible</div>,
        noFound: <NoFoundPage />,
        ...initialState?.settings,
    };
};
