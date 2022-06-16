import { useState } from 'react';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

const ContentEditor = ({ data }) => {
    const [content, setContent] = useState(data)
    return <MdEditor
        modelValue={content}
        onChange={setContent}
    />
}

export default ContentEditor