import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Comment, Button, Card, Col, Divider, Input, List, Row, Tag, Tooltip, Form } from 'antd';
import React, { useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import type { RouteChildrenProps } from 'react-router';
import styles from './Center.less';
import Meta from 'antd/lib/card/Meta';
import { queryActivities } from '../dashboard/home/service';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';




const Center: React.FC<RouteChildrenProps> = () => {
    const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
    const { TextArea } = Input;
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const part={html:'dfgrefer<br/>'}
    const handleSubmit = () => {
        if (!value) return;

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
    };
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };
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
    const CommentList = ({ comments }: { comments: CommentItem[] }) => (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={props => <Comment {...props} />}
        />
    );
    const ExampleComment: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
        <Comment
            actions={[<span key="comment-nested-reply-to">Reply to</span>]}
            author={<a>Han Solo</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure).
                </p>
            }
        >
            {children}
        </Comment>
    );
    const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
        <>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    添加评论
                </Button>
            </Form.Item>
        </>
    );
    return (
        <GridContent>
            <Row gutter={[16,4]}>
                
                <Col lg={17} md={24}>

                    <Card
                        size="default"
                        headStyle={{ fontWeight:'bold'}}
                        title="帖子名称1"
                    >
                        帖子内容<br/>
                        无语而后疯狂的发布的两款<br/>
                        打击报复的空间<br/>
                        fdkvndkl/<br />
                        dahcboacb<br />
                        的就是比萨饼彻底<br />
                        帖子内容<br />
                        无语而后疯狂的发布的两款<br />
                        打击报复的空间<br />
                        fdkvndkl/<br />
                        dahcboacb<br />
                        的就是比萨饼彻底<br />
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
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                </Col>
                <Col lg={17} md={24}>

                    <Card
                        bodyStyle={{ padding: 0 }}
                        bordered={false}
                        className={styles.activeCard}
                        title="评论区"
                        loading={activitiesLoading}
                    >
                        <ExampleComment>
                            <ExampleComment>
                                <ExampleComment />
                                <ExampleComment />
                            </ExampleComment>
                        </ExampleComment>
                    </Card>
                </Col>
                
                <Col lg={17} md={24}>
                    <Card>
                        {comments.length > 0 && <CommentList comments={comments} />}
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
            </Row>
        </GridContent>
    );
};
export default Center;
