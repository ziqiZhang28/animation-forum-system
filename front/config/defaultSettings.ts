import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  "navTheme": "light",
  "primaryColor": "#FAAD14",
  "layout": "top",
  "contentWidth": "Fixed",
  "fixedHeader": true,
  "fixSiderbar": false,
  "pwa": false,
  "logo": "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
  // "logo":'/OIP-C (6).jpg',
  "headerHeight": 48,
  "splitMenus": false
};

export default Settings;
