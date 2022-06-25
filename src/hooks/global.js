export function useHeaderMenus() {
    return [
        {
            key: 'home',
            label: '首页',
            link: '/',
        },
        {
            key: 'content',
            label: '内容中心',
            link: '/content'
        },
        {
            key: 'system',
            label: '系统',
            link: '/system'
        },
    ]
}