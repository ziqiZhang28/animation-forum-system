// eslint-disable-next-line import/no-extraneous-dependencies
import { Rule } from 'rc-field-form/lib/interface';

export interface IFormItemData {
  name: string;
  label?: string | React.ReactNode;
  rules?: Rule[];
  inputForm?: any;
  isCreate?: boolean;
  updateHide?: boolean;
  isHidden?: boolean;
  extra?: any;
}
export interface IProFormItems {
  type?: 'item' | 'group' | 'md' | 'xl' | 'xs' | 'lg';
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  name?: string;
  label?: any;
  tooltip?: string;
  placeholder?: string;
  disabled?: boolean;
  inputForm?: any;
  extra?: any;
  rules?: any;
  fieldProps?: any;
  colProps?: any;
  options?: any;
  initialValue?: any;
  transform?: any;
}
export interface IFromGroups {
  lable?: string;
  children?: IFormItemData[];
}
