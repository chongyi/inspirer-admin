import { Button, message, Modal } from "antd"
import { ReloadOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useCallback, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadContentListAsync, selectContentList, refreshContentListAsync } from "../../app/content/deletedContentListSlice"
import ContentListTable from "./components/ContentListTable"
import contentAPI from "../../app/content/api/content"

const DeletedContentList = () => {
    const dispatch = useDispatch()
    const list = useSelector(selectContentList)

    useEffect(() => {
        // 初始化
        dispatch(loadContentListAsync())
    }, [])

    const onTableChange = (pagination, _filters, _sorter, { action }) => {
        if (action == 'paginate') {
            dispatch(loadContentListAsync({
                page: pagination.current,
                page_size: pagination.pageSize,
            }))
        }
    }

    const refreshContentList = useCallback(() => {
        dispatch(refreshContentListAsync())
    }, [])

    const revertContent = useCallback((id) => {
        contentAPI.revertDeletedContent(id)
            .then(() => {
                refreshContentList()
            })
    }, [])

    const deleteContent = useCallback(record => {
        Modal.confirm({
            title: '删除前确认请确认',
            icon: <ExclamationCircleOutlined />,
            content: <>
                <p>请确认是否要删除内容</p>
                <p className="text-red-600 font-bold">删除后不可恢复！</p>
                <p>
                    <div className="font-bold">{record.title}</div>
                    <div className="italic text-xs">ID: {record.id}</div>
                </p>
            </>,
            onOk() {
                contentAPI.deleteContent(record.id, true)
                    .then(() => {
                        message.success("删除成功")
                        refreshContentList()
                    })
            },
            onCancel() {
            },
        })
    }, [])

    const operation = (record) => (
        <div className="flex gap-2">
            <Button onClick={() => revertContent(record.id)}>恢复</Button>
            <Button onClick={() => deleteContent(record)} danger type="primary" icon={<DeleteOutlined />}>彻底删除</Button>
        </div>
    )

    return <>
        <div className="flex flex-col gap-4">
            <div>
                <Button icon={<ReloadOutlined />} onClick={() => refreshContentList()} />
            </div>
            <div>
                <ContentListTable onChange={onTableChange} operation={operation} {...list} />
            </div>
        </div>
    </>
}

export default DeletedContentList