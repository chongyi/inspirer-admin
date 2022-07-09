import { get, post, put, del } from "../../../request";

export async function getContentList(pagination, params = {}) {
    return await get('/api/security/content', {
        params: {
            ...pagination,
            ...params
        }
    })
}

export async function getDeletedContentList(pagination, params = {}) {
    return await get('/api/security/deleted/content', {
        params: {
            ...pagination,
            ...params
        }
    })
}

export async function getContent(id) {
    return await get(`/api/security/content/${id}`)
}

export async function updateContent(id, data) {
    return await put(`/api/security/content/${id}`, {
        data
    })
}

export async function createContent(data) {
    return await post('/api/security/content', {
        data
    })
}

export async function getContentServiceConfig() {
    return await get('/api/security/content-service-config')
}

export async function publishContent(id) {
    return await post(`/api/security/content/${id}/publish`)
}

export async function unpublishContent(id) {
    return await del(`/api/security/content/${id}/publish`)
}

export async function deleteContent(id, force_delete = false) {
    return await del(`/api/security/content/${id}`, {
        params: {
            force_delete
        }
    })
}

export async function revertDeletedContent(id) {
    return await del(`/api/security/deleted/content/${id}`)
}

export default {
    getContent,
    getContentList,
    getDeletedContentList,
    updateContent,
    createContent,
    getContentServiceConfig,
    publishContent,
    unpublishContent,
    deleteContent,
    revertDeletedContent,
}