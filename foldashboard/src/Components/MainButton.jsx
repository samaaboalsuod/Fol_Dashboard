import React from 'react';
import './MainButton.css'

const MainButton = (props) => {
    return ( 
        <button 
            className='mainButton' 
            onClick={props.onClick} 
            disabled={props.disabled} // This is key for the disabled state
        >
            {/* Only render the image if a src is provided */}
            {props.src && <img src={props.src} alt="" />}
            <p>{props.label}</p>
        </button>
    );
}

export default MainButton;