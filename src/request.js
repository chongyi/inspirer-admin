import axios from "axios"
import { store } from "./app/store"
import { message } from 'antd'
import { logout } from "./app/application/userSessionSlice"
import { withPrefix } from "./utils"

const request = axios.create({
    baseURL: process.env.REACT_APP_API_HOST
})

request.interceptors.request.use(config => {
    const { token } = store.getState().userSession

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
})

request.interceptors.response.use(resp => resp, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                store.dispatch(logout())
                delete sessionStorage.accessToken
                delete localStorage.accessToken
                window.location.href = withPrefix(`/login?to=${encodeURIComponent(window.location.pathname)}`)
                break;

        }
    }

    return Promise.reject(error);
})

export const post = async (url, options = {}) => {
    return await request({
        url,
        method: 'post',
        ...options
    })
}

export const put = async (url, options = {}) => {
    return await request({
        url,
        method: 'put',
        ...options
    })
}

export const get = async (url, options = {}) => {
    return await request({
        url,
        ...options
    })
}

export const del = async (url, options = {}) => {
    return await request({
        url,
        method: 'delete',
        ...options
    })
}

export default request