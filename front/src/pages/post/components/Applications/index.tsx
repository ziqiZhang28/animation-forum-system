import React from 'react';
import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { useRequest } from 'umi';
import { Avatar, List, Tag } from 'antd';
import type { ListItemDataType } from '../../data.d';
import { queryFakeList } from '../../service';
import styles from './index.less';
import moment from 'moment';

const Applications: React.FC = () => {
    const IconText: React.FC<{
        icon: React.ReactNode;
        text: React.ReactNode;
    }> = ({ icon, text }) => (
        <span>
            {icon} {text}
        </span>
    );
    const updatedAt = '2022-10'
    const content = '111111'
    const owner = '小可爱'
    // 获取tab列表数据
    const { data: listData } = useRequest(() => {
        return queryFakeList({
            count: 30,
        });
    });
    return (
        <List<ListItemDataType>
            size="large"
            className={styles.articleList}
            rowKey="id"
            itemLayout="vertical"
            dataSource={listData?.list || []}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
                        <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
                        <IconText key="message" icon={<MessageFilled />} text={item.message} />,
                    ]}
                >
                    <List.Item.Meta
                        title={
                            <a className={styles.listItemMetaTitle} href={item.href}>
                                {item.title}
                            </a>
                        }
                    />
                    <div className={styles.listContent}>
                        {/* <div className={styles.description}>{content}</div> */}
                        <div className={styles.extra}>
                            <Avatar src='https://www.dmoe.cc/random.php' size="small" />

                            <em> <a >{owner}</a> 发布于 {moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
                        </div>
                    </div>
                    {/* <ArticleListContent data={item} /> */}

                </List.Item>
            )}
        />
    );
};

export default Applications;
