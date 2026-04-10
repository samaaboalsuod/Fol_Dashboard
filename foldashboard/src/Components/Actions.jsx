import React from 'react';
import './Actions.css';

const Actions = (props) => {
    return ( 
        <div className='actionCard'>
            <div 
                className="actionIconWrapper" 
                style={{ backgroundColor: props.color + '15' }} // 15 adds transparency
            >
                <img src={props.src} alt={props.title} />
            </div>
            <h4>{props.title}</h4>
        </div>
    );
}

export default Actions;