import React, { useState } from 'react';
import ReactQuill from 'react-quill-new'; 
import 'react-quill-new/dist/quill.snow.css'; 
import './RichText.css';

const RichText = (props) => {

    const [content, setContent] = useState('');
    const modules = {
    toolbar: [
        [{ 'header': [2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'], // Advanced text style
        // [{ 'color': [] }, { 'background': [] }], 
        [{ 'script': 'sub'}, { 'script': 'super' }], 
        [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
        // [{ 'indent': '-1'}, { 'indent': '+1' }], 
        [{ 'direction': 'rtl' }], // Explicit RTL button for Arabic
        [{ 'align': [] }], // Text alignment (Left, Center, Right)
        ['link', 'image', 'video'], // Media tools
        ['clean'] // Clear formatting
    ],
    };


    return ( 
        <div className='richText'>
            <h5>{props.title}</h5>
            
            {props.isRich ? (
                /* 1. Show Professional Editor */
                <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={setContent} 
                    modules={modules}
                    placeholder={props.placeholder}
                />
            ) : (
                /* 2. Show Simple Input (Matching your style) */
                <input 
                    type="text" 
                    placeholder={props.placeholder} 
                    className="simple-input"
                />
            )}
        </div>
    );
}

export default RichText;