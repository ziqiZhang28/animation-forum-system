import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { primaryColor } from '../src/utils/util';
const Settings: LayoutSettings & {
    pwa?: boolean;
    logo?: string;
} = {
    "navTheme": "light",
    "primaryColor": "#FFB6C1",
    "layout": "top",
    "contentWidth": "Fixed",
    "fixedHeader": false,
    "fixSiderbar": true,
    "pwa": false,
    // "logo": "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    "logo": '/logo2.png',
    "headerHeight": 48,
    "splitMenus": false,
    "title":'二次元动漫论坛'
};

export default Settings;

