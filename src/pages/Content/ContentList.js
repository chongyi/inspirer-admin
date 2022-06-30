import { Button } from "antd"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadContentListAsync, selectContentList } from "../../app/content/contentListSlice"
import ContentListTable from "./components/ContentListTable"
import { useNavigate } from 'react-router-dom'

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
            console.log(pagination)
            dispatch(loadContentListAsync({
                page: pagination.current,
                page_size: pagination.pageSize,
            }))
        }
    }

    return <>
        <div className="flex flex-col gap-4">
            <div>
                <Button type="primary" onClick={() => navigate('/content/create')} >创建内容</Button>
            </div>
            <div>
                <ContentListTable onChange={onTableChange} {...list} />
            </div>
        </div>
    </>
}

export default ContentList