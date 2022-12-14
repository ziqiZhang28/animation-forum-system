// import {
//   AlipayCircleOutlined,
//   LockOutlined,
//   MobileOutlined,
//   TaobaoCircleOutlined,
//   UserOutlined,
//   WeiboCircleOutlined,
// } from '@ant-design/icons';
// import { Alert, message, Tabs } from 'antd';
// import React, { useEffect, useRef, useState } from 'react';
// import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
// import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
// import Footer from '@/components/Footer';
// import { login } from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';

// import styles from './index copy.less';
// import { UserLogin } from '@/services/user/login';

// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => (
//   <Alert
//     style={{
//       marginBottom: 24,
//     }}
//     message={content}
//     type="error"
//     showIcon
//   />
// );

// const Login: React.FC = () => {
//   const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
//   const [type, setType] = useState<string>('account');
//   const { initialState, setInitialState } = useModel('@@initialState');

//   const intl = useIntl();

//   const fetchUserInfo = async () => {
//     const userInfo = await initialState?.fetchUserInfo?.();
//     if (userInfo) {
//       await setInitialState((s) => ({
//         ...s,
//         currentUser: userInfo,
//       }));
//     }
//   };

//   const handleSubmit = async (values: LoginAPI.LoginParams) => {
//     try {
//       // 登录
//       const msg = await UserLogin({ ...values });

//       if (msg.code === 1) {
//         const defaultLoginSuccessMessage = intl.formatMessage({
//           id: 'pages.login.success',
//           defaultMessage: '登录成功！',
//         });

//         message.success(defaultLoginSuccessMessage);
//         await fetchUserInfo();
//         /** 此方法会跳转到 redirect 参数所在的位置 */
//         if (!history) return;
//         const { query } = history.location;
//         const { redirect } = query as { redirect: string };
//         history.push(redirect || '/');
//           sessionStorage.setItem('token', msg.token)
//           const r=sessionStorage.getItem('token')
//     

//         // sessionStorage.setItem('userId', msg.data.user_id)
//         return;
//       }
//     //   如果失败去设置用户错误信息
//       setUserLoginState(msg);
//     } catch (error) {
//       const defaultLoginFailureMessage = intl.formatMessage({
//         id: 'pages.login.failure',
//         defaultMessage: '登录失败，请重试！',
//       });
//       message.error(defaultLoginFailureMessage);
//     }
//   };
// //   const { status, type: loginType } = userLoginState;

//   return (
//     <div className={styles.container}>
//       <div className={styles.lang} data-lang>
//         {SelectLang && <SelectLang />}
//       </div>
//       <div className={styles.content}>
//         <LoginForm
//           logo={<img alt="logo" src="/logo.svg" />}
//           title="Ant Design"
//           subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
//           initialValues={{
//             autoLogin: true,
//           }}
//           actions={[
//             <FormattedMessage
//               key="loginWith"
//               id="pages.login.loginWith"
//               defaultMessage="其他登录方式"
//             />,
//             <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
//             <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
//             <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
//           ]}
//           onFinish={async (values) => {
//             await handleSubmit(values as LoginAPI.LoginParams);
//           }}
//         >
//           <Tabs activeKey={type} onChange={setType}>
//             <Tabs.TabPane
//               key="account"
//               tab={intl.formatMessage({
//                 id: 'pages.login.accountLogin.tab',
//                 defaultMessage: '账户密码登录',
//               })}
//             />
//             <Tabs.TabPane
//               key="mobile"
//               tab={intl.formatMessage({
//                 id: 'pages.login.phoneLogin.tab',
//                 defaultMessage: '手机号登录',
//               })}
//             />
//           </Tabs>

//           {/* {status === 'error' && loginType === 'account' && (
//             <LoginMessage
//               content={intl.formatMessage({
//                 id: 'pages.login.accountLogin.errorMessage',
//                 defaultMessage: '账户或密码错误(admin/ant.design)',
//               })}
//             />
//           )} */}
//           {type === 'account' && (
//             <>
//               <ProFormText
//                 name="username"
//                 fieldProps={{
//                   size: 'large',
//                   prefix: <UserOutlined className={styles.prefixIcon} />,
//                 }}
//                 placeholder={intl.formatMessage({
//                   id: 'pages.login.username.placeholder',
//                   defaultMessage: '用户名: admin or user',
//                 })}
//                 rules={[
//                   {
//                     required: true,
//                     message: (
//                       <FormattedMessage
//                         id="pages.login.username.required"
//                         defaultMessage="请输入用户名!"
//                       />
//                     ),
//                   },
//                 ]}
//               />
//               <ProFormText.Password
//                 name="password"
//                 fieldProps={{
//                   size: 'large',
//                   prefix: <LockOutlined className={styles.prefixIcon} />,
//                 }}
//                 placeholder={intl.formatMessage({
//                   id: 'pages.login.password.placeholder',
//                   defaultMessage: '密码: ant.design',
//                 })}
//                 rules={[
//                   {
//                     required: true,
//                     message: (
//                       <FormattedMessage
//                         id="pages.login.password.required"
//                         defaultMessage="请输入密码！"
//                       />
//                     ),
//                   },
//                 ]}
//               />
//             </>
//           )}

