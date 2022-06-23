import { useState } from 'react';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import './style.css'

const ContentEditor = ({ data, ...props }) => {
    const [content, setContent] = useState(data)
    return <MdEditor
        modelValue={content}
        onChange={setContent}
        {...props}
    />
}

export default ContentEditor