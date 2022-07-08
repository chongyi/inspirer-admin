import Table from "../../../components/Table"
import { Link } from 'react-router-dom'
import { useState } from "react"
import { Badge, Button } from "antd"

const ContentListTable = ({ data, onChangePublishState, ...props }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: '基本信息',
            key: 'meta',
            render: (_, record) => (
                <>
                    <div><span className="font-bold">{record.title}</span></div>
                    <div className="italic text-xs"><span>ID</span> <span className="text-gray-400">{record.id}</span></div>
                    {record.name && <div className="italic text-xs"><span>名称</span> <span className="text-gray-400">{record.name}</span></div>}
                </>
            )
        },
        {
            key: 'owner',
            title: '所有人',
            render: (_, record) => (
                <span>{record.owner ? record.owner.nickname : '未知'}</span>
            )
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
            dataIndex: 'is_publish',
            title: '发布状态',
            render: (state) => <Badge status={state ? 'success' : 'default'} text={state ? '已发布' : '未发布'} />
        },
        {
            dataIndex: 'is_display',
            title: '可视',
            render: (state) => <Badge status={state ? 'success' : 'default'} text={state ? '可见' : '隐藏'} />
        },
        {
            key: 'datetime',
            title: '日期',
            render: (_, record) => (
                <div className="text-sm">
                    <div>创建时间：{record.created_at}</div>
                    <div>更新时间：{record.updated_at}</div>
                    {record.published_at && <div>发布时间：{record.published_at}</div>}
                </div>
            )
        },
        {
            key: 'operation',
            render: (_, record) => (
                <>
                    <Link to={`/content/edit/${record.id}`}>编辑</Link>
                    {
                        onChangePublishState && (
                            <>
                                {record.is_publish && <Button type="link" onClick={() => onChangePublishState(record.id, false)}>取消发布</Button>}
                                {!record.is_publish && <Button type="link" onClick={() => onChangePublishState(record.id, true)}>发布</Button>}
                            </>
                        )
                    }
                </>
            )
        }
    ]

    return <Table
        rowKey='id'
        data={data}
        rowSelection={rowSelection}
        columns={columns}
        size="middle"
        {...props}
    />
}

export default ContentListTable