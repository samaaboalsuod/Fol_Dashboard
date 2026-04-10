import React from 'react';
import './SecondaryButton.css'

const SecondaryButton = (props) => {
    return ( 
        <button className='secondButton'>
            {/* Only render the image if a src is provided */}
            {props.src && <img src={props.src} alt="" />}
            <p>{props.label}</p>
        </button>
    );
}

export default SecondaryButton;