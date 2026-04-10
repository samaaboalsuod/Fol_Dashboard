import React, { Component } from 'react';
import './DetailRow.css';


const DetailRow = ({ label, value, colorClass }) => {
    return ( 

        <div className="detail-row">
           <span className="detail-label">{label}:</span>
           <span className={`detail-value ${colorClass || ''}`}>{value}</span>
        </div>


     );
}
 
export default DetailRow;
