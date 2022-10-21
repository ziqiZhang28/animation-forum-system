import React from 'react';
import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { useHistory, useRequest } from 'umi';
import { Avatar, List, Tag } from 'antd';
import type { ListItemDataType } from '../../data.d';
import { queryFakeList } from '../../service';
import styles from './index.less';
import moment from 'moment';

const Articles: React.FC = () => {
    const IconText: React.FC<{
        icon: React.ReactNode;
        text: React.ReactNode;
    }> = ({ icon, text }) => (
        <span>
            {icon} {text}
        </span>
        );
    const history = useHistory();
    const updatedAt = '2022-10'
    const content = '111111'
    const owner='小可爱'
    // 获取tab列表数据
    const { data: listData } = useRequest(() => {
        return queryFakeList({
            count: 30,
        });
    });
    const toDetail = (record?: any) => {
        console.log(record);
        history.push({ pathname: '/detail', state: { id: record.title } })

    };
    return (
        <List<ListItemDataType>
            // size="large"
            className={styles.articleList}
            rowKey="id"
            itemLayout="vertical"
            dataSource={listData?.list || []}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    

                >
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

                            <em> <a >{owner}</a> 发布于 {moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
                        </div>
                    </div>

                </List.Item>
            )}
        />
    );
};

export default Articles;
