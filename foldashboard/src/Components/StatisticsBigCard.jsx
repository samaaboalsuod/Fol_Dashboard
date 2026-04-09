import React from 'react';
import './StatisticsBigCard.css';

const StatisticsBigCard = (props) => {
    // Logic to check if the trend is up or down to set the color
    const isTrendingUp = props.subTitle?.includes('↑');

    return ( 
        <div className='StatisticsBigCardCont'>

            <div className='topBigCard'>

                 <div className='cardCol'>
                    <p>{props.title}</p>
                    {/* Number() ensures the string from Supabase is treated as a number for formatting */}
                    <h1>{Number(props.value).toLocaleString()}</h1>
                 </div>

                <div className='cardIcon'> 
                    <img src={props.src} alt={props.alt || "statisticsIcon"} /> 
                </div>

            </div>

            {/* Applies a specific color class based on the trend logic */}
            <h6 className={isTrendingUp ? 'trend-up' : 'trend-down'}>
                {props.subTitle}
            </h6>
            
        </div>
     );
}

export default StatisticsBigCard;