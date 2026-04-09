import React, { Component } from 'react';
import './StatisticsBigCard.css'



const StatisticsBigCard = (props) => {
    return ( 
        <div className='StatisticsBigCardCont'>

            <div className='topBigCard'>

                 <div className='cardCol'>

                    <p>{props.title}</p>
                    <h1>{props.value}</h1>

                 </div>

                <div className='cardIcon'> <img src={props.src} alt="statisticsIcon" /> </div>


            </div>

            <h6>{props.subTitle}</h6>
            
        </div>
     );
}
 
export default StatisticsBigCard;