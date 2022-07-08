import { Button, message } from "antd"
import { ReloadOutlined } from '@ant-design/icons'
import { useCallback, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadContentListAsync, selectContentList, refreshContentListAsync } from "../../app/content/contentListSlice"
import ContentListTable from "./components/ContentListTable"
import { useNavigate } from 'react-router-dom'
import contentAPI from '../../app/content/api/content'

const ContentList = () => {
    const navigate = useNavigate()
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

    const refreshContentList = useCallback(() => {
        dispatch(refreshContentListAsync())
    }, [])

    return <>
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <Button type="primary" onClick={() => navigate('/content/create')} >创建内容</Button>
                <Button icon={<ReloadOutlined />} onClick={() => refreshContentList()} />
            </div>
            <div>
                <ContentListTable onChange={onTableChange} onChangePublishState={onChangePublishState} {...list} />
            </div>
        </div>
    </>
}

export default ContentList