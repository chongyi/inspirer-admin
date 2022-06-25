import { Card, Form, Input } from "antd"
import { data } from "autoprefixer"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getContent, updateContent } from "../../app/content/api/content"
import ContentEditor from "./components/ContentEditor"

const { TextArea } = Input

const ContentEdit = () => {
    const [form] = Form.useForm()
    const { contentId } = useParams()
    const [contentData, setContentData] = useState(null)
    const [editorData, setEditorData] = useState(null)

    const fetchContent = useCallback(async (id) => {
        const res = await getContent(id)

        return res.data
    }, [])

    const submitContent = useCallback(async (id, data) => {
        // todo
    })

    useEffect(() => {
        fetchContent(contentId).then(data => {
            setContentData(data)
            setEditorData(data.entity.data)
        })
    }, [contentId])

    const onFormSubmit = (values) => {
        let submitData = {}

        for (let key in values) {
            if (contentData[key] != values[key]) {
                submitData[key] = values[key]
            }
        }

        if (editorData != contentData.entity.data) {
            submitData.entity = {
                ...contentData.entity,
                data: editorData,
            }
        }

        if (Object.keys(submitData).length == 0) {
            console.log('No change')
        } else {
            console.log(submitData)
        }
    }


    return <div className="relative pb-16">
        {contentData &&
            <>
                <div className="flex gap-2">
                    <div className="">
                        <ContentEditor content={editorData} onChange={setEditorData} className='h-full' />
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
                                        <Form.Item label='名称' name='name' initialValue={contentData.name}>
                                            <Input />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-0 left-[200px] right-0 py-2 px-4 shadow-md backdrop-blur bg-white/30 border-t">
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