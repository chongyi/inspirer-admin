import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadContentListAsync, selectContentList } from "../../app/content/contentListSlice"
import ContentListTable from "./components/ContentListTable"

const ContentList = () => {
    const dispatch = useDispatch()
    const list = useSelector(selectContentList)

    useEffect(() => {
        // 初始化
        dispatch(loadContentListAsync())
    }, [])

    const onTableChange = (pagination, _filters, _sorter, { action }) => {
        if (action == 'paginate') {
            dispatch(loadContentListAsync(pagination.current))
        }
    }

    return <div>
        <ContentListTable onChange={onTableChange} {...list} />
    </div>
}

export default ContentList