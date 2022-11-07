/*
 * @Descripttion: react_hospital
 * @version: 1.0
 * @Author: zlh
 * @Date: 2022-07-01 16:00:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-21 15:31:21
 */
import { useEffect, useRef, useState } from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { Divider } from 'antd';
import { debounceDuration } from '@/utils/util';
// API

const RollingProSelect: React.FC<any> = (props) => {
  const selectTaleRef = useRef<any>();

  const {
    fieldNames = { value: 'id', label: 'name' },
    dependencyValue = '',
    Options,
    TotalCount = Options.length,
    onDataChange
  } = props;

  const [CurrentPage, SetCurrentPage] = useState<number>(1); // 页码
  const [SearchText, SetSearchText] = useState<string>(); // 查询关键词

  useEffect(() => {
    // 防抖
    const timeOut = setTimeout(() => {
      if (CurrentPage === 1) {
        // 完成查询后，滚动到第一行
        selectTaleRef.current?.scrollTo(0)
      }
      onDataChange(CurrentPage, SearchText)
    }, 50)

    return () => clearTimeout(timeOut)
  }, [CurrentPage, SearchText])

  useEffect(() => {
    if (dependencyValue) {
      selectTaleRef.current?.scrollTo(0)
      if (CurrentPage === 1) {
        onDataChange(CurrentPage, SearchText)
      } else {
        SetCurrentPage(1)
      }
    }
  }, [dependencyValue])

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
        dropdownRender: menu => (
          <>
            {menu}
            {Options?.length === TotalCount &&
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

export default RollingProSelect;
