import Table from "../../../components/Table"
import { Link } from 'react-router-dom'

const columns = [
    {
        dataIndex: 'id',
        title: 'ID',
    },
    {
        dataIndex: 'content_type',
        title: '类型',
        render: (text) => {
            switch (text) {
                case 1:
                    return '文章'
                case 2:
                    return '页面'
            }
        }
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
        key: 'datetime',
        title: '日期',
        render: (_, record) => (
            <>
                <div>创建时间：{record.created_at}</div>
                <div>更新时间：{record.updated_at}</div>
                {record.published_at && <div>发布时间：{record.published_at}</div>}
            </>
        )
    },
    {
        key: 'operation',
        render: (_, record) => (
            <>
                <Link to={`/content/${record.id}`}>编辑</Link>
            </>
        )
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