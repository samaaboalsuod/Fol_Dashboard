import React, { Component } from 'react';
import './PageTitle.css'


const PageTitle = (props) => {
    return ( 
        <div className='titleCont'>
            <h1 className='title'>{props.title}</h1>
            <h2 className='subTitle'>{props.subTitle}</h2>
        </div>
     );
}
 
export default PageTitle;