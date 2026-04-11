import React, { Component } from 'react';
const Titles = (props) => {
    return ( 
        <div className='titles'>
            {/* <img src={props.src} alt="" /> */}
            {props.src && <img src={props.src} alt="" />}
            <h3> {props.title} </h3>
        </div>
     );
}
 
export default Titles;