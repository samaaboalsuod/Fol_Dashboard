import React from 'react';
import './SideBarItem.css';

const SideBarItem = (props) => {
    // Determine if this item should show the active state
    const activeClass = props.isActive ? 'active' : '';

    return ( 
        <div 
            className={`sideBarItem ${activeClass}`} 
            onClick={props.onClick}
        >
            <img src={props.src} alt="sidebarIcons" className="sideBarIcon"/>
            <h5 className="sideBarTitle">{props.title}</h5>
        </div>
    );
}

export default SideBarItem;