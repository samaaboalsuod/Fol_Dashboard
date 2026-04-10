import React, { Component } from 'react';
import './TotalRatio.css'

const TotalRatio = (props) => {
    return ( 
        <div className='ratioData'>
            <h4> {props.title} </h4>
            <h3> {props.value} </h3>
        </div>
     );
}
 
export default TotalRatio;