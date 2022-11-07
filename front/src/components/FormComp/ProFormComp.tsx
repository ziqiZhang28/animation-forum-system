import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';
import { Col, Row, Space } from 'antd';
import type { FormLayout } from 'antd/lib/form/Form';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { IProFormItems } from './data';
import { generateCompItem } from './ModalFormComp';

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

type IProFormComp = {
  formLayoutType?: FormLayout; // 'horizontal', 'vertical', 'inline'
  grid?: boolean;
  gutter?: number;
  initialValues?: any;
  ProFormItems: any[];
  showSubmitter?: boolean;
  submitter?: any;
  onValuesChange?: (values: any) => void;
  onSubmit: (values: any) => Promise<boolean>;
};
// 暴露给父组件的方法
export type IProFormCompRef = {
  resetFormValues: () => void;
  changeFormValues: (data?: any) => void;
  getFormFormatValues: () => any;
};
const ProFormComp = forwardRef<IProFormCompRef, IProFormComp>((props, ref) => {
  const formRef = useRef<ProFormInstance>();

  const {
    formLayoutType = 'vertical',
    grid = false,
    gutter = 16,
    initialValues = {},
    ProFormItems,
    showSubmitter = true,
    submitter,
    onValuesChange: handdleValuesChange,
    onSubmit: onFinish,
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

  const onChange = async (currentValue: any, currentValues: any) => {
    // 格式化之后的表单值
    // const formatValues = await formRef.current?.validateFieldsReturnFormatValue?.();
    const formatValues = formRef.current?.getFieldsFormatValue?.(true);;
    handdleValuesChange && handdleValuesChange(formatValues || currentValues);
  };
  const onReset = () => resetFormValues();

  useEffect(() => {
    changeFormValues(initialValues);
  }, [initialValues]);

  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      formRef={formRef}
      layout={formLayoutType || 'vertical'}
      grid={grid}
      rowProps={{
        gutter: [gutter, formLayoutType === 'inline' ? gutter : 0],
      }}
      submitter={
        showSubmitter
          ? {
            render: (props, doms) => {
              return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (
                <Row>
                  <Col span={14} offset={4}>
                    <Space>{doms}</Space>
                  </Col>
                </Row>
              ) : (
                doms
              );
            },
          }
          : submitter ?? false
      }
      onReset={onReset}
      onFinish={onFinish}
      onValuesChange={onChange}
    >
      {ProFormItems.map((item: IProFormItems) => generateCompItem(item))}
    </ProForm>
  );
});

export default ProFormComp;
