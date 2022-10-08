import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Button, Dropdown, Menu, Tabs } from 'antd';

import styles from './index.less';
import { RightOutlined } from '@ant-design/icons';

const homePath = '/workplace'

const OperationList = [
    { key: 'refresh', title: '刷新' },
    { key: 'closeOther', title: '关闭其他' },
    { key: 'closeAll', title: '关闭所有' },
]
interface ITags {
    defaultTabKey: string;
    tagList: any[];
    closeTag: (values: any) => void;
    closeAllTag: () => void;
    closeOtherTag: (values: any) => void;
    refreshTag: (values: any) => void;
    changeTag: (values: any) => void
}
const Tags: React.FC<ITags> = (props) => {
    const {
        defaultTabKey,
        tagList,
        closeTag,
        closeAllTag,
        closeOtherTag,
        refreshTag,
        changeTag
    } = props
    const [ActiveTabsPath, SetActiveTabsPath] = useState<string>(homePath);
    // const [currentTag, setCurrentTag] = useState();

    const handleMenuClick = ({ key }: any) => {
        const item = tagList.find((item: any) => item.path === ActiveTabsPath)
        // console.log(tagList, key, item, ActiveTabsPath)
        // setCurrentTag(item)
        if (key === 'refresh') {
            refreshTag(item);
        } else if (key === 'closeOther') {
            closeOtherTag(item);
        } else if (key === 'closeAll') {
            closeAllTag();
        }
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
            {OperationList.map(item => <Menu.Item key={item.key}>{item.title}</Menu.Item>)}
        </Menu>
    );
    const onTabsChange = (value: string) => {
        const item = tagList.find((item: any) => item.path === value)
        changeTag(item)
        SetActiveTabsPath(value)
        history.push({ pathname: item.path, query: item.query })
    }
    const onEdit = (targetKey: any, action: any) => {
        if (action === 'remove') {
            const item = tagList.find((item: any) => item.path === targetKey)
            closeTag(item)
        }
    }

    useEffect(() => {
        SetActiveTabsPath(defaultTabKey)
    }, [defaultTabKey]);

    return (

        <div className={styles.tags_wrapper}>
            <Tabs
                className={styles.TabsSelector}
                type="editable-card"
                size="small"
                hideAdd
                tabBarGutter={4}
                onEdit={(targetKey, action) => onEdit(targetKey, action)}
                onChange={onTabsChange}
                activeKey={ActiveTabsPath}
                tabBarExtraContent={(
                    <Dropdown
                        overlay={menu}
                        placement='bottomRight'
                    >
                        <Button
                            className={styles.moreBtn}
                        >关闭操作 <RightOutlined />
                        </Button>
                    </Dropdown>
                )}
            >
                {tagList.map((item: any, i: number) => (
                    <Tabs.TabPane
                        tab={item.title}
                        key={item.path}
                        closable={item.path !== homePath}
                        style={{ borderRadius: '6px' }}
                    />
                ))}
            </Tabs>
        </div>
    );
};

export default Tags;