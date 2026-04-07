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
            <h4 className="sideBarTitle">{props.title}</h4>
        </div>
    );
}

export default SideBarItem;