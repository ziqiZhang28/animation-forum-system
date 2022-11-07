import { useRequest } from 'ahooks';
import { Card, List, message, Comment, Avatar } from 'antd'
import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router';
import { queryActivities } from './service';
import styles from './style.less';

export default function index() {
    const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
    const { state } = useLocation<any>();
    const history = useHistory();
    const toDetail = (record?: any) => {
        console.log("record", record);

        history.push({ pathname: '/detail', state: { record: record } })

    };
    const postItem = (item: any) => {
        // console.log("item", item);
        return (
            <List.Item key={item.forum_id} onClick={() => toDetail(item)}>
                <Comment
                    key={item.forum_id}
                    author={item.nickname}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    content={item.content}
                    datetime={item.create_time}
                />
            </List.Item>

        )
    }

    useEffect(() => {
        console.log("state", state);

    }, [])



    return (
        <Card
            bodyStyle={{ padding: 0 }}
            bordered={false}
            className={styles.activeCard}
            title="搜索结果"
            loading={activitiesLoading}
        >
            <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={state.record}
                size="large"
                renderItem={(item) => postItem(item)}

            />
        </Card>
    )
}
