import React, { Component } from 'react';
import './BestSeller.css'
import './StatisticsBigCard.css'

const BestSeller = (props) => {
    return ( 
        <div className='bestSeller'>

            <div className='bestRight'>

            <div className='cardIcon'>
                <h1> {props.rank} </h1>
            </div>

            <h3> {props.title} </h3>

            </div>

            <div className='numbCOlBest'>
                <h2> {props.value} </h2>
                <p> {`${props.pieces} مبيعة`} </p>
            </div>

        </div>
     );
}
 
export default BestSeller;