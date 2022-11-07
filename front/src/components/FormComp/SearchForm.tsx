import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Col, Form, Grid, Input, Row, Space } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
// 组件
import { IFormItemData } from './data';

const { useBreakpoint } = Grid;

export interface ISearchFormProps {
  layout?: any;
  showLabel?: boolean;
  onFinish: (values: any) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void;
  onReset?: () => void;
  fields: IFormItemData[];
  size?: any;
  searchTitle?: any;
  SearchValues?: any;
}

// 类型
interface ICRef {
  getUpdateInitialData: (data: any) => void;
}

const SearchForm = forwardRef<ICRef, ISearchFormProps>((props, ref) => {
  const [form] = Form.useForm();

  const getUpdateInitialData = (data: any) => {
    form.setFieldsValue(data);
  };
  useImperativeHandle(ref, () => ({
    getUpdateInitialData,
  }));

  const [expand, setExpand] = useState(false);
  //当窗口匹配时会变化 {lg: false,md: true,sm: false,xl: false,xs: false,xxl: false}
  const screens = useBreakpoint();

  const {
    layout = {},
    showLabel = true,
    searchTitle,
    size = "middle",
    onFinish,
    onValuesChange,
    fields,
    onReset,
    SearchValues = {},
  } = props;

  const getSpan = (span?: string): number => {
    switch (span) {
      case 'xxl':
        return 6;
      case 'xl':
        return 8;
      case 'lg':
        return 12;
      case 'md':
        return 12;
      case 'sm':
        return 24;
      case 'xs':
        return 24;
      default:
        return 6;
    }
  };

  const getFields = (grid?: string) => {
    const children: any = [];
    let noneCount = 24 / getSpan(grid) - 1;
    if (noneCount === 0) {
      noneCount = 1;
    }
    fields.forEach((item, i) => {
      const key = i + 1;
      children.push(
        // eslint-disable-next-line no-nested-ternary
        <Col
          span={getSpan(grid)}
          key={key}
          style={{
            display: key > noneCount ? (expand ? '' : 'none') : '',
          }}
        >
          <Form.Item name={item.name} label={showLabel && item.label} rules={item.rules}>
            {item.inputForm ?? (
              <Input placeholder={`请输入${showLabel && item.label ? item.label : ''}`} />
            )}
          </Form.Item>
        </Col>,
      );
    });
    return children;
  };
  const check = (grid?: string) => {
    let noneCount = 24 / getSpan(grid) - 1;
    if (noneCount === 0) {
      noneCount = 1;
    }
    return noneCount;
  };

  const searchFrom = () => {
    const matchScreens = Object.entries(screens).filter((screen) => screen[1]) // 匹配的屏幕大小
    const screensLength = matchScreens.length;

    let grid = '';
    if (screensLength !== 0) {
      grid = matchScreens[screensLength - 1][0]; // 可支持的最大屏幕 的大小，xs\sm\md\lg\xl\xxl
    }

    const children: any = [];
    const noneCount = 24 / getSpan(grid) - 1;

    children.push(getFields(grid));
    children.push(
      <Col
        offset={
          expand || fields.length < noneCount + 1
            ? (noneCount - (fields.length % (24 / getSpan(grid)))) * getSpan(grid)
            : 0
        }
        span={getSpan(grid)}
        key={children.length + 1}
        style={{ textAlign: 'right' }}
      >
        <Form.Item>
          <Space>
            {getFields().length > 1 ? (
              <Button
                onClick={() => {
                  form.resetFields();
                  if (onReset !== undefined) {
                    onReset();
                  }
                }}
              >
                重置
              </Button>
            ) : null}
            <Button type="primary" htmlType="submit">
              {searchTitle || '查询'}
            </Button>

            {check(grid) < fields.length ? (
              <a
                style={{
                  marginLeft: '8px',
                }}
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                {expand ? (
                  <span>
                    <UpOutlined /> 折叠
                  </span>
                ) : (
                  <span>
                    <DownOutlined /> 展开
                  </span>
                )}
              </a>
            ) : (
              ''
            )}
          </Space>
        </Form.Item>
      </Col>,
    );
    return children;
  };

  useEffect(() => {
    // 初始化表单
    form.setFieldsValue(SearchValues);
  }, [SearchValues]);

  return (
    <div className="SearchFrom">
      <Form
        form={form}
        layout={layout}
        name={`inline_advanced_search_${Math.random() * 100}`}
        onFinish={onFinish}
        initialValues={SearchValues}
        onValuesChange={onValuesChange}
        size={size}
      >
        {layout === 'inline' ? (
          <>
            {fields
              .filter((item: any) => !item.isHidden)
              .map((item, i) => {
                const key = i + 1;
                return (
                  <Form.Item
                    style={{ marginBottom: 8 }}
                    key={key}
                    name={item.name}
                    label={showLabel && item.label}
                    rules={item.rules}
                  >
                    {item.inputForm ?? (
                      <Input
                        placeholder={`请输入${showLabel && item.label ? item.label : ''}`}
                        allowClear
                      />
                    )}
                  </Form.Item>
                );
              })}
            <Form.Item style={{ marginBottom: 8 }}>
              <Button htmlType="submit">{searchTitle || '查询'}</Button>
            </Form.Item>
          </>
        ) : (
          <Row gutter={24}>{searchFrom()}</Row>
        )}
      </Form>
    </div>
  );
});

export default SearchForm;
