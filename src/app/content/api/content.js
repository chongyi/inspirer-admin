import { get, put } from "../../../request";

export async function getContentList(page = 1, params = {}) {
    return get('/api/security/content', {
        params: {
            page,
            ...params
        }
    })
}

export async function getContent(id) {
    return get(`/api/security/content/${id}`)
}

export async function updateContent(id, data) {
    return put(`/api/security/content/${id}`, {
        data
    })
}