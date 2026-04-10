import React, { Component } from 'react';
import './RecentCard.css'
const RecentCard = (props) => {
    return ( 
        <div className='recentCard'>

            <div className='recentRightCol'>

                <h6> {props.title} </h6>

                <div className='downRow'>
                    <p>{props.action}</p>
                    <p>.</p>
                    <p>{props.employee}</p>
                </div>

            </div>

            <p> {props.when} </p>

        </div>
     );
}
 
export default RecentCard;