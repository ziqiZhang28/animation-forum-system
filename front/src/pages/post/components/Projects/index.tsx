
import React, { useEffect, useState } from 'react';
import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { useHistory, useLocation, useRequest } from 'umi';
import { Avatar, List, Tag } from 'antd';
import type { ListItemDataType } from '../../data';
import { queryFakeList } from '../../service';
import styles from './index.less';
import moment from 'moment';
import { GetHotPostById, GetPostListById, GetPostListByTime } from '@/services/post/post';

const Projects: React.FC = () => {
    //使用钩子获取state
    const { state } = useLocation<any>();
    const [list, SetList] = useState<any>()
    const handledata = async () => {
        console.log("state",state);
        
        const res = await GetPostListByTime({ classify_id: state.classify_id })
        SetList(res)

    }
    useEffect(() => {
        handledata()

    }, [])

    const history = useHistory();
    // 获取tab列表数据
    const toDetail = (record?: any) => {
        history.push({ pathname: '/detail', state: { record:record} })

    };
    const postItem = (item: any) => {
        return (
            <List.Item key={item.id}>
                <List.Item.Meta
                    title={
                        <a className={styles.listItemMetaTitle} onClick={() => toDetail(item)}>
                            {item.title}
                        </a>
                    }
                />
                <div className={styles.listContent}>
                    <div className={styles.extra}>
                        <Avatar src='https://www.dmoe.cc/random.php' size="small" />
                        <em> <a >{item.nickname}</a> 发布于 {item.create_time}</em>
                    </div>
                </div>
            </List.Item>
        )
    }
    return (
        <List<ListItemDataType>
            // size="large"
            className={styles.articleList}
            rowKey="id"
            itemLayout="vertical"
            // dataSource={listData?.list || []}
            dataSource={list || []}
            renderItem={(item) => postItem(item)}

        />
    );
};

export default Projects;
