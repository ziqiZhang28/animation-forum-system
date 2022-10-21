import { createElement, FC, useEffect, useState } from 'react';
import { Avatar, Card, Col, List, Comment, Skeleton, Row, Statistic, Tooltip } from 'antd';
import { Radar } from '@ant-design/charts';
import { useHistory } from "react-router-dom";
import { Link, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
// import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { queryProjectNotice, queryActivities, fakeChartData, GetContent } from './service';
import { DislikeFilled, DislikeOutlined, EditOutlined, EllipsisOutlined, LikeFilled, LikeOutlined, SettingOutlined, StarOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import ProCard from '@ant-design/pro-card';
import PostDetails from './component/PostDetails';

const Workplace: FC = () => {
    const [content, SetContent] = useState<any>();
    const [author,SetAuthor]=useState<any>()
    const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
    // const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
    const tooltipInfo1 = <span style={{ color:'#FFB6C1'}}>个人设置</span>
    const tooltipInfo2 = <span style={{ color: '#FFB6C1' }}>发帖</span>
    const [ModalVisible, SetModalVisible] = useState<boolean>(false);
    const [details, SetDetails] = useState<any>();
    const history = useHistory();
    const handledata = async () => {
        const res = await GetContent()
        SetContent( res.data.content)
        SetAuthor(res.data.name)
    }
    useEffect(() => {
        handledata()
    }, [])
    
    const toPost = (record?:any) => {
        console.log(record);
        history.push({ pathname: '/post', state: { id: record.title } })

    };
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
                    <p >{content}---{author}</p>
                </div>
            </>
        );
    };
    const listData = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        
    ];
    const cardData = [
        {
            title: '板块1',
            avatar:< Avatar src="https://api.yimian.xyz/img?type=head" />,
            description:"This is the description"
            // render: (_: any, record: any) => (
            //         <Meta
            //             avatar={<Avatar src="https://api.yimian.xyz/img?type=head" />}
            //             title="Card title"
            //             description="This is the description"
            //         />
            // ),
        },
        {
            title: '板块2',
            avatar: < Avatar src="https://api.yimian.xyz/img?type=head" />,
            description: "This is the description"
        },
        {
            title: '板块2',
            avatar: < Avatar src="https://api.yimian.xyz/img?type=head" />,
            description: "This is the description"
        },
        {
            title: '板块2',
            avatar: < Avatar src="https://api.yimian.xyz/img?type=head" />,
            description: "This is the description"
        }
    ]
    
    
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
                            renderItem={item => (
                                <List.Item>
                                    <ProCard title={item.title} onClick={()=>toPost(item)} >
                                        <Meta avatar={item.avatar} description={item.description}></Meta>
                                    </ProCard>
                                </List.Item>
                            )}
                        />
                    </ProCard>
                    {/* <ProCard title="日漫板块" ghost gutter={8} collapsible>
                        <List
                            grid={{ gutter: 16, column: 4 }}
                            dataSource={cardData}
                            renderItem={item => (
                                <List.Item>
                                    <Card title={item.title}>
                                        <Meta avatar={item.avatar} description={item.description}></Meta>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </ProCard>
                    <ProCard title="国创板块" ghost gutter={8} collapsible>
                        <List
                            grid={{ gutter: 16, column: 4 }}
                            dataSource={cardData}
                            renderItem={item => (
                                <List.Item>
                                    <Card title={item.title}>
                                        <Meta avatar={item.avatar} description={item.description}></Meta>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </ProCard>
                    <ProCard title="英美板块" ghost gutter={8} collapsible>
                        <List
                            grid={{ gutter: 16, column: 4 }}
                            dataSource={cardData}
                            renderItem={item => (
                                <List.Item>
                                    <Card title={item.title}>
                                        <Meta avatar={item.avatar} description={item.description}></Meta>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </ProCard> */}
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
                                <Link to="/account/settings"><SettingOutlined key="setting" color="#FFB6C1" /></Link>
                            </Tooltip>,
                            <Tooltip title={tooltipInfo2} color='#FFFAFA'>
                                <Link to="/post"><EditOutlined key="edit" color="#FFB6C1" /></Link>
                            </Tooltip>
                            // <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://api.yimian.xyz/img?type=head" />}
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
        </>
    );
};

export default Workplace;
