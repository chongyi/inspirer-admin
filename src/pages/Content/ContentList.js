import { Button, message, Modal } from "antd"
import { ReloadOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useCallback, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadContentListAsync, selectContentList, refreshContentListAsync } from "../../app/content/contentListSlice"
import ContentListTable from "./components/ContentListTable"
import { useNavigate, Link } from 'react-router-dom'
import contentAPI from '../../app/content/api/content'

const ContentList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const list = useSelector(selectContentList)

    useEffect(() => {
        // 初始化
        dispatch(loadContentListAsync())
    }, [])

    const refreshContentList = useCallback(() => {
        dispatch(refreshContentListAsync())
    }, [])

    const onTableChange = (pagination, _filters, _sorter, { action }) => {
        if (action == 'paginate') {
            dispatch(loadContentListAsync({
                page: pagination.current,
                page_size: pagination.pageSize,
            }))
        }
    }

    const onChangePublishState = useCallback((id, publishState) => {
        const h = publishState ? contentAPI.publishContent(id) : contentAPI.unpublishContent(id)
        h.then(() => {
            refreshContentList()
        }).catch(error => {
            if (error.response) {
                message.error(error.response.data.msg)
            } else {
                message.error("未知错误")
            }
        })
    }, [])

    const deleteContent = useCallback(record => {
        Modal.confirm({
            title: '删除前确认请确认',
            icon: <ExclamationCircleOutlined />,
            content: <>
                <p>请确认是否要删除内容（删除后可在回收站找回）</p>
                <p>
                    <div className="font-bold">{record.title}</div>
                    <div className="italic text-xs">ID: {record.id}</div>
                </p>
            </>,
            onOk() {
                contentAPI.deleteContent(record.id, false)
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
        <>
            <Link to={`/content/edit/${record.id}`}>编辑</Link>
            {record.is_publish && <Button type="link" onClick={() => onChangePublishState(record.id, false)}>取消发布</Button>}
            {!record.is_publish && <Button type="link" onClick={() => onChangePublishState(record.id, true)}>发布</Button>}
            <Button icon={<DeleteOutlined />} danger type={"primary"} size={"small"} onClick={() => deleteContent(record)} />
        </>
    )

    return <>
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <div>
                    <Button icon={<ReloadOutlined />} onClick={() => refreshContentList()} />
                </div>
                <div>
                    <Button type="primary" onClick={() => navigate('/content/create')} >创建内容</Button>
                </div>
            </div>
            <div>
                <ContentListTable onChange={onTableChange} operation={operation} {...list} />
            </div>
        </div>
    </>
}

export default ContentList