import { createElement, FC, useState } from 'react';
import { Avatar, Card, Col, List, Comment, Skeleton, Row, Statistic, Tooltip } from 'antd';
import { Radar } from '@ant-design/charts';

import { Link, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
// import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import type { ActivitiesType, CurrentUser } from './data.d';
import { queryProjectNotice, queryActivities, fakeChartData } from './service';
import { DislikeFilled, DislikeOutlined, EditOutlined, EllipsisOutlined, LikeFilled, LikeOutlined, SettingOutlined, StarOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import React from 'react';


const PageHeaderContent: FC<{}> = ({ }) => {
    // if (!loading) {
    //     return <Skeleton avatar paragraph={{ rows: 1 }} active />;
    // }
    return (
        <>
            <div className={styles.divContent}>
                <img src='https://www.dmoe.cc/random.php' />
            </div>
            <div className={styles.text}>
                <p>欢迎来到二次元动漫论坛！</p>
            </div>
        </>
    );
};



const Workplace: FC = () => {
    const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
    const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
    const { data } = useRequest(fakeChartData);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState<string | null>(null);
    const tooltipInfo1 = <span style={{ color:'#FFB6C1'}}>个人设置</span>
    const tooltipInfo2 = <span style={{ color: '#FFB6C1' }}>发帖</span>

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };
    const listData = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        
    ];
    const commentActions = [
        <>
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
            <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
            </span>
            <span><StarOutlined /></span>
            
            <span key="comment-basic-reply-to" > <Link to="/form/step-form">回复</Link></span></>,
    ];
    const commentData = [
        {
            actions: { commentActions },
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
                
            ),
            datetime: (
                <Tooltip title="2016-11-22 11:22:33">
                    <span>8 hours ago</span>
                </Tooltip>
            ),
        },
        {
            // actions: [<span key="comment-list-reply-to-0">回复</span>],
            actions: { commentActions },

            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            datetime: (
                <Tooltip title="2016-11-22 10:22:33">
                    <span>9 hours ago</span>
                </Tooltip>
            ),
        },
    ];

    return (
        <PageContainer
            title={false}
        // content={
        //     <PageHeaderContent/>
        // }

        >
            <PageHeaderContent />

            <Row gutter={24}>
                <Col xl={16} lg={24} md={24} sm={24} xs={24}>

                    <Card
                        bodyStyle={{ padding: 0 }}
                        bordered={false}
                        className={styles.activeCard}
                        title="热门帖子"
                        loading={activitiesLoading}
                    >
                        <List
                            className="comment-list"
                            itemLayout="horizontal"
                            dataSource={commentData}
                            size="large"
                            renderItem={item => (
                                <li>
                                    <Comment
                                        actions={commentActions}
                                        author={item.author}
                                        avatar={item.avatar}
                                        content={item.content}
                                        datetime={item.datetime}
                                    />
                                </li>
                            )}
                        />
                    </Card>
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                    <Card
                        // style={{ width: 300 }}
                        style={{ marginBottom: 24 }}
                        cover={
                            <img
                                alt="example"
                                src="https://www.dmoe.cc/random.php"
                            />
                        }
                        actions={[
                            <Tooltip title={tooltipInfo1} color='#FFFAFA'>
                                <Link to="/account/settings"><SettingOutlined key="setting" color="#FFB6C1" /></Link>
                            </Tooltip>,
                            <Tooltip title={tooltipInfo2} color='#FFFAFA'>
                                <Link to="/post"><EditOutlined key="edit" color="#FFB6C1" /></Link>
                            </Tooltip>
                            // <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title="Card title"
                            description="This is the description"
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
                            dataSource={listData}
                            // grid={{ column: 3 }}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta

                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Workplace;
