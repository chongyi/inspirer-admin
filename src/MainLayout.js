import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import { useHeaderMenus } from './hooks/global';

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
    const headerMenus = useHeaderMenus()

    return <Layout className='h-screen'>
        <Header>
            <div className='float-left'>LOGO</div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['content']} items={headerMenus} />
        </Header>
        <Layout>
            <Sider width={200} className='shadow' theme='light'>
                Menu
            </Sider>
            <Layout>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </Layout>
}

export default MainLayout