import ProCard from '@ant-design/pro-card';
import { Avatar, Button, Card, Col, Form, Input, Row, Select, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import BraftEditor from 'braft-editor';
import { IProFormItems } from '@/components/FormComp/data';
import 'braft-editor/dist/index.css'
import { Link } from 'umi';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { GetUserByToken } from '@/services/user/login';
import img1 from '../../images/waoku.jpg';
import { AddPost } from '@/services/write';




const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Write: React.FC = () => {
    const [form] = Form.useForm();
    //使用钩子获取state
    const history = useHistory();
    const { state } = useLocation<any>();
    const tooltipInfo1 = <span style={{ color: '#FFB6C1' }}>个人中心</span>
    const tooltipInfo2 = <span style={{ color: '#FFB6C1' }}>个人设置</span>
    const [nickName, setNickName] = useState<any>()
    const [userface, setUserface] = useState<any>()
    const Token = sessionStorage.getItem('token')
    const [userId, setUserId] = useState<any>()
    const [description, setDescription] = useState<any>()
    const [contentEditorState, setContentEditorState] = useState<any>(null); //商品详情富文本内容

    const handledata = async () => {

        const userDetail = await GetUserByToken({ Token: Token })
        console.log("userDe", userDetail);
        if (userDetail) {
            console.log("user", userDetail);
            setNickName(userDetail.nickname)
            setUserface(userDetail.userface)
            setUserId(userDetail.user_id)
            setDescription(userDetail.depiction)
        }



    }
    useEffect(() => {
        handledata()

    }, [])

    const onFinish =async (values: any) => {
        console.log(values);
        console.log(contentEditorState);
        console.log("state",state);
        console.log(userId,"userid");
        
        const res=await AddPost({ title: values.title, content: contentEditorState, user_id: userId, classify_id: state.classify_id })
        history.push({ pathname: '/detail', state: { record: res.data } })
    };

    const onReset = () => {
        form.resetFields();
    };
    const merchandiseDetailsOnChange = (editorState: any) => {
        const htmlContent = editorState.toHTML(); //将富文本内容转为html

        setContentEditorState(htmlContent);
        
    };



    return (<>
        <Row gutter={24}>
            <Col xl={16} lg={24} md={24} sm={24} xs={24}>
        <ProCard>
            <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
                <Row justify="center" >
                            <Col span={20}>
                                <div style={{
                                marginTop: '5px', marginBottom: '10px', color: 'black', fontSize: '20px', margin: 'auto'
                            }}>
                                帖子题目：
                            </div>
                                <Form.Item
                                    style={{
                                        marginTop: '5px', marginBottom: '10px', color: 'black', fontSize: '20px', margin: 'auto'
                                    }}
                                    name="title" 
                                    label=""
                        >
                            
                            <div style={{
                                marginTop: '10px', marginBottom: '10px'  }}>
                                <Input size="large" />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="center" align="bottom">
                    <Col span={20}>
                        <Form.Item
                            name="content">
                            <div style={{ marginTop: '5px', marginBottom: '10px', color: 'black', fontSize: '20px' }} >帖子内容： </div>
                            <div className="my-component" style={{ overflow: 'hidden' }}>
                                <BraftEditor
                                    // onSave={submitmerchandiseDetails}
                                    onChange={merchandiseDetailsOnChange}
                                    contentStyle={{ border: '1px solid #B2B2B2', height: '100px' }}
                                // extendControls={extendControls}
                                // fontFamilies={fontFamily}
                                />
                            </div>
                            {/* <div style={{ fontSize: '12px', color: '#B2B2B2', marginTop: '5px' }}>
                                图片大小不得超过2MB，建议图片为正方形或宽高比为16:9
                            </div> */}

                        </Form.Item>
                    </Col></Row>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
                        提交
                    </Button>
                    <Button htmlType="button" onClick={onReset} style={{ marginLeft: '20px' }}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
            
                </ProCard>
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
        <Card
                        style={{ marginBottom: 24 }}
                        cover={
                            <img
                                alt="example"
                                src="https://www.dmoe.cc/random.php"
                            />
                        }
                        actions={[
                            <Tooltip title={tooltipInfo1} color='#FFFAFA'>
                                <Link to="/account/center"><UserOutlined key="setting" color="#FFB6C1" /></Link>
                            </Tooltip>,
                            <Tooltip title={tooltipInfo2} color='#FFFAFA'>
                                <Link to="/account/settings"><SettingOutlined key="setting" color="#FFB6C1" /></Link>
                            </Tooltip>
                            // <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={userface ? userface : img1} />}
                            title={nickName ? nickName : "游客"}
                            description={description ? description : "这人很懒，暂无简介哦！"}

                        />
                    </Card></Col></Row></>
        
    );
};

export default Write;


