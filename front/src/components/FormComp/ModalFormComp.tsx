import commonStyles from '@/common.less';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Modal } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { IProFormItems } from './data';
import type { IProFormCompRef } from './ProFormComp';

export const ModalFormContex = React.createContext({});

export const generateCompItem = (item: IProFormItems) => {
  const defaultItem = (
    <ProFormText
      allowClear
      key={item.name}
      width={item.width}
      name={item.name}
      disabled={item.disabled}
      label={item.label}
      tooltip={item.tooltip}
      placeholder={item.placeholder}
      rules={item.rules}
      extra={item.extra}
      // fieldProps={{
      //   size: 'large',
      //   prefix: <MailTwoTone />,
      // }}
      // initialValue="启途"
    />
  );
  if (item.type === 'group') {
    // 组合
    return (
      <ProForm.Group key={item.name || Math.random() * 500} title={item.label} extra={item.extra}>
        {Array.isArray(item.inputForm)
          ? item.inputForm.map((ele: IProFormItems) => generateCompItem(ele))
          : item.inputForm || defaultItem}
      </ProForm.Group>
    );
  } else if (item.type === 'item') {
    return (
      <ProForm.Item
        key={item.name || Math.random() * 500}
        name={item.name}
        label={item.label}
        extra={item.extra}
      >
        {Array.isArray(item.inputForm)
          ? item.inputForm.map((ele: IProFormItems) => generateCompItem(ele))
          : item.inputForm || defaultItem}
      </ProForm.Item>
    );
  } else if (item.inputForm) {
    // 其他表单元素
    return <span key={item.name}>{item.inputForm}</span>;
  } else {
    // 默认文本框
    return defaultItem;
  }
};

const simpleClass = Math.random().toString(36).substring(2);
let contain: any, header: any, modalContent: any;
let mouseDownX = 0,
  mouseDownY = 0,
  deltaX = 0,
  deltaY = 0,
  sumX = 0,
  sumY = 0;

interface IModalFormComp {
  ModalVisible: boolean;
  maskClosable?: boolean;
  confirmLoading?: boolean;
  title: string;
  width?: string | number;
  ProFormItems?: IProFormItems[]; // 初始值
  initialValues?: any; // 初始值
  submitter?: any;
  otherSubmitter?: any[];
  onCancel: () => void;
  onFinish: (values: any) => Promise<boolean>;
}

const ModalFormComp = forwardRef<IProFormCompRef, IModalFormComp>((props, ref) => {
  const formRef = useRef<ProFormInstance>();

  const {
    ModalVisible,
    maskClosable = true,
    confirmLoading = false,
    title,
    width,
    ProFormItems,
    initialValues,
    otherSubmitter = [],
    submitter,
    onCancel,
    onFinish: handleFinish,
  } = props;

  // 修改表单元素
  const changeFormValues = (values?: any) => {
    formRef.current?.setFieldsValue(values || {});
  };
  // 重置表单元素
  const resetFormValues = () => {
    formRef.current?.resetFields();
  };
  // 获取表单值
  const getFormFormatValues = () => {
    const formatValues = formRef.current?.getFieldsFormatValue?.(true);
    return formatValues;
  };

  // 将子组件的方法暴露给父组件
  useImperativeHandle(ref, () => ({
    changeFormValues,
    resetFormValues,
    getFormFormatValues,
  }));
  const handdleCancel = () => {
    Modal.destroyAll();
    onCancel();
  };
  const onFinish = async (values: any) => {
    setTimeout(() => {
      handleFinish(values);
    }, 20);
  };

  // 模态框可拖拽
  const handleMove = (event: any) => {
    deltaX = event.pageX - mouseDownX;
    deltaY = event.pageY - mouseDownY;
    modalContent.style.transform = `translate(${deltaX + sumX}px, ${deltaY + sumY}px)`;
  };
  const removeMove = () => {
    window.removeEventListener('mousemove', handleMove, false);
  };
  const removeUp = () => {
    document.body.onselectstart = () => true;
    sumX = sumX + deltaX;
    sumY = sumY + deltaY;
    removeMove();
  };
  const initialEvent = (visible: boolean) => {
    if (title && visible) {
      setTimeout(() => {
        window.removeEventListener('mouseup', removeUp, false);

        contain = document.getElementsByClassName(simpleClass)[0];
        header = contain?.getElementsByClassName('ant-modal-header')[0];
        modalContent = contain?.getElementsByClassName('ant-modal-content')[0];

        header.style.cursor = 'all-scroll';
        header.onmousedown = (e: any) => {
          mouseDownX = e.pageX;
          mouseDownY = e.pageY;
          document.body.onselectstart = () => false;
          window.addEventListener('mousemove', handleMove, false);
        };

        window.addEventListener('mouseup', removeUp, false);
      }, 0);
    }
  };

  useEffect(() => {
    changeFormValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    initialEvent(ModalVisible);
    return () => {
      removeMove();
      window.removeEventListener('mouseup', removeUp, false);
    };
  }, [ModalVisible]);

  return (
    <ModalFormContex.Consumer>
      {(values: any) => {
        if (values?.initialValues) {
          changeFormValues(initialValues);
        }
        return (
          <ModalForm<{
            name: string;
            company: string;
          }>
            formRef={formRef}
            className={commonStyles.modalForm}
            visible={ModalVisible}
            title={title}
            width={values.width || width}
            autoFocusFirstInput
            modalProps={{
              onCancel: handdleCancel,
              maskClosable,
              confirmLoading,
              centered: true,
              destroyOnClose: true,
              wrapClassName: simpleClass,
              bodyStyle: { maxHeight: 'calc(100vh - 132px)', overflowY: 'auto' },
            }}
            onFinish={onFinish}
            // initialValues={values?.initialValues || initialValues}
            submitter={{
              ...submitter,
              render: (_props, defaultDoms) => {
                return [...defaultDoms, ...otherSubmitter];
              },
            }}
          >
            {(values?.ProFormItems || ProFormItems || []).map((item: IProFormItems) =>
              generateCompItem(item),
            )}
          </ModalForm>
        );
      }}
    </ModalFormContex.Consumer>
  );
});

export default ModalFormComp;
