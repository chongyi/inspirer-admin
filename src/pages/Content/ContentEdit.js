import { Card, Form, Input } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getContent } from "../../app/content/api/content"
import ContentEditor from "./components/ContentEditor"

const { TextArea } = Input

const ContentEdit = () => {
    const [form] = Form.useForm()
    const { contentId } = useParams()
    const [contentData, setContentData] = useState(null)

    const fetchContent = useCallback(async (id) => {
        const res = await getContent(id)

        return res.data
    }, [])

    useEffect(() => {
        fetchContent(contentId).then(data => setContentData(data))
    }, [contentId])

    const onFormSubmit = (values) => {
        console.log('commit', values)
    }


    return <div className="relative pb-16">
        {contentData &&
            <>
                <div className="flex gap-2">
                    <div className="">
                        <ContentEditor data={contentData.entity.data} className='h-full' />
                    </div>
                    <div className="w-[72rem] relative">
                        <div className="sticky top-0">
                            <div className="h-[calc(100vh-80px)]">
                                <div className="bg-white p-4 shadow ">
                                    <Form layout="vertical" form={form} onFinish={onFormSubmit}>
                                        <Form.Item label='标题' name='title' initialValue={contentData.title} rules={[{ required: true, message: '请输入内容标题' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label='关键字' name='keywords' initialValue={contentData.keywords}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label='描述' name='description' initialValue={contentData.description}>
                                            <TextArea />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-0 left-[200px] right-0 bg-white py-2 px-4 shadow-md">
                    <div className="flex gap-2">
                        <button className="py-1 px-4 rounded border border-gray-100 bg-gradient-to-b from-slate-600 to-slate-800 text-white" onClick={() => form.submit()}>保 存</button>
                        <button className="py-1 px-4 rounded border border-gray-100">取 消</button>
                    </div>
                </div>
            </>
        }
    </div>
}

export const ContentAdd = () => {

}

export default ContentEdit