import { createElement, FC, useEffect, useState } from 'react';
import { Avatar, Card, Col, List, Comment, Skeleton, Row, message,Statistic, Tooltip } from 'antd';
import { Radar } from '@ant-design/charts';
import { useHistory } from "react-router-dom";
import { Link, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
// import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { queryProjectNotice, queryActivities, fakeChartData, GetContent } from './service';
import { DislikeFilled, DislikeOutlined, EditOutlined, EllipsisOutlined, LikeFilled, LikeOutlined, SettingOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import ProCard from '@ant-design/pro-card';
import PostDetails from './component/PostDetails';
import { GetPlateList } from '@/services/plate/plate';
import { response } from 'express';
import { CardDataType } from './data';
import { LightFilter } from '@ant-design/pro-form';
import { GetAllBoard } from '@/services/board/board';
import { GetUserByToken } from '@/services/user/login';
import img1 from '../../images/waoku.jpg';

const Workplace: FC = () => {
    const [content, SetContent] = useState<any>();
    const [author, SetAuthor] = useState<any>()
    const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
    const [boardData, setBoardData] = useState<any>()
    const tooltipInfo1 = <span style={{ color: '#FFB6C1' }}>个人中心</span>
    const tooltipInfo2 = <span style={{ color: '#FFB6C1' }}>个人设置</span>
    const history = useHistory();
    const [cardData, SetCardData] = useState<any[]>();
    const Token = sessionStorage.getItem('token')
    const [nickName, setNickName] = useState<any>()
    const [userface, setUserface] = useState<any>()
    const [userId, setUserId] = useState<any>()
    const [description, setDescription] = useState<any>()

    const handledata = async () => {
        const list = await GetPlateList()
        const res = await GetAllBoard()

        const userDetail = await GetUserByToken({ Token: Token })
        console.log("userDe",userDetail);
        if (userDetail) {
            console.log("user", userDetail);
            setNickName(userDetail.nickname)
            setUserface(userDetail.userface)
            setUserId(userDetail.user_id)
            setDescription(userDetail.depiction)
        }
        
        setBoardData(res)
        SetCardData(list)
        fetch('https://api.xygeng.cn/one').then(response => response.json()).then(res => {
            SetContent(res.data.content)
            SetAuthor(res.data.name)
        })


    }
    useEffect(() => {
        handledata()
        
    }, [])
    const toPost = (record?: any) => {
        if (!Token) {
                message.info('请先登录');
        
        } else {
            history.push({ pathname: '/post', state: { classify_id: record.classify_id, title: record.title, description: record.description } })

        }

    };
    const PageHeaderContent: FC<{}> = ({ }) => {
        return (
            <>
                <div className={styles.divContent}>
                    <img src='https://www.dmoe.cc/random.php' />
                </div>
                <div className={styles.text}>
                    <p >{content}---{author}</p>
                </div>
            </>
        );
    };

    const plateItem = (item: any) => {
        
        return (
            <List.Item key={item.classify_id}>
                <ProCard title={item.title} onClick={() => toPost(item)} >
                    <Meta
                        avatar={<Avatar src="https://api.yimian.xyz/img?type=head" />}
                        description={item.description}></Meta>
                </ProCard>
            </List.Item>
        )
    }
    return (
        <><PageContainer
            title={false}>
            <PageHeaderContent />
            <Row gutter={24}>
                <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                    <ProCard title="热门板块" ghost gutter={8} collapsible>
                        <List
                            grid={{ gutter: 16, column: 2 }}
                            dataSource={cardData}
                            renderItem={(item) => plateItem(item)
                            }
                        />
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
                    </Card>
                    <Card
                        bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
                        bordered={false}
                        title="论坛公告"
                        loading={projectLoading}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={boardData}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a
                                        // href="https://ant.design"
                                        >{item.content}</a>}
                                    // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </PageContainer>
        </>
    );
};

export default Workplace;
