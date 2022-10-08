import React, { useState, useEffect, useRef } from 'react';
import { RouteContext, RouteContextType } from '@ant-design/pro-layout';
import { history } from 'umi';
// 组件
import NoFoundPage from '@/pages/404';
import Tags from './Tags';
// 样式
import styles from './index.less';

/**
 * @component TagView 标签页组件
 */
interface ITagView {
	children: React.ReactNode;
	home: string;
}
const TagView: React.FC<ITagView> = (props) => {
	const {
		children,
		home,
	} = props;

	const [tagList, setTagList] = useState<any[]>([]);
	const [DefaultTabPagePath, setDefaultTabPagePath] = useState<string>('/');

	const routeContextRef = useRef<RouteContextType>({});

	// 根据path编辑菜单
	const findCurrrntPathTag: (path: string, menuData: any[]) => any = (path, menuData) => {
		for (let i = 0; i < menuData.length; i++) {
			let item = menuData[i]
			if (item.path === path) {
				return item;
			} else if (item.children && item.children.length > 0) {
				const res = findCurrrntPathTag(path, item.children)
				if (res) {
					return res;
				}
			}
		}

	}

	// 初始化 visitedViews，设置project为首页
	const initTags = (routeContext: { menuData: any[]; currentMenu: any; }, defaultTabKey?: string | null) => {
		const { menuData } = routeContext;
		if (menuData && menuData.length > 0) {
			const firstTag = menuData.filter((el) => el.path === home)[0]; // 第一个菜单
			const defaultTag = defaultTabKey && defaultTabKey !== firstTag.path && findCurrrntPathTag(defaultTabKey, menuData) // 缓存的菜单
			history.push({
				pathname: defaultTag?.path || firstTag?.path,
				query: defaultTag?.query || firstTag?.query
			});
			const list = [{
				title: firstTag?.name,
				path: firstTag?.path,
				children,
				refresh: 0,
			}]
			if (defaultTag) {
				list.push({
					title: defaultTag.name,
					path: defaultTag.path,
					children,
					refresh: 0,
				})
			}
			setTagList(list);
			setDefaultTabPagePath(defaultTabKey || firstTag?.path)
		}
	};

	// 监听路由改变
	const handleOnChange = (routeContext: any) => {
		const { currentMenu } = routeContext;

		if (currentMenu?.path === '/') {
			currentMenu.path = '/workplace'
		}
		setDefaultTabPagePath(currentMenu?.path)

		const defaultTabKey = sessionStorage.getItem('DefaultTabPagePath')
		// tags初始化
		if (tagList.length === 0) {
			return initTags(routeContext, defaultTabKey);
		}
		// 判断是否已打开过该页面
		let hasOpen = false;
		// 页面内容未加载组件时，用404页面替代
		const newChildren = currentMenu?.component ? children : <NoFoundPage />
		const tagsCopy = tagList.map((item) => {
			if (currentMenu?.path === item.path) {
				hasOpen = true;
				// 刷新浏览器时，重新覆盖当前 path 的 children
				return {
					...item,
					children: newChildren,
				};
			} else {
				return { ...item };
			}
		});

		// 新的菜单不存在，并且新的菜单不是上级菜单时，追加一个tag并打开对应的页面
		if (!hasOpen && !currentMenu.redirect) {
			const title = routeContext.title || '';
			const path = currentMenu?.path;
			tagsCopy.push({
				title,
				path,
				children: newChildren,
				refresh: 0,
			});
		}
		sessionStorage.setItem('DefaultTabPagePath', currentMenu?.path)
		return setTagList(tagsCopy);
	};
	// 切换标签
	const handleChangeTag = (tag: any) => {
		sessionStorage.setItem('DefaultTabPagePath', tag)
	}

	// 关闭标签
	const handleCloseTag = (tag: any) => {
		const tagsCopy = [...tagList]
		// 判断关闭标签是否处于打开状态,false-关闭,true-打开
		const closeTagIsOpen = DefaultTabPagePath === tag.path
		// 关闭标签在标签组中的位置
		const findIndex = tagList.findIndex((el) => el.path === tag.path)
		// 关闭标签处于打开状态时，打开邻近的左侧标签
		if (closeTagIsOpen) {
			const next = tagList[findIndex - 1 || 0];
			history.push({ pathname: next?.path, query: next?.query });
		}
		setTagList(tagsCopy.filter((el) => el.path !== tag?.path));
	};

	// 关闭所有标签
	const handleCloseAll = () => {
		const tagsCopy = tagList.filter((el) => el.path === home);
		history.push(home);
		setTagList(tagsCopy);
	};

	// 关闭其他标签
	const handleCloseOther = (tag: any) => {
		const tagsCopy = tagList.filter(
			(el) => el.path === home || el.path === tag.path,
		);
		history.push({ pathname: tag?.path, query: tag?.query });
		setTagList(tagsCopy);
	};

	// 刷新选择的标签
	const handleRefreshTag = (tag: any) => {
		const tagsCopy = tagList.map((item) => {
			if (item.path === tag.path) {
				history.push({ pathname: tag?.path, query: tag?.query });
				return { ...item, refresh: item.refresh + 1 };
			}
			return { ...item };
		});
		setTagList(tagsCopy);
	};

	const generateChildComponent = () => {
		const findObj = tagList.find(item => item.path === DefaultTabPagePath) || {}
		return <div
			key={findObj.path}
			className={styles.children_view}
			style={{
				display: 'block',
			}}
		>
			{findObj.children}
		</div>
	}

	useEffect(() => {
		if (routeContextRef.current) {
			handleOnChange(routeContextRef.current);
		}
	}, [routeContextRef.current]);

	return (
		<>
			<RouteContext.Consumer>
				{(value: RouteContextType) => {
					routeContextRef.current = value;
					setTimeout(() => {
						setDefaultTabPagePath(value.currentMenu?.path || '/');
					}, 0);
					return null;
				}}
			</RouteContext.Consumer>

			<div className={styles.tag_view}>
				<div className={styles.tags_container}>
					<Tags
						defaultTabKey={DefaultTabPagePath}
						tagList={tagList}
						closeTag={handleCloseTag}
						closeAllTag={handleCloseAll}
						closeOtherTag={handleCloseOther}
						refreshTag={handleRefreshTag}
						changeTag={handleChangeTag}
					/>
				</div>
			</div>
			<div>
				{generateChildComponent()}
				{/* {tagList.map((item) => {
					return (
						<div
							key={item.path}
							className={styles.children_view}
							style={{
								display: item.path === DefaultTabPagePath ? 'block' : 'none',
							}}
						>
							{item.children}
						</div>
					);
				})} */}
			</div>
		</>
	);
};

export default TagView;