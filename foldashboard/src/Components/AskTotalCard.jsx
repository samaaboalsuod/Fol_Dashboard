// AskTotalCard.jsx
import React from 'react';
import './AskTotalCard.css';
import Titles from './Titles';

const AskTotalCard = (props) => {
    return ( 
        // We add a dynamic class (e.g., 'pink-theme') based on props
        <div className={`askTotalCard ${props.theme}`}>
            <div className="card-header">
                <Titles src={props.src} title={props.title} />
            </div>
            <h1>{props.value}</h1>
            {props.subTitle && <p className="sub-link">{props.subTitle}</p>}
        </div>
    );
}

export default AskTotalCard;