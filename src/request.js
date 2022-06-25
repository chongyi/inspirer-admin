import axios from "axios"
import { store } from "./app/store"
import { message } from 'antd'

const request = axios.create()

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
                window.location.href = '/login'
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

export default request