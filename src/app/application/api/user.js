import {post, get} from "../../../request"

export async function getUserProfile() {
    return await get('/api/security/profile')
}

export async function login(payload) {
    return await post('/api/login', {
        data: payload
    })
}

export default {
    getUserProfile,
    login
}