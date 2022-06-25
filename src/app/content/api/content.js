import { get, put } from "../../../request";

export async function getContentList(pagination, params = {}) {
    return get('/api/security/content', {
        params: {
            ...pagination,
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