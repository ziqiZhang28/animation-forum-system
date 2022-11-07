import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined, SettingOutlined, EditOutlined, LikeFilled, LikeOutlined, StarFilled, StarOutlined, LikeTwoTone, StarTwoTone } from '@ant-design/icons';
import { Avatar, Comment, Button, Card, Col, Divider, Input, List, Row, Tag, Tooltip, Form, InputRef, message } from 'antd';
import React, { useState, useRef, useEffect, createElement } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import { RouteChildrenProps, useLocation } from 'react-router';
import styles from './Center.less';
import Meta from 'antd/lib/card/Meta';
import { queryActivities } from '../dashboard/home/service';
import moment from 'moment';
import { GetCommentList, GetPostDetail } from '@/services/post/post';
import ProCard from '@ant-design/pro-card';
import { AddCommentToForum, AddReplyToComment } from '@/services/detail/detail';
import { GetUserByToken, UserLogin } from '@/services/user/login';
import { CollectForum, DisCollectForum, DisLikeForum, LikeForum } from '@/services/home/home';

const { TextArea } = Input;

interface CommentItem {
    author: string;
    avatar: string;
    content: React.ReactNode;
    datetime: string;
}

interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}


const Center: React.FC<RouteChildrenProps> = () => {
    const inputRef = useRef<InputRef>(null);
    const { state } = useLocation<any>();
    const [title, setTitle] = useState<any>()
    const [content, setContent] = useState<any>()
    // const [comments, setComments] = useState<any>()
    const [replys, setReplys] = useState<any>()
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState<any>();
    const [commentId, setCommentId] = useState<any>();
    const Token = sessionStorage.getItem('token')
    const [userId, setUserId] = useState<any>()
    const [likes, setLikes] = useState<any>();
    const [stars, setStars] = useState<any>();
    const [author, setAuthor] = useState<any>();

    const [action, setAction] = useState<any>(false);
    const [islike, setIslike] = useState<any>(false);
    const [iscollect, setIscollect] = useState<any>(false);

    let text: any
    var userDetail: any
    const handledata = async () => {
        console.log(state, "state");

        const res = await GetPostDetail({ forum_id: state.record.forum_id })
        setAuthor(res.nickname)
        const resComment = await GetCommentList({ forum_id: state.record.forum_id })
        userDetail = await GetUserByToken({ Token: Token })
        setLikes(res.likes)
        setStars(res.collects)

        if (userDetail) {
            console.log("user", userDetail);
            // setNickName(userDetail.nickname)
            // setUserface(userDetail.userface)
            setUserId(userDetail.user_id)
            // setDescription(userDetail.depiction)
        }
        setTitle(res.title)
        setContent(res.content)
        console.log("resComment", resComment);
        setComments(resComment[0])
        setReplys(resComment[1])
    }
    useEffect(() => {
        handledata()

    }, [])

    // const Reply = (index: any) => {
    //     console.log("item",index);

    //     inputRef.current!.focus({
    //         cursor: 'end',
    //     });
    // }

    const CommentList = (item: any) => {

        return (
            <List.Item key={item.comment_id}>
                <Comment
                    key={item.comment_id}
                    actions={[<span key={item.comment_id}
                        onClick={() => {
                            setCommentId(item.comment_id)
                            inputRef.current!.focus({
                                cursor: 'end',
                            });
                        }}
                    // onClick={() => Reply(item.comment_id)}
                    >回复</span>]}
                    author={<a>{item.nickname}</a>}
                    avatar={<Avatar src={item.userface} alt={item.nickname} />}
                    content={<p>{item.content}</p>}
                    datetime={item.time}
                    children={replys
                        ?.filter((element: any) => element.root_comment_id === item.comment_id)
                        .map((reply: any) => (
                            <Comment
                                key={reply.comment_id}
                                datetime={reply.time}
                                actions={[<span key={reply.comment_id}
                                    onClick={() => {
                                        setCommentId(reply.comment_id)
                                        inputRef.current!.focus({
                                            cursor: 'end',
                                        });
                                    }}>回复</span>]}
                                author={reply.comment_nickname ? <><a>{reply.nickname}</a>回复<a>@{reply.comment_nickname}</a></> : <a>{reply.nickname}</a>}
                                avatar={<Avatar src={reply.userface} alt={reply.nickname} />}
                                content={<p>{reply.content}</p>}
                            />
                        ))}
                ></Comment>
            </List.Item>

        )
    }


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // setValue(e.target.value);
        text = e.target.value
    };

    const handleSubmit = async () => {
        setValue(text)
        if (!value) return;
        if (commentId) {
            AddReplyToComment({
                content: value,
                user_id: userId,
                comment_id: commentId
            })
        } else {
            AddCommentToForum({
                content: value,
                user_id: userId,
                forum_id: state.record.forum_id
            })
            setSubmitting(true);

            setTimeout(() => {
                setSubmitting(false);
                setValue('');
                setComments([
                    ...comments,
                    {
                        author: 'Han Solo',
                        avatar: 'https://joeschmoe.io/api/v1/random',
                        content: <p>{value}</p>,
                        datetime: moment('2016-11-22').fromNow(),
                    },
                ]);
            }, 1000);
        }
    };

    const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
        <>
            <Form.Item>
                <TextArea rows={4}
                    ref={inputRef}
                    allowClear={true}
                    onChange={onChange}
                    // onSubmit={onSubmit}
                    placeholder="最多可输入200字"
                    maxLength={200}
                    value={value}
                    defaultValue={text} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    提交评论
                </Button>
            </Form.Item>
        </>
    );






    return (
        <GridContent>
            <Row gutter={[16, 4]}>
                <Col lg={17} md={24}>
                    <Card
                        size="default"
                        headStyle={{ fontWeight: 'bold' }}
                        title={title}
                        actions={[
                            // <>
                            //     <span onClick={() => {

                            //         if (islike === true) {
                            //             setIslike(false)
                            //             setAction(false)
                            //             DisLikeForum({
                            //                 user_id: userId,
                            //                 forum_id: state.record.forum_id
                            //             })

                            //         } else {
                            //             if (!Token) {
                            //                 message.info('请先登录');
                            //             } else {
                            //                 setIslike(true)
                            //                 setLikes(likes + 1);
                            //                 setAction(true)
                            //                 LikeForum({
                            //                     user_id: userId,
                            //                     forum_id: state.record.forum_id
                            //                 })
                            //             }


                            //         }
                            //     }}>
                            //         {createElement(islike === true ? LikeFilled : LikeOutlined)}
                            //         <span className="comment-action">{islike === true ? likes + 1 : likes}</span>
                            //     </span>
                            //     <span onClick={() => {

                            //         if (iscollect === true) {
                            //                 setIscollect(false)
                            //                 setAction(false)
                            //                 CollectForum({
                            //                     user_id: userId,
                            //                     forum_id: state.record.forum_id
                            //                 })

                            //         } else {
                            //             if (!Token) {
                            //                 message.info('请先登录');
                            //             } else {
                            //                 setIscollect(true)
                            //                 setStars(stars + 1);
                            //                 setAction(true)
                            //                 DisCollectForum({
                            //                     user_id: userId,
                            //                     forum_id: state.record.forum_id
                            //                 })
                            //             }
                            //         }

                            //     }}>
                            //         {createElement(iscollect === true ? StarFilled : StarOutlined)}
                            //         <span >{iscollect === true ? stars + 1 : stars}</span>
                            //     </span>
                            // </>
                        ]}
                    >
                        <div style={{marginBottom:'200px'}} dangerouslySetInnerHTML={{ __html: content }}></div>
                        <div style={{  position: 'absolute', right: '20px', bottom: '10px' }}>
                            <span onClick={() => {

                                if (islike === true) {
                                    setIslike(false)
                                    setAction(false)
                                    DisLikeForum({
                                        user_id: userId,
                                        forum_id: state.record.forum_id
                                    })

                                } else {
                                    if (!Token) {
                                        message.info('请先登录');
                                    } else {
                                        setIslike(true)
                                        setLikes(likes + 1);
                                        setAction(true)
                                        LikeForum({
                                            user_id: userId,
                                            forum_id: state.record.forum_id
                                        })
                                    }


                                }
                            }}>
                                {createElement(islike === true ? LikeTwoTone : LikeOutlined)}
                                <span className="comment-action">{  likes}</span>
                            </span>    <span onClick={() => {

                                if (iscollect === true) {
                                    setIscollect(false)
                                    setAction(false)
                                    CollectForum({
                                        user_id: userId,
                                        forum_id: state.record.forum_id
                                    })

                                } else {
                                    if (!Token) {
                                        message.info('请先登录');
                                    } else {
                                        setIscollect(true)
                                        setStars(stars + 1);
                                        setAction(true)
                                        DisCollectForum({
                                            user_id: userId,
                                            forum_id: state.record.forum_id
                                        })
                                    }
                                }

                            }}>
                                {createElement(iscollect === true ? StarTwoTone : StarOutlined)}
                                <span >{ stars}</span>
                            </span>
                        </div>
                    </Card>
                </Col>
                <Col lg={7} md={24}>
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
                            <Link to="/account/settings"><SettingOutlined key="setting" color="#FFB6C1" /></Link>,
                            <Link to="/post"><EditOutlined key="edit" color="#FFB6C1" /></Link>
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={author}
                            description="这家伙很懒，什么都没有..."
                        />
                    </Card>
                </Col>
                <Col lg={17} md={24}>
                    <Card>
                        <List
                            dataSource={comments}
                            header={` ${comments.length > 0 ? `${comments.length}条评论` : `暂无评论，快来加入讨论吧!`}`}
                            itemLayout="horizontal"
                            renderItem={(item) => CommentList(item)
                            }
                        ></List>
                        <Comment
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                            content={
                                <Editor
                                    onChange={handleChange}
                                    onSubmit={handleSubmit}
                                    submitting={submitting}
                                    value={value}
                                />
                            }
                        />
                    </Card>
                </Col>
                <Col lg={17} md={24}>
                </Col>
            </Row>
        </GridContent>
    );
};
export default Center;

