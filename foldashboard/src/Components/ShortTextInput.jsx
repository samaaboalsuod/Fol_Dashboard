import React from 'react';
import './ShortTextInput.css'


const ShortTextInput = ({ title, placeholder, value, onChange }) => {
    return ( 
        <div className="shortTextCont">
            <h5> {title} </h5>
            <input 
                type="text" 
                placeholder={placeholder} 
                value={value || ''} 
                onChange={onChange} 
            />
        </div>
     );
}
 
export default ShortTextInput;