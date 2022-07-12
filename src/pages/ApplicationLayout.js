import { Menu, Layout } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { withPrefix } from '../utils';

const { Content, Sider } = Layout;

const ApplicationLayout = ({ menuItems = [] }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const onMenuClick = ({ item, key }) => {
        navigate(withPrefix(key))
    }

    return (
        <Layout>
            <Sider width={200} className='shadow fixed top-[63px] bottom-0 z-10' theme='light'>
                <Menu
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                    items={menuItems}
                    onClick={onMenuClick}
                    defaultSelectedKeys={[location.pathname]}
                />
            </Sider>
            <Layout className='ml-[200px] mt-[63px] overflow-auto'>
                <Content className='p-4'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default ApplicationLayout