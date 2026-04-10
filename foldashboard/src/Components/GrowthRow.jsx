import React from 'react';
import './GrowthRow.css';

const GrowthRow = ({ day, users, usersPct, orders, ordersPct, interact, interactPct }) => {

    return (
        <div className="growth-row">
             <div className='day-name'>{day}</div>
            {/* 1. Interaction (Purple) */}
            <div className='stat-col'>
                <label>التفاعل</label>
                <span className='val'>{interact}</span>
                <div className='bar-bg'>
                    <div className='bar-fill purple' style={{ width: `${interactPct}%` }}></div>
                </div>
                
            </div>

            {/* 2. Orders (Green) */}
            <div className='stat-col'>
                <label>الطلبات</label>
                <span className='val'>{orders}</span>
                <div className="bar-bg">
                    <div className='bar-fill green' style={{ width: `${ordersPct}%` }}></div>
                </div>
                
            </div>

            {/* 3. Users (Blue) */}
            <div className='stat-col'>
                <label>المستخدمون</label>
                <span className='val'>{users}</span>
                <div className='bar-bg'>
                    <div className='bar-fill blue' style={{ width: `${usersPct}%` }}></div>
                </div>
                
            </div>

            {/* 4. Day Label */}
           
        </div>
    );
};

export default GrowthRow;