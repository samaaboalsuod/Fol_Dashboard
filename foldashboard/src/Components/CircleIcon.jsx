import React, { Component } from 'react';
import './CircleIcon.css'

const CircleIcon = (props) => {
    return ( 
        <div className='circleIcon'>
            <img src={props.src} alt="" />
        </div>
     );
}
 
export default CircleIcon;