//           {/* {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />} */}
//           {type === 'mobile' && (
//             <>
//               <ProFormText
//                 fieldProps={{
//                   size: 'large',
//                   prefix: <MobileOutlined className={styles.prefixIcon} />,
//                 }}
//                 name="mobile"
//                 placeholder={intl.formatMessage({
//                   id: 'pages.login.phoneNumber.placeholder',
//                   defaultMessage: '手机号',
//                 })}
//                 rules={[
//                   {
//                     required: true,
//                     message: (
//                       <FormattedMessage
//                         id="pages.login.phoneNumber.required"
//                         defaultMessage="请输入手机号！"
//                       />
//                     ),
//                   },
//                   {
//                     pattern: /^1\d{10}$/,
//                     message: (
//                       <FormattedMessage
//                         id="pages.login.phoneNumber.invalid"
//                         defaultMessage="手机号格式错误！"
//                       />
//                     ),
//                   },
//                 ]}
//               />
//               <ProFormCaptcha
//                 fieldProps={{
//                   size: 'large',
//                   prefix: <LockOutlined className={styles.prefixIcon} />,
//                 }}
//                 captchaProps={{
//                   size: 'large',
//                 }}
//                 placeholder={intl.formatMessage({
//                   id: 'pages.login.captcha.placeholder',
//                   defaultMessage: '请输入验证码',
//                 })}
//                 captchaTextRender={(timing, count) => {
//                   if (timing) {
//                     return `${count} ${intl.formatMessage({
//                       id: 'pages.getCaptchaSecondText',
//                       defaultMessage: '获取验证码',
//                     })}`;
//                   }
//                   return intl.formatMessage({
//                     id: 'pages.login.phoneLogin.getVerificationCode',
//                     defaultMessage: '获取验证码',
//                   });
//                 }}
//                 name="captcha"
//                 rules={[
//                   {
//                     required: true,
//                     message: (
//                       <FormattedMessage
//                         id="pages.login.captcha.required"
//                         defaultMessage="请输入验证码！"
//                       />
//                     ),
//                   },
//                 ]}
//                 onGetCaptcha={async (phone) => {
//                   const result = await getFakeCaptcha({
//                     phone,
//                   });
//                   if (result === false) {
//                     return;
//                   }
//                   message.success('获取验证码成功！验证码为：1234');
//                 }}
//               />
//             </>
//           )}
//           <div
//             style={{
//               marginBottom: 24,
//             }}
//           >
//             <ProFormCheckbox noStyle name="autoLogin">
//               <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
//             </ProFormCheckbox>
//             <a
//               style={{
//                 float: 'right',
//               }}
//             >
//               <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
//             </a>
//           </div>
//         </LoginForm>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Login;

