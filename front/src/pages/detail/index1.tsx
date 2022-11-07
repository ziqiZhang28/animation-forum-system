import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Comment, Button, Card, Col, Divider, Input, List, Row, Tag, Tooltip, Form } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import { RouteChildrenProps, useLocation } from 'react-router';
import styles from './Center.less';
import Meta from 'antd/lib/card/Meta';
import { queryActivities } from '../dashboard/home/service';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { GetCommentList, GetPostDetail } from '@/services/post/post';
import ProCard from '@ant-design/pro-card';


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

const Center: React.FC<RouteChildrenProps> = () => {
    const [title,setTitle]=useState<any>()
    const { state } = useLocation<any>();
    const [content, setContent] = useState<any>()
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const [createComment, handleCreateComment] = useState<boolean>(false)
    const { TextArea } = Input;
    const handledata = async () => {
        console.log("state",state);
        
        const res = await GetPostDetail({ forum_id: state.record.forum_id })
        const resComment = await GetCommentList({ forum_id: state.record.forum_id })

        setTitle(res.title)
        setContent(res.content)
        console.log("resComment", resComment);
    }
    useEffect(() => {
        handledata()

    }, [])
    
    const onhandleCancle = () => {
        handleCreateComment(false)
        console.log("222");

    }
    const Editor1 = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
        <>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    提交回复
                </Button>    
            </Form.Item>
        </>
    );
    const Editor2 = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
        <>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    提交回复
                </Button>    <Button htmlType="submit" loading={submitting} onClick={onhandleCancle} >
                    取消
                </Button>
            </Form.Item>
        </>
    );
    const Reply = () => {
        handleCreateComment(true)
        console.log("111");
        
    }

    const ExampleComment: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
        <Comment
            actions={[<span key="comment-nested-reply-to" onClick={Reply}>回复</span>]}
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
        console.log("e.va", e.target.value);
        
    };
    

    return (
        <GridContent>
            <Row gutter={[16,4]}>
                
                <Col lg={17} md={24}>

                    <Card
                        size="default"
                        headStyle={{ fontWeight:'bold'}}
                        title={title}
                    >
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
                    <Card>
                        {comments.length > 0 && <CommentList comments={comments} />}
                        <Comment
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                            content={
                                <Editor1
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
                    <Card title="交流区">
                        <ExampleComment>
                            <ExampleComment>
                                {createComment &&
                                    <Comment
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                        content={
                                            <Editor2
                                                onChange={handleChange}
                                                onSubmit={handleSubmit}
                                                submitting={submitting}
                                                value={value}
                                            />
                                        }
                                    />}
                            </ExampleComment>
                        </ExampleComment>
                    </Card>
                </Col>
            </Row>
        </GridContent>
    );
};
export default Center;
