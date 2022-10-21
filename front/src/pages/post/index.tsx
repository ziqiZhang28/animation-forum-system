import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Input, List, Row, Tag, Tooltip } from 'antd';
import React, { useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import type { RouteChildrenProps } from 'react-router';
// import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import type { CurrentUser, TagType, tabKeyType } from './data.d';
import { queryCurrent } from './service';
import styles from './Center.less';
import Meta from 'antd/lib/card/Meta';

const operationTabList = [
    {
        key: 'articles',
        tab: (
            <span>
                全部 <span style={{ fontSize: 14 }}>(8)</span>
            </span>
        ),
    },
    {
        key: 'applications',
        tab: (
            <span>
                最热 <span style={{ fontSize: 14 }}>(8)</span>
            </span>
        ),
    },
    {
        key: 'projects',
        tab: (
            <span>
                最新 <span style={{ fontSize: 14 }}>(8)</span>
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

    // 渲染tab切换
    const renderChildrenByTabKey = (tabValue: tabKeyType) => {
        // if (tabValue === 'projects') {
        //   return <Projects />;
        // }
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
            <Row gutter={[16,4]}>
                <Col lg={17} md={24}>
                    {/* <Card> */}
                        <div className={styles.divContent}>
                            <img src='https://www.dmoe.cc/random.php' />
                        </div>
                    {/* </Card> */}
                </Col>
                <Col lg={7} md={24}>
                    <Card
                        // style={{ width: 300 }}
                        // style={{ marginBottom: 24 }}
                        style={{ textAlign: "center" }}
                        cover={
                            <img
                                alt="example"
                                src="https://www.dmoe.cc/random.php"
                            />
                        }
                        actions={[
                            <p>阅读量</p>,

                            <p>贴子数</p>
                            // <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            
                            title="板块名称"
                            description="This is the description"
                        />
                        <Button shape='round'>发布帖子</Button>
                    </Card>
                    {/* <Card
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
                    </Card> */}
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
