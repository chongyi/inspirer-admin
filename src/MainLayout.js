import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, message } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useHeaderMenus } from './hooks/global';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLogin, updateProfileAsync } from './app/application/userSessionSlice';

const { Header } = Layout;

const MainLayout = () => {
    const headerMenus = useHeaderMenus()
    const isLogin = useSelector(selectIsLogin)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const checkLoginStatus = useCallback(() => {
        if (!isLogin) {
            message.error("登录状态失效，请重新登录")
            navigate(`/login?to=${encodeURIComponent(location.pathname)}`)
            return false;
        }
        
        return true
    }, [isLogin])

    useEffect(() => {
        if (checkLoginStatus()) {
            dispatch(updateProfileAsync())
        }

        console.log('register profile update timer')
        const timer = setInterval(() => {
            dispatch(updateProfileAsync())
        }, 60 * 1000)

        return () => {
            console.log('clear profile update timer')
            clearInterval(timer)
        }
    }, [])

    const onMenuClick = useCallback((item) => {
        navigate(item.item.props.link)
    }, [])

    return <Layout className='h-screen'>
        <Header className='bg-white px-0 shadow border-b fixed w-full z-20'>
            <div className='float-left px-4 flex gap-1 items-center'>
                <img src="/logo.png" alt='logo' className='h-8' />
                <span className='font-bold'>INSPIRER</span>
            </div>
            <Menu className='border-0' mode="horizontal" defaultSelectedKeys={['content']} items={headerMenus} onClick={onMenuClick} />
        </Header>
        <Outlet />
    </Layout>
}

export default MainLayout