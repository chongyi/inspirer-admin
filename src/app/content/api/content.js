import { get } from "../../../request";

export async function getContentList(page = 1, params = {}) {
    return get('/api/security/content', {
        params: {
            page,
            ...params
        }
    })
}