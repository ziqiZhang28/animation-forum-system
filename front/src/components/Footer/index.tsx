import { useIntl } from 'umi';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
    const intl = useIntl();
    const defaultMessage = intl.formatMessage({
        id: 'app.copyright.produced',
        defaultMessage: '蚂蚁集团体验技术部出品',
    });

    const currentYear = new Date().getFullYear();

    return (
        <DefaultFooter
            copyright="二次元动漫论坛"
            links={[
                {
                    key: 'email',
                    title: <MailOutlined />,
                    href: '2697489606@qq.com',
                    blankTarget: true,
                },
                {
                    key: 'github',
                    title: <GithubOutlined />,
                    href: 'https://github.com/ziqiZhang28/animation-forum-system',
                    blankTarget: true,
                },
                {
                    key: 'Ant Design',
                    title: '获取帮助',
                    href: 'https://ant.design',
                    blankTarget: true,
                },
            ]}
        />
    );
};

export default Footer;
