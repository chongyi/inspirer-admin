import Table from "../../../components/Table"

const columns = [
    {
        dataIndex: 'id',
        title: 'ID',
    },
    {
        dataIndex: 'name',
        title: '名称',
    },
    {
        dataIndex: 'title',
        title: '标题',
    },
    {
        dataIndex: 'published_at',
        title: '发布时间',
    }
]

const ContentListTable = ({ data, ...props }) => {
    return <Table
        rowKey='id'
        data={data}
        columns={columns}
        {...props}
    />
}

export default ContentListTable