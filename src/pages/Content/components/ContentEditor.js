import { useState } from 'react';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import './style.css'

const ContentEditor = ({ content, onChange, ...props }) => {
    return <MdEditor
        modelValue={content}
        onChange={onChange}
        {...props}
    />
}

export default ContentEditor