import React, { useRef, useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormInstance, ProFormSelect } from '@ant-design/pro-form';
import { Divider, Space, Tooltip, } from 'antd';
// API
import { debounceDuration, ItemCodeTestReg } from '@/utils/util';
import { QueryDictionaryByCode, QueryDictionaryGetItem } from '@/services/system/dataDictionary';
import { CreateDataDictionaryItem } from '@/services/system/dataDictionaryItem';
// 组件
import ProFormComp from './ProFormComp';
import { IProFormItems } from './data';
// 样式
import styles from './index.less'

const ProFormItems: IProFormItems[] = [
  {
    name: 'name',
    placeholder: "字典项名称",
    rules: [{ required: true }, { max: 30, message: '最长 30位字符' }],
    width: 120,
  },
  {
    name: 'code',
    placeholder: "字典项编码",
    rules: [
      { required: true },
      {
        pattern: ItemCodeTestReg,
        message: '1~64位字母或数字'
      }
    ],
    width: 120
  },
]

const DictionaryProSelect: React.FC<any> = (props) => {
  const FormRef: any = useRef<ProFormInstance>();

  const { code,showAddorNot } = props;

    const [Options, SetOptions] = useState([])
   
  const RequestDictionaryItemsByCode = async (params?: any) => {
    const data = {
      code: code,
      name: params?.keyWords || null,
    };
    const res = await QueryDictionaryGetItem(data);
    SetOptions(res)
    return res;
  };

  const onFormSubmit = async (values: any) => {
    const res = await QueryDictionaryByCode({ code })

    const data = {
      ...values,
      parentId: res.id,
    }
    await CreateDataDictionaryItem(data)
    FormRef.current?.resetFormValues()
    RequestDictionaryItemsByCode()
    return true
  }

  useEffect(() => {
    RequestDictionaryItemsByCode()
  }, [code])

  return (
    <ProFormSelect
      debounceTime={debounceDuration}
      showSearch
      {...props}
      options={Options}
      fieldProps={{
        showArrow: true,
        ...(props?.fieldProps || {}),
        fieldNames: { value: 'code', label: 'name' },
        dropdownMatchSelectWidth: false,
        optionItemRender: (item) => <>
          {item.name}({item.code})
        </>,
        dropdownRender: menu => (
          <>
            {menu}

              { !showAddorNot &&
               <div style={{ textAlign: 'center' }}>
              <Divider style={{ margin: '8px 0' }} />
              <Space align="center" style={{ padding: '0 8px' }}>
                <div className={styles.ProFormContainer}>
                  <ProFormComp
                    ref={FormRef}
                    formLayoutType="inline"
                    ProFormItems={ProFormItems}
                    showSubmitter={false}
                    submitter={{
                      searchConfig: {
                        submitText: false,
                      },
                      resetButtonProps: false,
                      submitButtonProps: {
                        type: 'link',
                        icon: <Tooltip title="添加"><PlusOutlined /></Tooltip>,
                      },
                    }}
                    onSubmit={onFormSubmit}
                  />
                </div>
              </Space>
            </div>
            }
           
          </>
        )
      }}

    />
  );
};

export default DictionaryProSelect;
 
