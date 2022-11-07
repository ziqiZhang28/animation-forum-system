import { useEffect, useRef, useState } from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { Divider, Typography } from 'antd';
import { debounceDuration } from '@/utils/util';
// API
// 样式
import SelectTableStyles from '@/components/SelectTableComp/index.less'

const RollingProSelectTable: React.FC<any> = (props) => {
  const selectTaleRef = useRef<any>();

  const {
    selectTableColWidth = 220,
    SelectTableColumns = [],
    fieldNames = { value: 'id', label: 'name' },
    Options,
    TotalCount = Options.length,
    onDataChange,
  } = props;

  const [CurrentPage, SetCurrentPage] = useState<number>(1); // 页码
  const [SearchText, SetSearchText] = useState<string>(); // 查询关键词

  useEffect(() => {
    // 防抖
    const timeOut = setTimeout(() => {
      onDataChange(CurrentPage, SearchText)
      // 完成查询后，滚动到第一行
      selectTaleRef.current?.scrollTo(0)
    }, 50)

    return () => clearTimeout(timeOut)
  }, [CurrentPage, SearchText])


  return (
    <ProFormSelect
      showSearch
      allowClear
      debounceTime={debounceDuration}
      {...props}
      fieldProps={{
        ref: selectTaleRef,
        fieldNames,
        labelInValue: true,
        showArrow: true,
        dropdownMatchSelectWidth: false,
        onPopupScroll: (e) => {
          e.persist();
          const { scrollTop, scrollHeight, clientHeight }: any = e.target;
          const isTouchBottom = (scrollHeight - scrollTop) === clientHeight; // 是否触底            
          if (isTouchBottom && Options.length < TotalCount) {
            SetCurrentPage(CurrentPage + 1);
          }
        },
        options: Options,
        onSearch: (keyword?: string) => {
          SetSearchText(keyword)
          SetCurrentPage(1);
        },
        optionItemRender: (item: any) => {
          return (
            <div
              key={item.id}
              title={item.name}
            >
              {SelectTableColumns.map((tItemCol: any) => <span
                key={tItemCol.dataIndex + item.id}
                className='selectTableColCeil'
                style={{
                  width: selectTableColWidth,
                }}
              >
                <Typography.Text ellipsis>{item[tItemCol.dataIndex]}</Typography.Text>
              </span>
              )}
            </div>
          );
        },
        dropdownRender: menu => (
          <>
            <div className={SelectTableStyles.selectTableTitleRow}>
              {SelectTableColumns.map((tItemCol: any) => <span
                key={tItemCol.dataIndex}
                className={SelectTableStyles.selectTableTitleCeil}
                style={{ width: selectTableColWidth }}
              >
                {tItemCol.title}
              </span>
              )}
            </div>
            {menu}
            {Options.length === TotalCount &&
              <div style={{ textAlign: 'center' }}>
                <Divider style={{ margin: '8px 0' }} />
                <span className='remarkFontColorLight'>数据已全部加载</span>
              </div>
            }
          </>
        )
      }}
    />
  );
};

export default RollingProSelectTable;
