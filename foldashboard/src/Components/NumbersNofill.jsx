import React, { Component } from 'react';
import './NumbersNofill.css'

const NumbersNofill = (props) => {
    return ( 
        <div className='noFillNumb'>
            <p> {props.title} </p>
            <h1> {props.value} </h1>
        </div>
     );
}
 
export default NumbersNofill;