import { generate } from '@ant-design/colors';
import { createFromIconfontCN } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import request from './request';
// API

// 主题色
export const primaryColor = '#FFB5B5'; // #1890ff #722ed1 #4088ff #1355C2 6a29f6 005be7
export const colors = generate(primaryColor);


// 日期规则
export const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';
export const dateFormat = 'YYYY-MM-DD';
export const weekFormat = 'MM-DD';
export const monthFormat = 'YYYY-MM';
export const timeFormat = 'HH:mm:ss';
export const MinSecFormat = 'HH:mm';
// 正则验证
export const IdCardTestReg =
    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/; // 身份证
export const PhoneNumberTestReg = /^[1]\d{10}$/; // 电话
export const CodeTestReg = /^[a-zA-Z0-9]{2,64}$/; // 数据字典编码
export const ItemCodeTestReg = /^[a-zA-Z0-9]{1,64}$/; // 数据字典项编码
export const ProductNumberTestReg = /^([a-zA-Z0-9]|\-|\_){1,64}$/; // 物品编号

// 请求延迟时间，单位ms
export const debounceDuration = 300;
// 根据出生日期计算年龄
export const CalculateAge = (day: string) => {
    if (!day) {
        return null;
    }
    const today = new Date(); // 今天
    const todayYear = today.getFullYear(); // 今年
    const ThisDate = new Date(`${todayYear}-${today.getMonth() + 1}-${today.getDate()}`); // 今天年月日
    const birth = new Date(day); // 出生日期
    const birthYear = birth.getFullYear(); // 出生年份
    const BirthdayOfThisYear = new Date(`${todayYear}-${birth.getMonth() + 1}-${birth.getDate()}`); // 今年生日的日期
    const y = todayYear - birthYear;
    const age = BirthdayOfThisYear > ThisDate ? y - 1 : y;
    return age + '岁';
};


export interface IPageParams {
    pageSize: number;
    current: number;
}

// 根据月份生成对应的天数
export const MonthDays = (month: number) => {
    if (!month) return;
    const BigMonthDays = [1, 3, 5, 7, 8, 10, 12];
    const NormalMonthDays = [4, 6, 9, 11];
    if (BigMonthDays.indexOf(Number(month)) > -1) {
        return 31;
    } else if (NormalMonthDays.indexOf(Number(month)) > -1) {
        return 30;
    }
    return 28;
};



//数据回填
export const dataDackfill = async (newData: any[], oldData: any[]) => {
    let resArr: any = [];
    const list = oldData;
    if (newData) {
        if (oldData) {
            newData.forEach((res) => {
                let sign: Boolean = true;
                for (let index = 0; index < list.length; index++) {
                    if (res.id === list[index].id) {
                        resArr.push(list[index]);
                        sign = false;
                        continue;
                    }
                }
                if (sign) {
                    resArr.push(res);
                }
            });
            return resArr;
        } else {
            return newData;
        }
    }
};

export function clearToken() {
    return localStorage.removeItem('token');
}