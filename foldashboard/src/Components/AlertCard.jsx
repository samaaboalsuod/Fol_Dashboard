import React, { Component } from 'react';
import './AlertCard.css';
import './RecentCard.css';
import './RecentCard.css';

import WarntIcon from '../Assets/warnIcon.svg'



const AlertCard = (props) => {
    return ( 
        <div className='alertCard'>

            <div className='bestRight'>
                <img src={WarntIcon} alt="" />

                <div className='recentRightCol'>
                    <h4> {props.title} </h4>
                    <p> {props.action} </p>
                </div>

            </div>

            <div className='colorCircle'> <h3> {props.value} </h3> </div>

        </div>
     );
}
 
export default AlertCard;