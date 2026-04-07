import React, { Component } from 'react';
import '.StatisticsBigCard/.css'
const StatisticsBigCard = (props) => {
    return ( 
        <div className='StatisticsBigCardCont'>

            <div className='topBigCard'>

                <div className='cardIcon'> <img src={props.src} alt="statisticsIcon" /> </div>

                <p>{props.title}</p>

                <h1>{props.value}</h1>

            </div>

            <p>{props.subTitle}</p>
            
        </div>
     );
}
 
export default StatisticsBigCard;