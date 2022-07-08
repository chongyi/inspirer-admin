import { Button, Checkbox, Form, Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectIsLogin } from './app/application/userSessionSlice';
import { useLocation, useNavigate } from 'react-router-dom'
import qs from 'qs'

const Login = () => {
    const dispatch = useDispatch();
    const [tryRedirect, setTryRedirect] = useState(false)
    const isLogin = useSelector(selectIsLogin)
    const location = useLocation()
    const navigate = useNavigate()

    const redirect = useCallback(() => {
        if (location.search) {
            const { to } = qs.parse(location.search, { ignoreQueryPrefix: true })

            if (to) {
                navigate(to)
                return;
            }
        }

        navigate('/')
    }, [location])

    const onLoginFormCommit = useCallback(values => {
        if (isLogin) {
            redirect()
            return
        }

        // 触发登录后才会尝试重定向
        setTryRedirect(true)

        dispatch(loginAsync(values))
    }, [isLogin])

    useEffect(() => {
        if (isLogin && tryRedirect) {
            redirect()
        }
    }, [isLogin])

    return <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-white to-slate-300">
        <div className="relative">
            <div className="text-center absolute w-full" style={{ marginTop: -110 }}>
                <img src="/logo.png" alt="logo" className="h-16 m-auto" />
                <div className="font-bold text-2xl">INSPIRER</div>
            </div>
            <div className="shadow-sm rounded p-4 bg-white/80 backdrop-blur">
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    layout='vertical'
                    onFinish={onLoginFormCommit}
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input autoComplete="username" />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password autoComplete='current-password' />
                    </Form.Item>

                    {/* <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>记住此账号</Checkbox>
                    </Form.Item> */}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit" className="bg-gradient-to-b from-slate-100 to-slate-300 text-slate-700 border-slate-300 hover:border-slate-300 hover:text-slate-500">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
}

export default Login