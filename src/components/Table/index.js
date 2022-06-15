import {Table as AntdTable} from 'antd'

const Table = ({data, columns, ...props}) => {
    return <AntdTable
        dataSource={data.data}
        columns={columns}
        pagination={{
            current: data.page,
            pageSize: data.page_size,
            total: data.total,
        }}

        {...props}
    />
}

export default Table