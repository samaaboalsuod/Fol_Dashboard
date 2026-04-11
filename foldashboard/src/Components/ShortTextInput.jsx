import React, { Component } from 'react';
import './ShortTextInput.css'


const ShortTextInput = (props) => {
    return ( 
        <div className="shortTextCont">
            <h5> {props.title} </h5>
            <input type="text" placeholder={props.placeholder} />
        </div>
     );
}
 
export default ShortTextInput;