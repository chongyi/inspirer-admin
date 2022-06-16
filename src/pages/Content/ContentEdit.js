import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getContent } from "../../app/content/api/content"
import ContentEditor from "./components/ContentEditor"

const ContentEdit = () => {
    const { contentId } = useParams()
    const [contentData, setContentData] = useState(null)

    const fetchContent = useCallback(async (id) => {
        const res = await getContent(id)

        return res.data
    }, [])

    useEffect(() => {
        fetchContent(contentId).then(data => setContentData(data))
    }, [contentId])

    return <div>
        {contentData && <ContentEditor data={contentData.entity.data} />}
    </div>
}

export default ContentEdit