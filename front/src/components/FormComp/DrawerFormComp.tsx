/*
 * @Descripttion: react_hospital
 * @version: 1.0
 * @Author: zlh
 * @Date: 2022-06-06 11:09:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-09 12:02:29
 */
import { DrawerForm } from '@ant-design/pro-form';
import React from 'react';
import { IProFormItems } from './data';
import { generateCompItem } from './ModalFormComp';

export const DrawerFormContex = React.createContext({});

interface IDrawerFormComp {
  DrawerVisible?: boolean;
  maskClosable?: boolean;
  confirmLoading?: boolean;
  title: string;
  width?: string | number;
  ProFormItems?: IProFormItems[]; // 初始值
  initialValues?: any; // 初始值
  onClose: () => void;
  closable?: boolean;
  onFinish: (values: any) => Promise<boolean>;
}

const DrawerFormComp: React.FC<IDrawerFormComp> = (props) => {
  const {
    DrawerVisible,
    closable = true,
    maskClosable = true,
    confirmLoading = false,
    title,
    width,
    ProFormItems,
    initialValues,

    onClose,
    onFinish,
  } = props;

  return (
    <DrawerFormContex.Consumer>
      {(values: any) => {
        return (
          <DrawerForm<{
            name: string;
            company: string;
          }>
            visible={DrawerVisible}
            title={title}
            width={values.width || width}
            autoFocusFirstInput
            drawerProps={{
              onClose,
              maskClosable,
              destroyOnClose: true,
              closable,
              // centered: true
            }}
            onFinish={onFinish}
            initialValues={values?.initialValues || initialValues}
          >
            {/* {ProFormItems.map((item) => generateCompItem(item))} */}
            {(values?.ProFormItems || ProFormItems || []).map((item: IProFormItems) =>
              generateCompItem(item),
            )}
          </DrawerForm>
        );
      }}
    </DrawerFormContex.Consumer>
  );
};

export default DrawerFormComp;
