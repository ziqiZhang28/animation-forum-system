import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import type { RouteChildrenProps } from 'react-router';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import type { CurrentUser, TagType, tabKeyType } from './data.d';
import { queryCurrent } from './service';
import styles from './Center.less';
import { GetUserByToken } from '@/services/user/login';

const operationTabList = [
    {
        key: 'articles',
        tab: (
            <span>
                我的帖子 <span style={{ fontSize: 14 }}></span>
            </span>
        ),
    },
    {
        key: 'applications',
        tab: (
            <span>
                我的收藏 <span style={{ fontSize: 14 }}></span>
            </span>
        ),
    },
    {
        key: 'projects',
        tab: (
            <span>
                我的喜欢 <span style={{ fontSize: 14 }}></span>
            </span>
        ),
    },
];

const TagList: React.FC<{ tags: CurrentUser['tags'] }> = ({ tags }) => {
    const ref = useRef<Input | null>(null);
    const [newTags, setNewTags] = useState<TagType[]>([]);
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');


    const showInput = () => {
        setInputVisible(true);
        if (ref.current) {
            // eslint-disable-next-line no-unused-expressions
            ref.current?.focus();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        let tempsTags = [...newTags];
        if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
            tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue }];
        }
        setNewTags(tempsTags);
        setInputVisible(false);
        setInputValue('');
    };

    return (
        <div className={styles.tags}>
            <div className={styles.tagsTitle}>标签</div>
            {(tags || []).concat(newTags).map((item) => (
                <Tag key={item.key}>{item.label}</Tag>
            ))}
            {inputVisible && (
                <Input
                    ref={ref}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
                    <PlusOutlined />
                </Tag>
            )}
        </div>
    );
};

const Center: React.FC<RouteChildrenProps> = () => {
    const [tabKey, setTabKey] = useState<tabKeyType>('articles');
    const Token = sessionStorage.getItem('token')
    const [nickName, setNickName] = useState<any>()
    const [userface, setUserface] = useState<any>()
    const [userId, setUserId] = useState<any>()
    const [description, setDescription] = useState<any>()

    

    const handledata = async () => {
        let userDetail: any
        
        userDetail = await GetUserByToken({ Token: Token })
        if (userDetail) {
            setNickName(userDetail.nickname)
            setUserface(userDetail.userface)
            setUserId(userDetail.user_id)
            setDescription(userDetail.depiction)
        } 
        console.log("user2", userDetail);

    }



useEffect(() => {
    handledata()

}, [])
//  获取用户信息
const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
});

//  渲染用户信息
const renderUserInfo = ({ title, group, geographic }: Partial<CurrentUser>) => {
    return (
        <div className={styles.detail}>
            <p>
                <ContactsOutlined
                    style={{
                        marginRight: 8,
                    }}
                />
                {title}
            </p>
            <p>
                <ClusterOutlined
                    style={{
                        marginRight: 8,
                    }}
                />
                {group}
            </p>
            <p>
                <HomeOutlined
                    style={{
                        marginRight: 8,
                    }}
                />
                {(geographic || { province: { label: '' } }).province.label}
                {
                    (
                        geographic || {
                            city: {
                                label: '',
                            },
                        }
                    ).city.label
                }
            </p>
        </div>
    );
};

// 渲染tab切换
const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'projects') {
        return <Projects />;
    }
    if (tabValue === 'applications') {
        return <Applications />;
    }
    if (tabValue === 'articles') {
        return <Articles />;
    }
    return null;
};

return (
    <GridContent>
        <Row gutter={24}>
            <Col lg={7} md={24}>
                <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
                    {!loading  && (
                        <div>
                            <div className={styles.avatarHolder}>
                                <img alt="" src={userface} />
                                <div className={styles.name}>{nickName}</div>
                                <div>{description}</div>
                            </div>
                            {/* {renderUserInfo(currentUser)} */}
                            <Divider dashed />
                            {/* <TagList tags={tagList|| []} /> */}
                            <div>
                                <Tag color="magenta">萌妹子</Tag>
                                <Tag color="red">二次元</Tag>
                                <Tag color="volcano">抠脚大汉</Tag>
                                <Tag color="orange">00后</Tag>
                                <Tag color="purple">大叔</Tag>
                            </div>
                            <Divider style={{ marginTop: 16 }} dashed />
                        </div>
                    )}
                </Card>
            </Col>
            <Col lg={17} md={24}>
                <Card
                    className={styles.tabsCard}
                    bordered={false}
                    tabList={operationTabList}
                    activeTabKey={tabKey}
                    onTabChange={(_tabKey: string) => {
                        setTabKey(_tabKey as tabKeyType);
                    }}
                >
                    {renderChildrenByTabKey(tabKey)}
                </Card>
            </Col>
        </Row>
    </GridContent>
);
};
export default Center;
