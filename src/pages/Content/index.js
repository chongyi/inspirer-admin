import ApplicationLayout from "../ApplicationLayout"

const ContentApplication = () => {
    return (
        <ApplicationLayout menuItems={[
            { key: '/content/list', label: '列表' },
            { key: '/content/deleted', label: '回收站' }
        ]} />
    )
}

export default ContentApplication