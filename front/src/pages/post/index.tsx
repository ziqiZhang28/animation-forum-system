import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Input, List, Row, Tag, Tooltip } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import { RouteChildrenProps, useHistory, useLocation } from 'react-router';
// import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import type { CurrentUser, TagType, tabKeyType } from './data.d';
import { queryCurrent } from './service';
import styles from './Center.less';
import Meta from 'antd/lib/card/Meta';
import { GetPostListById } from '@/services/post/post';
import Projects from './components/Projects';

const operationTabList = [
    {
        key: 'articles',
        tab: (
            <span>
                全部 <span style={{ fontSize: 14 }}></span>
            </span>
        ),
    },
    {
        key: 'applications',
        tab: (
            <span>
                最热 <span style={{ fontSize: 14 }}></span>
            </span>
        ),
    },
    {
        key: 'projects',
        tab: (
            <span>
                最新 <span style={{ fontSize: 14 }}></span>
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
    const [title, setTitle] = useState<any>()
    const [description,setDescription]=useState<any>()
    const [tabKey, setTabKey] = useState<tabKeyType>('articles');
    //使用钩子获取state
    const { state } = useLocation<any>();
    const history = useHistory();

    const handledata = async () => {
        
        const list = await GetPostListById({classify_id:state.classify_id})
    
        setTitle(state.title)
        setDescription(state.description)

    }
    useEffect(() => {
        handledata()

    }, [])
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

    const toWirte = () => {

        history.push({ pathname: '/write', state: { classify_id: state.classify_id } })

    };

    return (
        <GridContent>
            <Row gutter={[16,4]}>
                <Col lg={17} md={24}>
                        <div className={styles.divContent}>
                            <img src='https://www.dmoe.cc/random.php' />
                        </div>
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
                    ><div style={{ color: 'black', fontSize: '18px',marginBottom:'5px' }}>{title}</div>
                        <div style={{ color: 'grey', fontSize: '14px', marginBottom: '5px' }}>{description}</div>
                        
                        {/* <Meta
                            // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            
                            title={title}
                            description={description}
                        ></Meta> */}
                        <Button type="primary" shape='round' onClick={() => toWirte()}><EditOutlined />发布帖子</Button>
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
