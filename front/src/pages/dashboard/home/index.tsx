import { createElement, FC, useEffect, useRef, useState } from 'react';
import { Avatar, Card, Col, List, Comment, Skeleton, Row, Statistic, Tooltip, message } from 'antd';
import { Radar } from '@ant-design/charts';

import { Link, useHistory, useLocation, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
// import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import type { ActivitiesType, CurrentUser } from './data.d';
import { queryProjectNotice, queryActivities, fakeChartData } from './service';
import Icon, { DislikeFilled, DislikeOutlined, EditOutlined, EllipsisOutlined, LikeFilled, LikeOutlined, LikeTwoTone, SettingOutlined, StarFilled, StarOutlined, StarTwoTone, UserOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import { CollectForum, DisCollectForum, DisLikeForum, GetPostListByLike, LikeForum } from '@/services/home/home';
import { GetAllBoard } from '@/services/board/board';
import Cookies from 'js-cookie'
import { GetUserByToken } from '@/services/user/login';
import img1 from '../../../images/waoku.jpg';

import Footer from '@/components/Footer';




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
    const history = useHistory();
    const [likes, setLikes] = useState<any>();
    const [stars, setStars] = useState<any>();
    const [action, setAction] = useState<any>(false);
    const [commentData, setCommentData] = useState<any>()
    const [boardData, setBoardData] = useState<any>()
    // const [state, setstate] = useState<any>(false)
    const tooltipInfo1 = <span style={{ color: '#FFB6C1' }}>个人中心</span>
    const tooltipInfo2 = <span style={{ color: '#FFB6C1' }}>个人设置</span>
    const [nickName, setNickName] = useState<any>()
    const [userface, setUserface] = useState<any>()
    const [userId, setUserId] = useState<any>()
    const [description, setDescription] = useState<any>()

    const Token = sessionStorage.getItem('token')
    // const [Token,setToken]=useState<any>()
    const { state } = useLocation<any>();

    const handledata = async () => {
        // const Token = sessionStorage.getItem('token')
        // setToken(sessionStorage.getItem('token'))
        let userDetail: any
        if (state) {
            userDetail = await GetUserByToken({ Token: state.state.token })

            if (userDetail) {
                setNickName(userDetail.nickname)
                setUserface(userDetail.userface)
                setUserId(userDetail.user_id)
                setDescription(userDetail.depiction)
            }

        } else {
            userDetail = await GetUserByToken({ Token: Token })

        }
        // const userDetail = await GetUserByToken({ Token: state.Token })
        if (userDetail) {
            setNickName(userDetail.nickname)
            setUserface(userDetail.userface)
            setUserId(userDetail.user_id)
            setDescription(userDetail.depiction)

        }
        const list = await GetPostListByLike()
        const res = await GetAllBoard()
        list.forEach((element: any) => {
            setLikes(element.likes)
            setStars(element.collects)
            element.islike = false
            element.iscollect = false
        });
        setCommentData(list)
        setBoardData(res)

    }

    useEffect(() => {
        handledata()

    }, [])
    // const like = () => {
    //     setLikes(likes + 1);
    //     setAction('liked');
    // };
    // const star = () => {
    //     setStars(stars + 1);
    //     setAction('stared');
    // };



    // const commentActions = [
    //     <>
    //         <span onClick={like}>
    //             {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
    //             <span className="comment-action">{likes}</span>
    //         </span>
    //         <span onClick={star}>
    //             {React.createElement(action === 'stared' ? StarFilled : StarOutlined)}
    //             <span className="comment-action">{stars}</span>
    //         </span>
    //         {/* <span><StarOutlined /></span> */}

    //         <span key="comment-basic-reply-to" > <Link to="/form/step-form">回复</Link></span></>,
    // ];

    const toDetail = (record?: any) => {

        history.push({ pathname: '/detail', state: { record: record } })

    };

    const postItem = (item: any) => {
        console.log("item", item);
        return (
            <List.Item key={item.forum_id}>
                <Comment
                    key={item.forum_id}
                    actions={[
                        <>
                            <span onClick={() => {

                                if (item.islike === true) {
                                    item.islike = false
                                    setAction(false)
                                    DisLikeForum({
                                        user_id: userId,
                                        forum_id: item.forum_id
                                    })
                                } else {
                                    if (!Token) {
                                        message.info('请先登录');
                                    } else {
                                        item.islike = true
                                        setLikes(item.likes + 1);
                                        setAction(true)
                                        LikeForum({
                                            user_id: userId,
                                            forum_id: item.forum_id
                                        })
                                    }

                                }
                            }}>
                                {createElement(item.islike === true ? LikeTwoTone : LikeOutlined)}
                                <span className="comment-action">{item.islike === true ? item.likes + 1 : item.likes}</span>
                            </span>
                            <span onClick={() => {

                                if (item.iscollect === true) {
                                    item.iscollect = false
                                    setAction(false)
                                    DisCollectForum({
                                        user_id: userId,
                                        forum_id: item.forum_id
                                    })
                                } else {
                                    if (!Token) {
                                        message.info('请先登录');
                                    } else {
                                        item.iscollect = true
                                        setLikes(item.collects + 1);
                                        setAction(true)
                                        CollectForum({
                                            user_id: userId,
                                            forum_id: item.forum_id
                                        })
                                    }
                                }

                            }}>
                                {createElement(item.iscollect === true ? StarTwoTone : StarOutlined)}
                                <span className={item.forum_id}>{item.iscollect === true ? item.collects + 1 : item.collects}</span>
                            </span>

                            <span key={item.forum_id} onClick={() => toDetail(item)} > 回复</span></>,
                    ]}
                    author={item.nickname}
                    avatar={<Avatar src={item.userface} />}
                    content={<div dangerouslySetInnerHTML = {{ __html: item.content }}></div>}
                    datetime={item.create_time}
                />
            </List.Item>

        )
    }
    return (
        <div>
        <PageContainer
            title={false}
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
                            renderItem={(item) => postItem(item)}
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
                            description={description ? description : "这家伙很懒，什么都没写..."}
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
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Workplace;
