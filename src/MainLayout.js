import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return <div>
        <h1>测试框架</h1>
        <div>
            <Outlet />
        </div>
    </div>
}

export default MainLayout