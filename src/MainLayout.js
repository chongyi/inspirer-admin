import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import { useHeaderMenus } from './hooks/global';

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
    const headerMenus = useHeaderMenus()
    return <Layout className='h-screen'>
        <Header className='bg-white px-0 shadow border-b'>
            <div className='float-left px-4 flex gap-1 items-center'>
                <img src="/logo.png" alt='logo' className='h-8' />
                <span className='font-bold'>INSPIRER</span>
            </div>
            <Menu className='border-0' mode="horizontal" defaultSelectedKeys={['content']} items={headerMenus} />
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