import style from './index.less';
import img1 from '../../../images/waoku.jpg';
import img2 from '../../../images/wuwu.jpeg';
import $ from "jquery";
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserLogin, UserRegister } from '@/services/user/login';
import { useIntl, useModel, history } from 'umi';
export default function Login() {
    const [isShow, setIsShow] = useState(false)  // 控制登陆、注册
    const [showHide, SetShowHide] = useState(true)  // 控制登陆、注册显示隐藏
    const { initialState, setInitialState } = useModel('@@initialState');
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});

    const search = useRef()
    const intl = useIntl();
    const contentStyleShow = {
        transform: 'translateX(100%)'
    }
    const contentStyleHide = {
        transform: 'translateX(0%)'
    }
    // useEffect(() => {
    //     document.title = '二次元动漫论坛登录'

    //     return () => {

    //     }
    // }, [])  // 检测数组内变量 如果为空 则监控全局
    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            await setInitialState((s) => ({
                ...s,
                currentUser: userInfo,
            }));
        }
    };
    const registerClick = () => {
        // mySwitch()
        setIsShow(false)
        SetShowHide(true)
    }
    const LoginClick = () => {
        // mySwitch()
        setIsShow(true)
        SetShowHide(false)
    }
    // let bubleCreate = () => {
    //     // 获取body元素
    //     let body = document.body
    //     // 创建泡泡元素
    //     let buble = document.createElement('circle')
    //     // 设置泡泡半径
    //     let r = Math.random() * 5 + 25 //半径大小为25~30
    //     // 设置泡泡的宽高
    //     buble.style.width = r + 'px'
    //     buble.style.height = r + 'px'
    //     // 设置泡泡的随机起点
    //     buble.style.left = Math.random() * innerWidth + 'px'
    //     // 为body添加buble元素
    //     body.append(buble)
    //     // 4s清除一次泡泡
    //     setTimeout(() => {
    //         buble.remove()
    //     }, 4000)
    // }
    // // 每200ms生成一个泡泡
    // const sh=setInterval(() => {
    //     bubleCreate()
    // }, 200);


    const handleSubmit = async (values: LoginAPI.LoginParams) => {
    
        if (values.email) {
            //注册
            try {
                const msg = await UserRegister({ user: { ...values, userface:"https://api.yimian.xyz/img?type=head" }});

                if (msg.code === 1) {
                    alert("注册成功！")
                    return;
                } else if (msg.code === 0) {
                    alert("该用户名已存在！")
                }
                //   如果失败去设置用户错误信息
                setUserLoginState(msg);
            } catch (error) {
                const defaultLoginFailureMessage = intl.formatMessage({
                    id: 'pages.login.failure',
                    defaultMessage: '注册失败，请重试！',
                });
                message.error(defaultLoginFailureMessage);
            }
        } else {
            try {
                // 登录
                const msg = await UserLogin({ ...values });

                if (msg.code === 1) {
                    const defaultLoginSuccessMessage = intl.formatMessage({
                        id: 'pages.login.success',
                        defaultMessage: '登录成功！',
                    });

                    message.success(defaultLoginSuccessMessage);
                    await fetchUserInfo();
                    /** 此方法会跳转到 redirect 参数所在的位置 */
                    if (!history) return;
                    const { query } = history.location;
                    const { redirect } = query as { redirect: string };
                    history.push(redirect || '/',{state:msg});
                    sessionStorage.setItem('token', msg.token)

                    return;
                } else {
                    alert(msg.msg)
                }
                //   如果失败去设置用户错误信息
                setUserLoginState(msg);
            } catch (error) {
                const defaultLoginFailureMessage = intl.formatMessage({
                    id: 'pages.login.failure',
                    defaultMessage: '登录失败，请重试！',
                });
                message.error(defaultLoginFailureMessage);
            }
        }
        
    };

    return (
        <div className={style.warp}>
            <div className={style.box}>
                {/* <!-- 滑动盒子 --> */}
                <div style={isShow ? contentStyleShow : contentStyleHide} className={isShow ? style.prebox1 : style.prebox2} >
                    <h1>WELCOME</h1>
                    <p>JOIN US!</p>
                    <div className={style.imgbox}>
                        <img src={isShow ? img2 : img1} alt="img1" />
                    </div>
                </div>
                {/* <!-- 注册盒子 --> */}
                <div className={style.registerform}>
                    {/* <!-- 标题盒子 --> */}
                    <div className={style.titlebox1}>
                        <h1>注册</h1>
                    </div>
                    {/* <!-- 输入框盒子 --> */}
                    <div className={style.inputbox2}>
                        <Form
                            onFinish={async (values) => {
                                await handleSubmit(values as LoginAPI.LoginParams);
                            }}>
                            <Form.Item
                                // label="用户名"
                                name="username">
                                <input type="text" placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                // label="密码"
                                name="password">
                                <input type="text" placeholder="密码" />
                            </Form.Item>
                            <Form.Item
                                // label="昵称"
                                name="nickname">
                                <input type="text" placeholder="昵称" />
                            </Form.Item>
                            <Form.Item
                                // label="昵称"
                                name="email">
                                <input type="text" placeholder="邮箱" />
                            </Form.Item>
                            {/* <!-- 按钮盒子 --> */}
                            {/* <div className={style.btnbox}> */}
                            <Form.Item>
                                <Button type="primary" htmlType="submit">注册</Button>
                                {/* <!-- 绑定点击事件 --> */}
                                <Button onClick={registerClick}>去登录</Button>
                            </Form.Item>
                            {/* </div> */}
                        </Form>
                    </div>

                </div>
                {/* <!-- 登录盒子 --> */}
                <div className={style.loginform}>
                    {/* <!-- 标题盒子 --> */}
                    <div className={style.titlebox}>
                        <h1>登录</h1>
                    </div>
                    <Form
                        onFinish={async (values) => {
                            await handleSubmit(values as LoginAPI.LoginParams);
                        }}
                    >
                        {/* <!-- 输入框盒子 --> */}
                        <div className={style.inputbox}>
                            <Form.Item
                                name="username">
                                <input type="text" placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password">
                                <input type="password" placeholder="密码" />
                            </Form.Item>
                        </div>
                        {/* <!-- 按钮盒子 --> */}
                        <div className={style.btnbox}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">登录</Button>
                                {/* <!-- 绑定点击事件 --> */}
                                <Button onClick={LoginClick}>去注册</Button>
                            </Form.Item>

                        </div>
                    </Form>

                </div>
            </div>
        </div>
    );
}

