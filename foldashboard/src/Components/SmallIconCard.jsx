import React, { Component } from 'react';
import './SmallIconCard.css'

const SmallIconCard = (props) => {
    return ( 
        <div className='smallCardIconCont'>

            <div className='titleIconCont'>

                <img src={props.src} alt={props.alt || "statisticsIcon"} />
                <p>{props.title}</p>

            </div>

            <h1>{Number(props.value).toLocaleString()}</h1>
             
             <h6>{props.subTitle}</h6>
        </div>
     );
}
 
export default SmallIconCard;