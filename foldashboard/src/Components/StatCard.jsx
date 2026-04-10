import React, { Component } from 'react';
import './StatCard.css'
const StatCard = ({ value, label }) => {
    return ( 
        <div className="stat-card">
            <h3 className="stat-value">{value}</h3>
            <p className="stat-label">{label}</p>
        </div>
     );
}
 
export default StatCard;