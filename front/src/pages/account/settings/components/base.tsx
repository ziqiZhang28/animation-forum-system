import React, { useEffect, useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message } from 'antd';
import ProForm, {
    ProFormDependency,
    ProFormFieldSet,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { queryCurrent } from '../service';
import { queryProvince, queryCity } from '../service';

import styles from './BaseView.less';
import { GetUserByToken } from '@/services/user/login';
import { useSetState } from 'ahooks';
import { IProFormCompRef } from '@/components/FormComp/ProFormComp';
import { UpdateUser } from '@/services/account/center';

const validatorPhone = (rule: any, value: string[], callback: (message?: string) => void) => {
    if (!value[0]) {
        callback('Please input your area code!');
    }
    if (!value[1]) {
        callback('Please input your phone number!');
    }
    callback();
};
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
    <>
        <div className={styles.avatar_title}>头像</div>
        <div className={styles.avatar}>
            <img src={avatar} alt="avatar" />
        </div>
        <Upload showUploadList={false}>
            <div className={styles.button_view}>
                <Button>
                    <UploadOutlined />
                    更换头像
                </Button>
            </div>
        </Upload>
    </>
);

const BaseView: React.FC = () => {
    let userDetail: any
    const [form] = ProForm.useForm()
    const FormRef: any = useRef<IProFormCompRef>();
    const Token = sessionStorage.getItem('token')
    const [userId,setUserId]=useState<any>()
    // const { data: currentUser, loading } = useRequest(() => {
    //     return GetUserByToken({ Token: Token });
    // });
    const getdefaultValue = async () => {
        GetUserByToken({ Token: Token }).then((res: any) => {
            console.log("data", res);
            setUserId(res.user_id)
            form.setFieldsValue(res)
        })
    }
    useEffect(() => {
        getdefaultValue()
    }, [])
    // const handledata = async () => {
    //     userDetail = await GetUserByToken({ Token: Token })
    //     console.log("user",userDetail);
    //     setEmail(userDetail.email)

    // }
    // useEffect(() => {
    //     handledata()
    //     console.log(email,111);
        
    // }, [])
    const getAvatarURL = () => {
        // if (currentUser) {
        //     if (currentUser.avatar) {
        //         return currentUser.avatar;
        //     }
        //     const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
        //     return url;
        // }
        return '';
    };

    const handleFinish = async (values:any) => {
        console.log("values",values);
        const res=await UpdateUser({user:{
            ...values,
            user_id: userId,
            userface:"https://picx1.zhimg.com/v2-e0f370816741cec1ed707a8eaa93346b_1440w.jpg?source=172ae18b"
        }})
        console.log("userid",userId);
        if (res) {
            console.log("res",res);
            sessionStorage.setItem('token', res.token)

            message.success('更新基本信息成功');
        } else {
            message.success('更新基本信息失败');
        }
    };
    return (
        <div className={styles.baseView}>
            {/* {loading ? null : ( */}
                <>
                    <div className={styles.left}>
                        <ProForm
                        layout="vertical"
                        form={form}
                            onFinish={handleFinish}
                            submitter={{
                                searchConfig: {
                                    submitText: '更新基本信息',
                                },
                                render: (_, dom) => dom[1],
                        }}
                            hideRequiredMark
                        >
                            <ProFormText
                                width="md"
                                name="email"
                                label="邮箱"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的邮箱!',
                                    },
                                ]}
                            />
                            <ProFormText
                                width="md"
                                name="nickname"
                                label="用户名"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的昵称!',
                                    },
                                ]}
                            />
                            <ProFormText
                                width="md"
                                name="username"
                                label="昵称"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的昵称!',
                                    },
                                ]}
                            />
                            <ProFormTextArea
                                name="depiction"
                                label="个人简介"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入个人简介!',
                                    },
                                ]}
                                placeholder="个人简介"
                            />



                        </ProForm>
                    </div>
                    <div className={styles.right}>
                        <AvatarView avatar={getAvatarURL()} />
                    </div>
                </>
            {/* )} */}
        </div>
    );
};

export default BaseView;
