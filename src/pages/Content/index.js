import ApplicationLayout from "../ApplicationLayout"

const ContentApplication = () => {
    return (
        <ApplicationLayout menuItems={[
            { key: '/content/list', label: '列表' }
        ]} />
    )
}

export default ContentApplication