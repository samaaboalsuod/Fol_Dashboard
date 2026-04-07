import React, { Component } from 'react';
import './SideBarItem.css'


const SideBarItem = (props) => {
    return ( 
        <div className='sideBatItem'>

            <img src={props.src} alt="sidebarIcons" />

            <h4>{props.title}</h4>
            
        </div>
     );
}
 
export default SideBarItem;