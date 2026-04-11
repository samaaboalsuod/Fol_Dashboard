import React, { useState } from 'react';
import ReactQuill from 'react-quill-new'; 
import 'react-quill-new/dist/quill.snow.css'; 
import './RichText.css';

const RichText = (props) => {
    const [content, setContent] = useState('');

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],        // Simple formatting
            [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
            ['link', 'clean']                       // Professional basics
        ],
    };

    return ( 
        <div className='richText'>
            <h5>{props.title}</h5>
            <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={modules}
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default RichText;