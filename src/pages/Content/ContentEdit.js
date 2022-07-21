import { Button, Form, Input, Modal, message } from "antd"
import { data } from "autoprefixer"
import { useCallback, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import contentAPI from "../../app/content/api/content"
import { useSelector, useDispatch } from "react-redux"
import { loadContentServiceConfigAsync, selectContentConfigState } from "../../app/content/contentConfigSlice"
import ContentEditor from "./components/ContentEditor"
import { withPrefix } from "../../utils"

const { TextArea } = Input

const ContentEdit = ({ mode = 'create' }) => {
    const [currentMode, setCurrentMode] = useState(mode)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const { contentId } = useParams()
    const [contentData, setContentData] = useState({
        title: '',
        keywords: '',
        description: '',
        name: '',
        content_type: 1,
        entity: {
            type: 'post',
            data: ''
        }
    })
    const [editorData, setEditorData] = useState('')
    const { config } = useSelector(selectContentConfigState)
    const [commiting, setCommiting] = useState(false)

    const fetchContent = useCallback(async (id) => {
        const res = await contentAPI.getContent(id)

        return res.data
    }, [])

    const submitContent = useCallback(async (id, data) => {
        if (currentMode == 'edit') {
            return await contentAPI.updateContent(id, data);
        } else {
            const res = await contentAPI.createContent(data)
            return Promise.resolve(res.data)
        }
    }, [currentMode])

    const onCancel = useCallback(() => {
        // 直接返回
        navigate(-1)
    }, [])

    useEffect(() => {
        // 只有 edit 模式会进行内容读取
        if (currentMode == 'edit') {
            fetchContent(contentId).then(data => {
                setContentData(data)
                setEditorData(data.entity.data)

                // update form field
                form.resetFields()
            })
        }
    }, [contentId, currentMode])

    useEffect(() => {
        if (!config) {
            dispatch(loadContentServiceConfigAsync())
        }
    }, [])

    const onFormSubmit = (values) => {
        setCommiting(true)
        let submitData = {}

        for (let key in values) {
            if (contentData[key] != values[key]) {
                submitData[key] = values[key]
            }
        }

        if (currentMode == 'create') {
            submitData.entity = {
                type: 'post',
                data: editorData,
            }
        } else {
            if (editorData != contentData.entity.data) {
                submitData.entity = {
                    ...contentData.entity,
                    data: editorData,
                }
            }
        }

        if (Object.keys(submitData).length == 0) {
            setCommiting(false)
            console.log('No change')

            message.info("没有内容变更，无需保存")
        } else {
            submitContent(contentId, submitData).then(res => {
                setCommiting(false)
                Modal.success({
                    content: "保存成功",
                    afterClose: () => {
                        if (currentMode == 'create') {
                            setCurrentMode('edit')
                            // 直接跳转即可
                            navigate(withPrefix(`/content/edit/${res.id}`), { replace: true })
                        } else {
                            // 更新本地数据
                            setContentData(prev => {
                                return {
                                    ...prev,
                                    ...values
                                }
                            })
                        }
                    }
                })

            }).catch(err => {
                setCommiting(false)
                if (err.response) {
                    Modal.error({
                        title: "保存失败",
                        content: err.response.data.msg
                    })
                } else {
                    Modal.error({
                        content: "保存失败"
                    })
                }

            })

        }
    }


    return <div className="relative pb-16">
        {contentData &&
            <>
                <div className="flex gap-2">
                    <div className="grow">
                        <ContentEditor content={editorData} onChange={setEditorData} className='h-full' />
                    </div>
                    <div className="w-[300px] md:w-[400px] relative">
                        <div className="sticky top-0">
                            <div className="h-[calc(100vh-80px)]">
                                <div className="bg-white p-4 shadow ">
                                    <Form layout="vertical" form={form} onFinish={onFormSubmit}>
                                        <Form.Item label='标题' name='title' initialValue={contentData.title} rules={[{ required: true, message: '请输入内容标题' }]}>
                                            <Input placeholder="内容的标题" />
                                        </Form.Item>
                                        <Form.Item label='关键字' name='keywords' initialValue={contentData.keywords}>
                                            <Input placeholder="内容的关键词，用半角逗（,）号分割" />
                                        </Form.Item>
                                        <Form.Item label='描述' name='description' initialValue={contentData.description}>
                                            <TextArea placeholder="对该项内容的基本描述" />
                                        </Form.Item>
                                        <Form.Item label='名称' name='name' initialValue={contentData.name}>
                                            <Input placeholder="内容唯一名称，会用作路径名称" />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-0 left-[200px] right-0 py-2 px-4 shadow-md backdrop-blur bg-white/30 border-t">
                    <div className="flex gap-2">
                        <Button onClick={() => form.submit()} disabled={commiting} type="primary">保 存</Button>
                        <Button onClick={onCancel}>取 消</Button>
                    </div>
                </div>
            </>
        }
    </div>
}

export const ContentAdd = () => {

}

export default ContentEdit